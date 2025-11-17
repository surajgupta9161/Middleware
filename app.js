const express = require("express");
const app = express();

app.listen(8080, () => {
    console.log("Listing by port 8080");
})

app.use((req, res, next) => {
    console.log("HI i am 1st middleware");
    next();
})

app.use("/random", (req, res, next) => {
    console.log("Hi i am 2nd middleware for only random route");
    next();
})

//authentication for the data by query string given by url 
// app.use("/api", (req, res, next) => {
//     let { token } = req.query;
//     if (token === "giveaccess") {
//         next();
//     }
//     res.send("ACCESS DENIED!");
// })

//passing multipul middleware
const passToken = (req, res, next) => {
    let { token } = req.query;
    if (token === "giveaccess") {
        next();
    }
    res.send("ACCESS DENIED!");
};

app.get("/api", passToken, (req, res) => {
    res.send("data");
})

app.get("/", (req, res) => {
    res.send("I am root");
})

app.get("/random", (req, res) => {
    res.send("HI i am random")
})