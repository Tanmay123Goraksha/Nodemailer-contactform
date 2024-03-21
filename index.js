import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname))); // Serve files from the directory of index.js

// Route for serving the index.html file
app.get("/send_mail", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// POST endpoint for sending mail
app.post("/send_mail", (req, res) => {
    const { from, subject, message } = req.body;

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Mail',
            pass: "Password"
        }
    });

    // Mail options
    const mailOptions = {
        from: from,
        to: "tanmay.goraksha@somaiya.edu",
        subject: subject,
        text: message
    };

    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent successfully");
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
