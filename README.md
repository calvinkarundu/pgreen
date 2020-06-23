# Pay Green

> Pay Green Utility exposing middleware for ipn management and validation as well as a subscription creation method

**Usage**

```js
const pGreen = require('pgreen');

const app = express();

const ipnHandlerOptions = {
    ipnPath: '/ipn/paygreen',
    publicKey: 'some-public-key',
    secretKey: 'some-secret-key',
};

/* IPN Handler middleware */

app.use(pGreen.ipnHandler(ipnHandlerOptions));

app.post('/ipn/paygreen', (req, res) => {
    const validatedTransaction = res.locals.payGreenTransaction;

    if (validateTransaction.success) {
        // Handle success path
    } else {
        // Handle failure path
    }
});

/* Initiating subscriptions */

const subscripionOptions = {
    subscription: { ... },
    publicKey: 'some-public-key',
    secretKey: 'some-secret-key',
};

pGreen
    .initiateSubscription(subscripionOptions)
    .then((response) => {
        console.log(response);
    });
```

## Development

```bash
$ git clone git@github.com/calvinkarundu/pgreen.git
$ cd pgreen
$ npm install
$ npm test
```