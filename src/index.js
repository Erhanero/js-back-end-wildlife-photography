const express = require("express");
const expressConfig = require("./config/express");
const initDataBase = require("./config/database");

const app = express();
expressConfig(app);


app.get("/", (req, res) => {
    res.send("hello world");
});

try {
    initDataBase()
    app.listen(3000, () => console.log(`Application is running on http://localhost:3000`))
} catch (err) {
    console.log("Database error...")
}


