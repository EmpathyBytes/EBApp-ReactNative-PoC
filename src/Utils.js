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

async function waitFor(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export {sendGraphQl, waitFor}