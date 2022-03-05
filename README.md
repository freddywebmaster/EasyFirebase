# EasyFirebaseReact

This library was created to facilitate repetitive functions in Firebase projects, **easy-firebase-react** makes it easy for us to manage users, Firestore database and upload files to storage.

This library comes equipped with ready-to-use classes and methods, and if you're using **react**, there are some custom hooks available.

### Content list

- Before Start
- Installation
- Project Settings
- Usage
- Manage Errros
- Firebase Authentication
- Firebase Firestore
- Firebase Storage

## Before Start

- Before starting I would like to mention that the examples I use are with async functions but you can use promises without problems, except for the functions that receive callbacks, those are already promises.

- the documentation is somewhat incomplete but there are already several functions ready to use

## Installation

`npm install easy-firebase-react`

- You dont need install firebase! becouse is a dependency of this library

## Configurations

create a config file like this.. and only need set your credentials.

```javascript
import {
  initEasyFirebase,
  Authentication,
  Firestore,
  Storage,
} from "easy-firebase-react";

//your credentials app
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

//pass your credentials to EasyFirebase and this return your app instance
const app = initEasyFirebase(firebaseConfig);

//create new instance of classes
const auth = new Authentication(app);
const firestore = new Firestore(app);
const storage = new Storage(app);

//export your instances
export { auth, firestore, storage };
```

## Usage

1. import the instances created in your configuration

`import { auth, firestore, storage } from 'YOUR_CONFIG_FILE'`

2. use the functions avalibles with async/await...

```javascript
const res = await firestore.addDoc("products", {
  name: "tv smart 3",
  price: 500,
});
//Manage Errors
if (res.error) {
  console.log(`error adding doc: ${res.message}`);
} else {
  console.log("doc added: ", res.data);
}
```

# Manage Errors

- all functions of this library return firebase errors or custom errors
- for better information you can log the response to the console

```javascript
const res = await auth.loginGithub();

//manage errors
if (res.error) return alert(res.message);
if (!res.error) return alert(res.message);
console.log(res);
```

# Firebase Authentication

### All auth functions avalibles

```javascript

  createAccount(
    email: string,
    password: string,
    name?: string
  );
  loginAccount(email: string, password: string);
  loginGoogle();
  loginGithub();
  loginFacebook();
  loginTwitter();
  updatePass(
    password: string,
    newPassword: string,
    callback?: Function
  );
  UpdateProfile(data: IUpdateProfile, callback?: Function);
  reAuthUser(password: string, callBack: Function);
  sendVerification(callback?: Function);
  sendResetPassword(email: string, callback: Function);
  deleteAccount(password: string, callback: Function);
  updateEmail(
    password: string,
    newEmail: string,
    callback?: Function
  );
  closeSession(callback?: Function);

```

## Create Account With Email

1. Remenber activate the email auth options in your firebase console

2. make async function like this.. (if you want, you can use promises)

```javascript
import { auth } from "YOUR_CONFIG_FILE";

const onSubmit = async () => {
  const res = await auth.createAccount(
    "email@email.com",
    "pass1234",
    "NameUser" //name user is optional
  );
  //manage errors
  if (res.error) return alert(res.message);
  if (!res.error) return alert(res.message);
};
```

## Login With Email Account

1. Remenber activate the email auth options in your firebase console

2. make async function like this..

```javascript
import { auth } from "YOUR_CONFIG_FILE";

const onSubmit = async () => {
  const res = await auth.loginAccount("email@email.com", "pass1234");
  //manage errors
  if (res.error) return alert(res.message);
  if (!res.error) return alert(res.message);
};
```

## Login With Google Provider

1. Remenber activate the google auth options in your firebase console

2. make async function like this..

```javascript
import { auth } from "YOUR_CONFIG_FILE";

const onClickButton = async () => {
  const res = await auth.loginGoogle();

  //manage errors
  if (res.error) return alert(res.message);
  if (!res.error) return alert(res.message);
};
```

