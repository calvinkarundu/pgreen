const payGreenIPN = {
    "success": true,
    "message": "",
    "code": 0,
    "data": {
        "id": "tr15acde62ecfc1b8a2a1706b3f17a714e",
        "paymentToken": "1NUytzyEgkdowJdwI1751555436136710",
        "paymentFolder": "prabcdef1234567890",
        "orderId": "test-123",
        "amount": 9900,
        "currency": "EUR",
        "type": "CASH",
        "paymentType": "CB",
        "url": "http://paygreen.fr/payment/execute/",
        "testMode": 0,
        "result": {
            "status": "SUCCESSED",
            "threeDSecureStatus": "3DS_SUCCESSED",
            "paymentErrorStatus": "string"
        },
        "card": {
            "number": "800025XXXXXX0004",
            "expiration": "0121",
            "country": "FR"
        },
        "buyer": {
            "id": "123654789",
            "lastName": "Pay",
            "firstName": "Green",
            "email": "contact@paygreen.fr",
            "country": "FR",
            "ipAddress": "127.0.0.1",
            "companyName": "PayGreen"
        },
        "schedules": {
            "rank": 129,
            "amount": 101,
            "currency": "EUR",
            "status": "EUR",
            "valueAt": "101",
            "id": "EUR"
        },
        "donation": {
            "associationId": 129,
            "status": "PENDING",
            "type": "ROUNDING",
            "amount": 101,
            "currency": "EUR",
            "refundable": true
        },
        "metadata": {
            "orderId": "test-123",
            "display": "0"
        },
        "eligibleAmount": {
            "ANCV": "1000",
            "RESTOFLASH": "0"
        },
        "idFingerprint": 0,
        "createdAt": "2020-06-23T07:57:56Z",
        "valueAt": "2020-06-23T07:57:56Z",
        "answeredAt": "2020-06-23T07:57:56Z",
        "ttl": "PT10M"
    }
};

const payGreenTransaction = {
    "success": true,
    "message": "",
    "code": 0,
    "data": {
        "id": "tr15acde62ecfc1b8a2a1706b3f17a714e",
        "paymentToken": "1NUytzyEgkdowJdwI1751555436136710",
        "paymentFolder": "prabcdef1234567890",
        "orderId": "test-123",
        "amount": 9900,
        "currency": "EUR",
        "type": "CASH",
        "paymentType": "CB",
        "url": "http://paygreen.fr/payment/execute/",
        "testMode": 0,
        "result": {
            "status": "SUCCESSED",
            "threeDSecureStatus": "3DS_SUCCESSED",
            "paymentErrorStatus": "string"
        },
        "card": {
            "number": "800025XXXXXX0004",
            "expiration": "0121",
            "country": "FR"
        },
        "buyer": {
            "id": "123654789",
            "lastName": "Pay",
            "firstName": "Green",
            "email": "contact@paygreen.fr",
            "country": "FR",
            "ipAddress": "127.0.0.1",
            "companyName": "PayGreen"
        },
        "schedules": {
            "rank": 129,
            "amount": 101,
            "currency": "EUR",
            "status": "EUR",
            "valueAt": "101",
            "id": "EUR"
        },
        "donation": {
            "associationId": 129,
            "status": "PENDING",
            "type": "ROUNDING",
            "amount": 101,
            "currency": "EUR",
            "refundable": true
        },
        "metadata": {
            "orderId": "test-123",
            "display": "0"
        },
        "eligibleAmount": {
            "ANCV": "1000",
            "RESTOFLASH": "0"
        },
        "idFingerprint": 0,
        "createdAt": "2020-06-23T07:57:56Z",
        "valueAt": "2020-06-23T07:57:56Z",
        "answeredAt": "2020-06-23T07:57:56Z",
        "ttl": "PT10M"
    }
};

const payGreenSubscriptionRequest = {
    orderId: 10,
    amount: 100,
    currency: 'EUR',
    paymentType: 'CB',
    notified_url: 'http:127.0.0.1:3000/ipn/paygreen',
    orderDetails: {
        cycle: 28,
        count: 3,
        day: 0,
        startAt: Date.now().toString(),
        firstAmount: 0
    },
    metadata: {
        orderId: "test-123",
        display: "0"
    }
};

const payGreenSubscriptionResponse = {
    "success": true,
    "message": "",
    "code": 0,
    "data": {
        "id": "tr15acde62ecfc1b8a2a1706b3f17a714e",
        "paymentToken": "1NUytzyEgkdowJdwI1751555436136710",
        "paymentFolder": "prabcdef1234567890",
        "orderId": "test-123",
        "amount": 9900,
        "currency": "EUR",
        "type": "CASH",
        "paymentType": "CB",
        "url": "http://paygreen.fr/payment/execute/",
        "testMode": 0,
        "result": {
            "status": "SUCCESSED",
            "threeDSecureStatus": "3DS_SUCCESSED",
            "paymentErrorStatus": "string"
        },
        "card": {
            "number": "800025XXXXXX0004",
            "expiration": "0121",
            "country": "FR"
        },
        "buyer": {
            "id": "123654789",
            "lastName": "Pay",
            "firstName": "Green",
            "email": "contact@paygreen.fr",
            "country": "FR",
            "ipAddress": "127.0.0.1",
            "companyName": "PayGreen"
        },
        "schedules": {
            "rank": 129,
            "amount": 101,
            "currency": "EUR",
            "status": "EUR",
            "valueAt": "101",
            "id": "EUR"
        },
        "donation": {
            "associationId": 129,
            "status": "PENDING",
            "type": "ROUNDING",
            "amount": 101,
            "currency": "EUR",
            "refundable": true
        },
        "metadata": {
            "orderId": "test-123",
            "display": "0"
        },
        "eligibleAmount": {
            "ANCV": "1000",
            "RESTOFLASH": "0"
        },
        "idFingerprint": 0,
        "createdAt": "2020-06-23T07:57:56Z",
        "valueAt": "2020-06-23T07:57:56Z",
        "answeredAt": "2020-06-23T07:57:56Z",
        "ttl": "PT10M"
    }
};

module.exports = {
    secretKey: 'some-secret-key',
    publicKey: 'some-public-key',
    payGreenIPN,
    payGreenTransaction,
    payGreenSubscriptionRequest,
    payGreenSubscriptionResponse,
};