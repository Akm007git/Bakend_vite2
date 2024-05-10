
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require("./models");
// require("dotenv").config();
const app = express();

mongoose.connect("mongodb+srv://anupkumarmahata4:3mKzuF9em2geT2Af@users.mw9gwi1.mongodb.net/?retryWrites=true&w=majority&appName=vite_project_Reg");

// Use the cors middleware to enable CORS

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("hi");
})
app.post('/api/data', async (req, res) => {
    const data = await req.body;
    const { email, password, verifyPassword } = data;
    // res.send("successfully completed!");
    //console.log(email, password, verifyPassword);

    // * If user already exists
    const existingUser = await user.findOne({ email });

    if (existingUser) {
        console.log(existingUser)
        console.log("User already exists");
        res.send("User already exists");
    }
    else {
        const newUser = new user(
            {
                email,
                password,
                verifyPassword
            }
        );
        // saving the data
        res.send("new user saved successfully");
        await newUser.save();

    }


});

// saving the data user endpoint

app.post("/api/users", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const existUser = await user.findOne({ email, password });
    if (existUser) {
        res.send("Login Successfully");
    } else {
        res.send("Unknown user, Register first");
    }

});

app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000");
});
