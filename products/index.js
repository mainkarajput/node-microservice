const express = require("express");
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8084;
const Product = require("./Product");
const amqp = require("amqplib");
require('./Connection/mongoConnection')

const isAuthenticated = require("../isAuthenticated");
var order;

var channel, connection;

app.use(express.json());


async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT");
}
connect();

/*
user sends a list of product ids and is send to the order queue where it reply back
to the product queue with the newOrder having total price as sum of the products price.
*/

app.post("/product/buy", isAuthenticated, async (req, res) => {
    const { ids } = req.body;
    const products = await Product.find({ _id: { $in: ids } });
    channel.sendToQueue(
        "ORDER",
        Buffer.from(
            JSON.stringify({
                products,
                userEmail: req.user.email,
            })
        )
    );
    channel.consume("PRODUCT", (data) => {
        order = JSON.parse(data.content);
        channel.ack(data)
    });
    return res.json(order);
});

app.post("/product/create", isAuthenticated, async (req, res) => {
    const { name, description, price } = req.body;
    const newProduct = new Product({
        name,
        description,
        price,
    });
    newProduct.save();
    return res.json(newProduct);
});

app.get("/product/all", isAuthenticated, async (req, res) => {
    const data = await Product.find()
    return res.json(data);
});


app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`);
});
