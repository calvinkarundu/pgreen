/* global expect, beforeAll */
const express = require('express');
const request = require('supertest');
const nock = require('nock');

const PGreen = require('..');

const {
    payGreenIPN,
    payGreenTransaction,
    publicKey,
    secretKey,
} = require('./fixtures');

describe('ipnHandler()', () => {
    let app;

    beforeAll((done) => {
        app = express();
        const pGreen = new PGreen({
            ipnPath: '/ipn/paygreen',
            publicKey,
            secretKey,
        });
        app.use(pGreen.ipnHandler());

        app.post('/ipn/paygreen', (req, res) => {
            if (res.locals.payGreenTransaction) {
                res.status(200).send('OK');
            } else {
                res.status(400).send('Bad Request; Missing payGreenTransaction on res.locals');
            }
        });

        nock('https://paygreen.fr')
            .get(/transaction/)
            .reply(200, JSON.stringify(payGreenTransaction));

        done();
    });

    test('validate options', (done) => {
        expect(() => {
            const pGreen = new PGreen();
        }).toThrow();

        expect(() => {
            const pGreen = new PGreen({
                ipnPath: '',
                publicKey: '',
                secretKey: '',
            });
        }).toThrow();

        done();
    });

    test('sets up ipn endpoint', () => Promise.all([
        request(app)
            .post('/ipn/paygreen')
            .send({})
            .expect(400),

        request(app)
            .post('/ipn/paygreen')
            .send(payGreenIPN)
            .expect(200),
    ]));
});
