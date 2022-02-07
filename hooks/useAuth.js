const { useEffect, useState } = require('react');
const { getAuth } = require('firebase/auth');

function useAuth(){

    const auth = getAuth();
    const [userAuth, setUserAuth] = useState(null);

    useEffect(()=>{
        const unsuscribe = auth.onAuthStateChanged( (user) =>{
            if( user ){
                setUserAuth(user)
            }else{
                setUserAuth(null);
            }
        });
        return ()=> unsuscribe();
        // eslint-disable-next-line
    },[userAuth]);

    return userAuth;
}

module.exports = useAuth;