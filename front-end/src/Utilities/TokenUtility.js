import Cookie from "js-cookie";
const tokenKey = "MOTHERSELLERSTOKEN";

const getToken = async () =>
  (await Cookie.get(tokenKey)) ? await Cookie.get(tokenKey) : null;
const saveToken = async token => await Cookie.set(tokenKey, token);

export { getToken, saveToken };
