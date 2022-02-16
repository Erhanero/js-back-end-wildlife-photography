const express = require("express");
const expressConfig = require("./config/express");
const initDataBase = require("./config/database");
const router = require("./router");

const app = express();
expressConfig(app);

app.use(router)

try {
    initDataBase()
    app.listen(3000, () => console.log(`Application is running on http://localhost:3000`))
} catch (err) {
    console.log("Database error...")
}


