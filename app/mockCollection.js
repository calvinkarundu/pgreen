let FOUND = false;

async function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), duration);
  });
}

/*
  This function is simulating a DB call
*/
async function findSubscription(orderId) {
  return FOUND ? { status: 'Successful' } : null;
}

/*
  This function will loop for a maximum of 30s before timing out.
  It checks 3 times with a 10 second delay between checks.
*/
async function verifySubscription(orderId, current = 0, maxCheck = 3) {
  const verify = (subscriptionObj) => {
    if (current === maxCheck) {
      throw new Error(`Timed out while verifying subscription!`);
    }

    /*
      Using this to simulate a delay before I "find" the subscription object.
      This would be the window between where they redirect the user back to
      the `returned_url`, and we need to wait for the IPN and save the order
      plus it's status. This simulates a 10s delay.
    */
    if (current === 0) FOUND = true;

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
