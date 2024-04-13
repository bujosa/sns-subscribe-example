const AWS = require('aws-sdk');

// Set up AWS credentials and region
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Create a new SNS object
const sns = new AWS.SNS();

// Define the parameters for the subscription
const params = {
    Protocol: process.env.SNS_PROTOCOL,
    TopicArn: process.env.SNS_TOPIC_ARN,
    Endpoint: process.env.SNS_ENDPOINT
};

// Subscribe to the topic
sns.subscribe(params, (err, data) => {
    if (err) {
        console.error('Error subscribing to topic:', err);
    } else {
        console.log('Subscription ARN:', data.SubscriptionArn);
        console.log(JSON.stringify(data, null, 2));
    }
});