## Login With Github Provider

1. Remenber activate the github auth options in your firebase console and set config needs in github. Read more in [firebase docs auth with github](https://firebase.google.com/docs/auth/web/github-auth)

2. make async function like this..

```javascript
import { auth } from "YOUR_CONFIG_FILE";

const onClickButton = async () => {
  const res = await auth.loginGithub();

  //manage errors
  if (res.error) return alert(res.message);
  if (!res.error) return alert(res.message);
};
```

# Manage User Authenticated

you can manage the current user auth with a custom hook from EasyFirebase lib

## Example

```javascript
import { useAuthHook } from "easy-firebase-react";

const HomeView = () => {

  const user = useAuthHook();

  return(
    <div>
      {
        user ? (<p>{user.displayName}</p>) : (<p>user not auth<p/>)
      }
    </div>
  )
}
```

## Close Session

to close a session you can use the next function

```javascript
import { auth } from "YOUR_CONFIG_FILE";

auth.closeSession();
```

# Firebase Firestore
### All firestore functions avalibles

```javascript
addDoc(col: string, data: any, id?: string);
  updateDoc(
    col: string,
    docId: string,
    newData: any,
    merge: boolean
  );
  deleteDoc(col: string, idDoc: string);
  addInArray(
    col: string,
    id: string,
    field: string,
    data: any
  );
  deleteInArray(
    col: string,
    id: string,
    field: string,
    data: any
  );
  incOrDecNumber(
    col: string,
    docId: string,
    field: string,
    number: number
  );
  deleteField(col: string, docId: string, field: string);
  getDocById(col: string, id: string);
  getDocsByParam(
    col: string,
    field: string,
    condition: WhereFilterOp,
    param: string
  );
  getAllInCol(col: string);
  getDocByIdRT(
    col: string,
    id: string,
    callBack: Function
  );
  getDocsByParamRT(
    col: string,
    field: string,
    condition: WhereFilterOp,
    param: string,
    callBack: Function
  );
  arrayContainsAny(
    col: string,
    field: string,
    array: Array<any>
  );
  arrayContains(col: string, field: string, value: any);
  getMultipleCol(arrayCollections: Array<string>);
```

## Add new document

- you can create a new document with the 'addDoc' function
- the id is automatically generated but if you need a custom id you can pass it as the third parameter

```javascript
const newDoc = await firestore.addDoc("products", {
  name: "tv smart 3",
  price: 500,
  active: true,
});
//Manage Errors
if (newDoc.error) {
  console.log(`error adding doc: ${newDoc.message}`);
} else {
  console.log("doc added: ", newDoc);
}
```

## Update or Replace existend document

- You can update a document with the 'updateDoc' function
- by default it does a data merge, but you can replace the entire document by passing the value of false in the fourth parameter

```javascript
const update = await firestore.updateDoc("products", "a7BTAeEnYbbXi2vCjoql", {
  price: 600,
});
console.log(update);
```

## Delete existend document

- you can delete a document passing it the collection and the id of the document

```javascript
const docDelete = await firestore.deleteDoc("products", "89btftioa87SQjEIswjP");
console.log(docDelete);
```

## Add data in array

- adds data to an array, it can be anything, a string, object, array, etc.
- if the array does not exist yet it will create it and add the data

```javascript
const addA = await firestore.addInArray(
  "products", //collection
  "8RvHtf437D4clakqBtNO", //idDoc
  "categories", //array field
  "category1" // data to add
);
console.log(addA);
```

## Delete data in array

- to delete data from an array you have to pass the complete data so that it is deleted correctly

```javascript
const delA = await firestore.deleteInArray(
  "products", //collection
  "8RvHtf437D4clakqBtNO", //docId
  "categories", //Array field
  {
    //All data of document to delete
    description: "desc of category",
    name: "category one",
  }
);
console.log(addA);
```