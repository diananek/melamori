import Cookie from 'universal-cookie';


const getOptions = (host) => (options) => ({
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    domain: host,
    ...options,
});


class Cookies {

    constructor(ctx, host) {
        this.cookies = new Cookie(ctx);
        // noinspection TypeScriptUnresolvedVariable
        this.getOpts = getOptions(host);
    }

    get = (name, options = {}) => this.cookies.get(name, this.getOpts(options))

    set = (
        name,
        value,
        options = {}
    ) =>
        this
            .cookies
            .set(name, value, this.getOpts(options))

    remove = (name, options) => this.cookies.remove(name, this.getOpts(options))
}

export const useCookies = (cookie, host) => new Cookies(cookie, host);

export const rawCookies = (cookie) => new Cookies(cookie);
