/* eslint-disable */
const config ={
  projectId: "pick-778fb",
  databaseURL: "gs://pick-778fb.appspot.com"
};
let app = firebase.initializeApp(config)

const db = app.firestore()

db.settings({timestampsInSnapshots: true});
db.enablePersistence();

export { db };