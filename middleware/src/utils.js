const fetch = require('node-fetch');

async function invoke(
    method,
    url,
    data = undefined,
    options = {
        timeout: 25000,
        headers: {},
    },
) {
    const headers = {};

    if (options.headers) {
        Object.entries(options.headers)
            .forEach(([key, value]) => {
                headers[key] = value;
            });
    }

    const opts = {
        method,
        headers,
    };

    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    let res;
    try {
        res = await Promise.race([
            fetch(url, opts),
            new Promise((resolve, reject) =>
                setTimeout(() => reject(new Error('timeout')), options.timeout || 25000)),
        ]);
    } catch (ex) {
        throw ex;
    }

    if (!(res.status >= 200 && res.status < 300)) {
        try {
            const response = await res.json();
            throw response.message;
        } catch (ex) { /* ignore */ }

        throw res.statusText;
    }

    const result = await res.json();
    return result;
}

async function initiateSubscription(options) {
    const {
        publicKey,
        secretKey,
        subscription,
    } = options;

    const response = await invoke(
        'POST',
        `https://paygreen.fr/api/${publicKey}/payins/transaction/subscription`,
        subscription,
        {
            headers: {
                authorization: `Bearer ${secretKey}`
            },
        },
    );

    return response;
};

async function validateTransaction(options) {
    const {
        transaction,
        publicKey,
        secretKey,
    } = options;

    const {
        data: {
            id: transactionId,
        },
    } = transaction;

    const response = await invoke(
        'GET',
        `https://paygreen.fr/api/${publicKey}/payins/transaction/${transactionId}`,
        null,
        {
            headers: {
                authorization: `Bearer ${secretKey}`
            },
        },
    );

    if (response.data.id === transaction.data.id) {
        return { validated: true, transaction };
    }

    return { validated: false, transaction };
};

module.exports = {
    initiateSubscription,
    validateTransaction,
};
