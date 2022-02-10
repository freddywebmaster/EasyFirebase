const { initializeApp } = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
require("firebase/storage");

const EaseFirebase = (appCredentials, nameApp) => {
  //initialize firebase app
  const app = initializeApp(appCredentials, nameApp || '[DEFAULT]');

  // return instace whit app configurated
  return app;
};
module.exports = EaseFirebase;