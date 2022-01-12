# EasyFirebaseReact
This library is being created in order to facilitate repetitive functions in firebase projects, **easy-firebase-react** makes it easier for us to manage users, manage firestore, and upload files.
**This library is not finished but you can test it for now :)**

### Content list
- Installation
- Project Settings
- Firebase Authentication
- Docs not ready

## Installation
`npm install easy-firebase-react firebase`
only install firebase if you dont have.

## Configurations

1. Import EasyFirebase from root dir of the lib

`import EasyFirebase from "easy-firebase-react";`

2. import the classes from functions dir of the lib, this classes contain the functions

`import { Auth, Firestore, Storage } from "easy-firebase-react/functions";`

3. inizialize the app with your firebase credentials

```javascript
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

//pass your credentials to EasyFirebase and this return your app instance
const { app } = EasyFirebase(firebaseConfig);
```

4. instace the classes with your app inizialize in the constructor

```javascript
const auth = new Auth(app);
const firestore = new Firestore(app);
const storage = new Storage(app);
```

5. Export your instances to start use the functions

```javascript
export {
    auth, firestore, storage
}
```

6. The final configuration would look like this ...

```javascript
import EasyFirebase from "easy-firebase-react"; //to initialize your app firebase
import {
    Auth,
    Firestore,
    Storage
} from "easy-firebase-react/functions"; //classes with functions

//your credentials app
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

//pass your credentials to EasyFirebase and this return your app instance
const { app } = EasyFirebase(firebaseConfig);

//create new instance of classes
const auth = new Auth(app);
const firestore = new Firestore(app);
const storage = new Storage(app);

//export your instances
export {
    auth, firestore, storage
}
```

## Usage

1. import the instances created in your configuration

`import { auth, firestore, storage } from 'YOUR_CONFIG_FILE'`

2. use the functions avalibles...

```javascript
const res = firestore.addDoc('products', {
    name: 'tv', price: 500
});

//the functions returns errors or another responses
console.log(res);
```

# Firebase Authentication
Every time a user is created or a user is updated, easy-firebase-react also saves the data of this user in firestore to be able to have a control of users, for example sometimes we need to perform user searches, so remember to have ready database in firestore before authenticating users.

## Create Account With Email
1. Remenber activate the email auth options in your firebase console

2. make async function like this..

```javascript
import { auth } from 'YOUR_CONFIG_FILE';

const onSubmit = async () => {
  const res = await auth.createAccount(
    'email@email.com',
    'pass1234',
    'NameUser' //name user is optional
  );
  //manage errors
  if(res.error) return alert(res.message);
  if(!res.error) return alert(res.message);
}
```

## Login With Email Account
1. Remenber activate the email auth options in your firebase console

2. make async function like this..

```javascript
import { auth } from 'YOUR_CONFIG_FILE';

const onSubmit = async () => {
  const res = await auth.loginAccount(
    'email@email.com',
    'pass1234'
  );
  //manage errors
  if(res.error) return alert(res.message);
  if(!res.error) return alert(res.message);
}
```

## Login With Google Provider
1. Remenber activate the google auth options in your firebase console

2. make async function like this..

```javascript
import { auth } from 'YOUR_CONFIG_FILE';

const onClickButton = async () => {
  const res = await auth.loginGoogle();

  //manage errors
  if(res.error) return alert(res.message);
  if(!res.error) return alert(res.message);
}
```

## Login With Github Provider
1. Remenber activate the github auth options in your firebase console and set config needs in github. Read more in [firebase docs auth with github](https://firebase.google.com/docs/auth/web/github-auth)

2. make async function like this..

```javascript
import { auth } from 'YOUR_CONFIG_FILE';

const onClickButton = async () => {
  const res = await auth.loginGithub();

  //manage errors
  if(res.error) return alert(res.message);
  if(!res.error) return alert(res.message);
}
```

# Manage User Authenticated
you can manage the current user auth with a custom hook from EasyFirebase lib

## Example
```javascript
import { useAuth } from 'easy-firebase-react/hooks';

const HomeView = () => {

  const user = useAuth();

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
import { auth } from 'YOUR_CONFIG_FILE';

auth.closeSession();
```