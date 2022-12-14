const API_URL = process.env.API_ENDPOINT;
const Version = process.env.API_VERSION;

async function fetcher(url, options) {
    // ${Version}/
    const response = await fetch(`${API_URL}/api` + url, options);
    return await response.json();
}

const API = API_URL + "/" + Version;

const healthCheck = async function () {
    return await fetcher(`/health-check`, {
        method: "GET",
    });
};

const login = async function (body) {
    return await fetcher(`/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
};

const register = async function (body) {
    return await fetcher(`/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
};

const fetchUser = async function (Token) {
    return await fetcher(`/${Version}/users/@me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Token || null,
        },
    });
}

const fetchGuilds = async function (Token) {
    return await fetcher(`/${Version}/guilds/fetch`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Token || null,
        },
    });
}


const newGuild = async function (Token, body) {
    return await fetcher(`/${Version}/guilds/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Token || null,
        },
        body: JSON.stringify(body),
    });
};

export {
    API,
    fetcher,
    healthCheck,
    login,
    register,
    fetchUser,
    fetchGuilds,
    newGuild,
}