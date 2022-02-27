const { initEasyFirebase } = require("./dist/index");

const { Authentication, Firestore, Storage } = require("./dist/functions");

const { useAuthHook } = require("./dist/hooks");

module.exports = {
  initEasyFirebase,
  Authentication,
  Firestore,
  Storage,
  useAuthHook,
};