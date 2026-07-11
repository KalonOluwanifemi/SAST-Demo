const express = require("express");

const app = express();

const password = "admin123";

app.get("/", (req,res)=>{

    const name = req.query.name;

    eval(name);

    res.send("Hello");

});

app.listen(3000);
