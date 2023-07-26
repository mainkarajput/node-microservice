const mongoose = require('mongoose')
const dbUrl = process.env.DB_URL
// connect to mongoose
mongoose.connect(dbUrl).then(() => {
    console.log('Auth service Database connected.')
}).catch((err) => {
    console.log("error while connecting mongodb", err)
})

const db = mongoose.connection;
db.on("error", (err) => {
});
db.once("open", function callback() {
    console.log("Auth service Database connection to MongoDB opened.");
});