import express from "express";
import fs from "fs";

const contact = express.Router();

contact.post("/contact", (req, res) => {
    const { firstname, lastname, email, message } = req.body;

    const data = `FirstName: ${firstname}, LastName: ${lastname}, Email: ${email}, Message: ${message}\n`;

    fs.appendFile("contact.txt", data, (err) => {
        if (err) {
            console.error("File write error:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.send("Thanks buddy, we will reach you soon!");
    });
});

export default contact;
