const mongoose = require('mongoose')
const dbUrl = process.env.DB_URL
// connect to mongoose
mongoose.connect(dbUrl).then(() => {
    console.log(`Product-Service DB Connected`);
}).catch((err) => {
    console.log("error while connecting mongodb", err)
})

const db = mongoose.connection;
db.on("error", (err) => {
});
db.once("open", function callback() {
    console.log("Database connection to MongoDB opened.");
});