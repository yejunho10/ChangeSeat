const express = require("express");
const logger = require("morgan");

const httpPort = 81;
const app = express();

app
    .use(logger(":method :url :status - (:response-time ms | :remote-addr)"))

    .set("views engine", "ejs")

    .use("/public", express.static(__dirname + "/public"))

    .get("/favicon.ico", (req, res) => {
        res.redirect("/public/favicon.ico");
    })

    .get("/", (req, res) => {
        res.render("main.ejs");
    })
    .get("/result", (req, res) => {
        let number = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64
        ];

        for (let i = number.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [number[i], number[j]] = [number[j], number[i]];
        }

        res.render("result.ejs", { number: number });
    })

    .use((req, res) => {
        res.send("404 / Page not found.");
    })

app.listen(httpPort, () => {
    console.log("HTTP Server Started! HTTP Listening On Port: " + httpPort)
})