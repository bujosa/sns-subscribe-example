const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();

// Parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.text());

// Handle POST requests to '/sns-endpoint'
app.post('/sns-endpoint', async (req, res) => {
    const message = JSON.parse(req.body);

    if (message.Type === 'SubscriptionConfirmation') {
        // Confirm the subscription by visiting the subscribe URL
        const response = await axios.get(message.SubscribeURL);
        console.log('Subscription confirmed:', response.status);
    } else if (message.Type === 'Notification') {
        // Process the message
        console.log('Received SNS message:', message.Message);
    }

    // Responde con un código de estado 200 para indicar que el mensaje fue recibido correctamente
    res.sendStatus(200);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});