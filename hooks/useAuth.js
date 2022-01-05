import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

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

export default useAuth;