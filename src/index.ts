import { initializeApp, FirebaseOptions, FirebaseApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export const initEasyFirebase = (
  appCredentials: FirebaseOptions,
  nameApp?: string
): FirebaseApp => {
  //initialize firebase app
  const app: FirebaseApp = initializeApp(
    appCredentials,
    nameApp || "[DEFAULT]"
  );

  // return instace with app configurated
  return app;
};
