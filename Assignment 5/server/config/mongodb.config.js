const userId = "inupedia";
const password = "ZOl1AtoGQ7ekybc8";
const cluster = "cluster0.jjo8og5.mongodb.net";
// const userId = "yourUserId";
// const password = "yourPassword";
// const cluster = "yourCluster";
const url = `mongodb+srv://${userId}:${password}@${cluster}/?retryWrites=true&w=majority`;
export default url;
