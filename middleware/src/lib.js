const bodyParser = require('body-parser');

const invoke = require('./invoke');

class PGreen {
    constructor(options) {
        const {
            ipnPath,
            publicKey,
            secretKey
        } = options;

        if (!ipnPath || !publicKey || !secretKey) {
            throw new Error('ipnPath, publicKey and secretKey are required.');
        }

        if (typeof ipnPath !== 'string' || ipnPath.trim().length === 0) {
            throw new Error('invalid ipnPath value');
        }

        if (typeof publicKey !== 'string' || publicKey.trim().length === 0) {
            throw new Error('invalid publicKey value');
        }

        if (typeof secretKey !== 'string' || secretKey.trim().length === 0) {
            throw new Error('invalid secretKey value');
        }

        this.publicKey = publicKey.trim();
        this.secretKey = secretKey.trim();
        this.ipnPath = ipnPath.trim();

        this.ipnHandler = this.ipnHandler.bind(this);
        this.validateIPN = this.validateIPN.bind(this);
        this.validateTransaction = this.validateTransaction.bind(this);
        this.initiateSubscription = this.initiateSubscription.bind(this);
    }

    ipnHandler() {
        const stack = [
            bodyParser.json(),

            bodyParser.urlencoded({
                extended: true
            }),

            (req, res, next) => {
                if (req.method === 'POST' && req.path === this.ipnPath) {
                    this.validateIPN(req, res, next);
                } else {
                    next();
                }
            },
        ];

        return stack;
    }

    async validateIPN(req, res, next) {
        try {
            const transaction = req.body;

            if (!transaction || Object.keys(transaction).length === 0) {
                return res.status(400).send('Bad Request; No transaction provided.');
            }

            const validatedTransaction = await this.validateTransaction(transaction);
            res.locals.payGreenTransaction = validatedTransaction;

            return next();
        } catch (ex) {
            console.error(ex);
            return res.status(500).send('Server Error; Failure while validating IPN.');
        }
    }

    async validateTransaction(transaction) {
        const {
            data: {
                id: transactionId,
            },
        } = transaction;

        const response = await invoke(
            'GET',
            `https://paygreen.fr/api/${this.publicKey}/payins/transaction/${transactionId}`,
            null, {
                headers: {
                    authorization: `Bearer ${this.secretKey}`
                },
            },
        );

        if (response.data.id === transaction.data.id) {
            return {
                validated: true,
                transaction
            };
        }

        return {
            validated: false,
            transaction
        };
    }

    async initiateSubscription(subscription) {
        const response = await invoke(
            'POST',
            `https://paygreen.fr/api/${this.publicKey}/payins/transaction/subscription`,
            subscription, {
                headers: {
                    authorization: `Bearer ${this.secretKey}`
                },
            },
        );

        return response;
    };
}

module.exports = PGreen;