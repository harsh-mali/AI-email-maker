// server.js
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

app.post('/generate-email', async (req, res) => {
    const { prompt } = req.body;
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{
                role: 'user',
                content: `Write a professional and complete email based on this prompt. The very first line of your response must be the subject line, starting with "Subject:". The rest of the content should be the email body. Prompt: "${prompt}"`,
            }],
            model: 'llama3-8b-8192',
        });
        const generatedContent = chatCompletion.choices[0]?.message?.content || '';
        res.json({ emailContent: generatedContent });
    } catch (error) {
        console.error('Error generating email:', error);
        res.status(500).json({ error: 'Failed to generate email content.' });
    }
});

app.post('/send-email', async (req, res) => {
    const { recipients, subject, body } = req.body;
    const mailOptions = {
        from: `Your Name <${process.env.SMTP_USER}>`,
        to: recipients,
        subject: subject,
        html: body.replace(/\n/g, '<br>')
    };
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});