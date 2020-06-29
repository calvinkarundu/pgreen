const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Schema from a sample response
const SubscriptionSchema = new Schema({
    // id: String,
    paymentToken: String,
    paymentFolder: String,
    orderId: String,
    amount: String,
    currency: String,
    type: String,
    paymentType: String,
    url: String,
    testMode: String,
    result: {
        status: String,
        threeDSecureStatus: String,
        paymentErrorStatus: String,
    },
    buyer: {
        id: String,
        lastName: String,
        firstName: String,
        email: String,
        country: String,
        ipAddress: String,
        companyName: String,
    }
});

// compile model from schema
const SubscriptionModel = mongoose.model('SubscriptionModel', SubscriptionSchema);

module.exports = {SubscriptionModel};