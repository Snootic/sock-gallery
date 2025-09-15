const isDev = process.env.NODE_ENV === "development";
export const signalingServer = isDev ? "http://localhost:3001" : "https://galleryapi.coisas-mais-estranhas.com.br";