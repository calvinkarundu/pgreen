const express = require('express');
const router = express.Router();

const { pGreen } = require('../utils');

const { verifySubscription } = require('../mockCollection');

router.get('/', function (req, res) {
  res.render('subscription', {
    title: 'Subscribe - Pay Green'
  });
});

router.post('/subscription', function (req, res) {
  const subscription = {
    orderId: 10,
    amount: 9,
    currency: 'EUR',
    paymentType: 'CB',
    notified_url: 'http:127.0.0.1:3000/ipn/paygreen',
    returned_url: 'http:127.0.0.1:3000/subscription/verify/test-123', // The last param is an orderId which should match what is in metadata
    orderDetails: {
      cycle: 30,
      count: 12,
      day: 0,
      startAt: Date.now().toString(),
      firstAmount: 0
    },
    metadata: {
      orderId: "test-123",
      display: "0"
    }
  };

  pGreen
    .initiateSubscription(subscription)
    .then((response) => {
      const executionUrl = response.data.url;
      res.redirect(executionUrl);
    })
    .catch((ex) => {
      /*
        This fails as we can't get PayGreen requests to respond successfully.
        I'm faking the redirect with a sample transactions execution URL I created from the dashboard.
        Ideally, we would extract this URL from a succesfull PayGreen API call.
      */
      const subscriptionFullfilmentPage = 'https://paygreen.fr/payment/execute/pr04d3790fc9018d88262149610633c3c0';
      res.redirect(subscriptionFullfilmentPage);
      /*
        Once the user pays, they will be redirected to the `returned_url` on line 24 of this file.
        The `notified_url` on line 25 is the IPN callback PayGreen will update us on.
        The middleware kicks in on the IPN callback, and you'll have either a successful or failed payment.
      */
    });
});

router.post('/ipn/paygreen', function (req, res) {
  const validatedTransaction = res.locals.payGreenTransaction;

  if (validateTransaction.success) {
    console.log('Payment successful', validatedTransaction);
  } else {
    console.log('Payment failed', validatedTransaction);
  }
});

router.get('/subscription/verify/:orderId', function (req, res) {
  const orderId = req.params.orderId;

  /*
    We verify the subscription before rendering the page.
  */
  verifySubscription(orderId)
    .then((subscripion) => {
      const successful = subscripion.status === 'Successful';
      const failureReason = successful ? null : 'Failed to verify transaction';

      res.render('subscriptionVerify', {
        title: 'Subscribe - Pay Green',
        successful: subscripion.status === 'Successful',
        reason: failureReason,
      });
    })
    .catch((ex) => {
      console.log(ex);
      res.render('subscriptionVerify', {
        title: 'Subscribe - Pay Green',
        successful: false,
        reason: 'Some error!',
      });
    });
});

module.exports = router;