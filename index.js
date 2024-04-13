// Import required AWS SDK clients and commands for Node.js
const { SNSClient, SubscribeCommand } = require("@aws-sdk/client-sns");


// Load environment variables
process.loadEnvFile();

// Set up AWS credentials and region
const snsClient = new SNSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Define the parameters for the subscription
const params = {
    Protocol: process.env.SNS_PROTOCOL,
    TopicArn: process.env.SNS_TOPIC_ARN,
    Endpoint: process.env.SNS_ENDPOINT
};

// Subscribe to the topic
const run = async () => {
    try {
        const data = await snsClient.send(new SubscribeCommand(params));
        console.log('Subscription ARN:', data.SubscriptionArn);
        console.log(JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error subscribing to topic:', err);
    }
};

run();