const fetch = require('node-fetch');

async function invoke(
    method,
    url,
    data = undefined,
    options = {
        timeout: 25000,
        headers: {},
    },
) {
    const headers = {};

    if (options.headers) {
        Object.entries(options.headers)
            .forEach(([key, value]) => {
                headers[key] = value;
            });
    }

    const opts = {
        method,
        headers,
    };

    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    let res;
    try {
        res = await Promise.race([
            fetch(url, opts),
            new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('timeout')), options.timeout || 25000);
            }),
        ]);
    } catch (ex) {
        throw ex;
    }

    if (!(res.status >= 200 && res.status < 300)) {
        try {
            const response = await res.json();
            throw response.message;
        } catch (ex) { /* ignore */ }

        throw res.statusText;
    }

    const result = await res.json();
    return result;
}

module.exports = invoke;
