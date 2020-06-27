/* global expect, beforeAll */

const nock = require('nock');

const pGreen = require('..');

const {
    payGreenSubscription,
    payGreenSubscriptionResponse,
    publicKey,
    secretKey,
} = require('./fixtures');

describe('initiateSubscription()', () => {
    beforeAll((done) => {
        nock('https://paygreen.fr')
            .post(/subscription/)
            .reply(200, JSON.stringify(payGreenSubscriptionResponse));

        done();
    });

    test('initiates a subscription', () => pGreen.initiateSubscription({
        publicKey,
        secretKey,
        subscription: payGreenSubscription,
    })
    .then((response) => {
        expect(response.success).toEqual(payGreenSubscriptionResponse.success);
        expect(response.data.id).toEqual(payGreenSubscriptionResponse.data.id);
    }));
});
