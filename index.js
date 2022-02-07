const { initializeApp } = require("firebase/app");
require("firebase/compat/firestore");
require("firebase/compat/auth");
require("firebase/storage");

const EaseFirebase = (appCredentials) => {
  //initialize firebase app
  const app = initializeApp(appCredentials);

  // return instace whit app configurated
  return {
    app
  };
};
module.exports = EaseFirebase;