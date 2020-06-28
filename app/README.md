# Pay Green APP

> Sample application using the Pay Green middleware

## Usage

**Requirements**

- NodeJS v12+

**Steps**

1. Go to the index page `/` to initiate a subscription
   - You should get redirected to a PayGreen payment page
2. Go to the subscription validation page `/subscription/validate/test-123` to simulate having being redirected from the PayGreen page
   - Order should be valdated after 10s

**Development**

```bash
$ git clone git@github.com/calvinkarundu/pgreen.git
$ cd pgreen/app
$ npm install
$ npm run dev
```