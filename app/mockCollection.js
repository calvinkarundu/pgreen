let GIVE = false;

async function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), duration);
  });
}

/*
  This function is simulating a DB call
*/
async function findSubscription(orderId) {
  return GIVE ? { status: 'Successful' } : null;
}

/*
  This function will loop for a maximum of 1m before timing out.
  It checks 6 times with a 10 second delay between checks.
*/
async function verifySubscription(orderId, current = 0, maxCheck = 6) {
  const verify = (subscriptionObj) => {
    if (current === maxCheck) {
      throw new Error(`Timed out while verifying subscription!`);
    }

    /*
      Using this to simulate a delay before I "give" the subscription object.
      This would be the window between where they redirect the user back to
      the `returned_url`, and we need to wait for the IPN and save the order
      plus it's status.
    */
    if (current === 0) GIVE = true;

    if (subscriptionObj !== null) {
      GIVE = false;
      return subscriptionObj;
    }

    return verifySubscription(orderId, current += 1);
  };

  return delay(current * 10000).then(findSubscription).then(verify);
};

module.exports = {
    verifySubscription,
};
