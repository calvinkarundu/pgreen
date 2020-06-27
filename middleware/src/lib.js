const bodyParser = require('body-parser');

const {
    initiateSubscription,
    validateTransaction,
} = require('./utils');

async function validateIPN(req, res, next, options) {
    try {
        const transaction = req.body;

        if (!transaction || Object.keys(transaction).length === 0) {
            return res.status(400).send('Bad Request; No transaction provided.');
        }

        const validatedTransaction = await validateTransaction({
            transaction,
            publicKey: options.publicKey,
            secretKey: options.secretKey,
        });

        res.locals.payGreenTransaction = validatedTransaction;

        return next();
    } catch (ex) {
        console.error(ex);
        return res.status(500).send('Server Error; Failure while validating IPN.');
    }
}

function ipnHandler(options = {}) {
    const { ipnPath, publicKey, secretKey } = options;

    if (!ipnPath || !publicKey || !secretKey) {
        throw new Error('ipnPath, publicKey and secretKey are required.');
    }

    if (typeof ipnPath !== 'string' || ipnPath.trim().length === 0) {
        throw new Error('invalid ipnPath value');
    }

    if (typeof publicKey !== 'string' || publicKey.trim().length === 0) {
        throw new Error('invalid ipnPath value');
    }

    if (typeof secretKey !== 'string' || secretKey.trim().length === 0) {
        throw new Error('invalid ipnPath value');
    }

    const stack = [
        bodyParser.json(),

        bodyParser.urlencoded({ extended: true }),

        (req, res, next) => {
            if (req.method === 'POST' && req.path === ipnPath) {
                validateIPN(req, res, next, options);
            } else {
                next();
            }
        },
    ];

    return stack;
};

module.exports = {
    ipnHandler,
    initiateSubscription,
};
