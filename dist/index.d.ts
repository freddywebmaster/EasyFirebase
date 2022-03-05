import { FirebaseOptions, FirebaseApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
export declare const initEasyFirebase: (appCredentials: FirebaseOptions, nameApp?: string | undefined) => FirebaseApp;
