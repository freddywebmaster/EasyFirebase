# EasyFirebaseReact

### Content list
- Installation
- Project Setting
- Docs not ready

## Installation
(`npm install easy-firebase-react firebase`)
install firebase if you dont have.

## Configurations
1. Import EasyFirebase from root dir of the lib
(`import EasyFirebase from "easy-firebase-react";`)

2. import the classes from functions dir of the lib, this classes contain the functions
(`import { Auth, Firestore, Storage } from "easy-firebase-react/functions";`)

3. inizialize the app with your firebase credentials

```
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
```
const auth = new Auth(app);
const firestore = new Firestore(app);
const storage = new Storage(app);
```

5. Export your instances to start use the functions
```
export {
    auth, firestore, storage
}
```

6. The final configuration would look like this ...

```
import EasyFirebase from "easy-firebase-react"; //to initialize your app firebase
import {
    Auth,
    Firestore,
    Storage
} from "easy-firebase-react/functions"; //classes with functions

//your credentials app
const firebaseConfig = {
  apiKey: "AIzaSyAN1c_G_bzj9T1YlIa9oofJhYBtdrZeKP8",
  authDomain: "whatsapp-clone-6919b.firebaseapp.com",
  projectId: "whatsapp-clone-6919b",
  storageBucket: "whatsapp-clone-6919b.appspot.com",
  messagingSenderId: "1055479720645",
  appId: "1:1055479720645:web:4d16ccce052bee156b1eac"
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

(`import { auth, firestore, storage } from 'YOUR_CONFIG_FILE'`)

2. use the functions avalibles...

```
firestore.addDoc('products', {
    name: 'tv', price: 500
})
```

# The library is not finished