/* global expect, beforeAll */
const nock = require('nock');

const PGreen = require('..');

const {
    payGreenTransaction,
    publicKey,
    secretKey,
} = require('./fixtures');

describe('validateTransaction()', () => {
    beforeAll((done) => {
        nock('https://paygreen.fr')
            .get(/transaction/)
            .reply(200, JSON.stringify(payGreenTransaction));

        done();
    });

    test('validates a transaction', () => {
        const pGreen = new PGreen({
            ipnPath: '/ipn/paygreen',
            publicKey,
            secretKey,
        });

        return pGreen.validateTransaction(payGreenTransaction)
            .then((response) => {
                expect(response.validated).toEqual(true);
            });
    });
});
