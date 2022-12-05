/**
 * Send a graphql query and returns a promise with the reply
 * @param query The graphql query to POST to endpoint
 * @param endpoint The endpoint to query
 */
async function sendGraphQl(query, endpoint) {
    let r = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query})
          })
    return r.json();
}

/**
 * Waits for a certain amount of time before continuing
 * @param time The amount of milliseconds to wait for
 */
async function waitFor(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export {sendGraphQl, waitFor}