const isDev = process.env.NODE_ENV === "development";
export const signalingServer = isDev ? "http://192.168.2.5:3001" : "not yet implemented";