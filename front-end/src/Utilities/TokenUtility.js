import Cookie from "js-cookie";
const tokenKey = "MOTHERSELLERSTOKEN";

const getToken = () => (Cookie.get(tokenKey) ? Cookie.get(tokenKey) : null);
const saveToken = token => Cookie.set(tokenKey, token);

export { getToken, saveToken };
