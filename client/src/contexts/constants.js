export const apiUrl = process.env.NODE_ENV !== "production"
? "http://localhost:1337"
: "deploy"
export const LOCAL_TOKEN_USER = "_user"