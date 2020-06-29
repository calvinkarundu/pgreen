const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {payGreenSubscriptionResponse} = require('../../middleware/test/fixtures');

const {SubscriptionModel} = require('../models/transactions');

mongoose.connect('mongodb://localhost:27017/txn', {useNewUrlParser: true})
    .then(() => {

        // Get all subscriptions
        router.get('/subscriptions', function (req, res) {
            SubscriptionModel.find().then(subscriptions => {
                res.render('subscriptionList', {
                    title: 'Subscriptions',
                    subscriptions: subscriptions,
                });
            });
        });

        // Post subscriptions
        router.post('/subscriptions', function (req, res) {
            SubscriptionModel.create(payGreenSubscriptionResponse.data, function (err, subscription) {
                if (err) console.log(err);
                SubscriptionModel.find().then(subscriptions => {
                    res.render('subscriptionList', {
                        title: 'Subscriptions',
                        subscriptions: subscriptions,
                    });
                });
            });
        });

        // Fetch single subscription
        router.get('/subscriptions/:id', function (req, res) {
            SubscriptionModel.findOne({_id: req.params.id}).then(subscription => {
                res.render('subscriptionDetails', {
                    subscription: subscription,
                });
            });
        });

        // Fetch users subscriptions
        router.get('/users/:id', function (req, res) {
            SubscriptionModel.find({"buyer.id": req.params.id}).then(subscriptions => {
                res.render('userSubscriptions', {
                    title: 'Subscriptions',
                    subscriptions: subscriptions,
                });
            });
        });

    })
    .catch(error => {
        console.log('mongo error:', error);
    })

module.exports = router;
