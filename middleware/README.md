# Pay Green Middleware

> Pay Green Utility exposing middleware for ipn management and validation as well as a subscription creation method

**Usage**

```js
const PGreen = require('pgreen');

const app = express();

const pGreen = new PGreen({
    ipnPath: '/ipn/paygreen',
    publicKey: 'some-public-key',
    secretKey: 'some-secret-key',
});

/* IPN Handler middleware */

app.use(pGreen.ipnHandler());

app.post('/ipn/paygreen', (req, res) => {
    const validatedTransaction = res.locals.payGreenTransaction;

    if (validateTransaction.success) {
        // Handle success path
    } else {
        // Handle failure path
    }
});

/* Initiating subscriptions */

const subscription = { ... };
pGreen
    .initiateSubscription(subscription)
    .then((response) => {
        console.log(response);
    });

/* Validating transactions */

const transaction = { ... };
pGreen
    .validateTransaction(transaction)
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