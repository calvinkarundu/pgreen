const PGreen = require('../middleware');

const pGreen = new PGreen({
    ipnPath: '/ipn/paygreen',
    publicKey: '11adda8f7eddb783cc39ebf7921ff721',
    secretKey: 'f2f3-4009-93ce-714f18206eec',
});

function getOptions(method, endpoint, data) {
    const url = 'https://paygreen.fr/api/11adda8f7eddb783cc39ebf7921ff721' + endpoint;
    const options = {
        'method': method,
        'url': url,
        'headers': {
            'Accept': 'application/json',
            'Authorization': 'Bearer f2f3-4009-93ce-714f18206eec',
            'Content-Type': 'application/json',
        },
    };
    if (method === 'POST') {
        options.body = JSON.stringify(data);
    }
    return options;
}

module.exports = {
    pGreen,
    getOptions,
};
