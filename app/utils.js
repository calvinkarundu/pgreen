const PGreen = require('../middleware');

const pGreen = new PGreen({
  ipnPath: '/ipn/paygreen',
  publicKey: '11adda8f7eddb783cc39ebf7921ff721',
  secretKey: 'f2f3-4009-93ce-714f18206eec',
});

module.exports = {
    pGreen,
};
