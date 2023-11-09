export const getJWTToken = () => {
    return localStorage.getItem('jwt');
};

export const setJWTToken = (jwt: string) => {
    localStorage.setItem('jwt', jwt);
};

export const removeJWTToken = () => {
    localStorage.removeItem('jwt');
};

export const getAPIKey = () => {
    return localStorage.getItem('apiKey');
};

export const setAPIKey = (apiKey: string) => {
    localStorage.setItem('apiKey', apiKey);
};

export const removeAPIKey = () => {
    localStorage.removeItem('apiKey');
};
