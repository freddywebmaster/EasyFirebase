import { useEffect, useState } from 'react';

function useAuth(auth: any){
    const [userAuth, setUserAuth] = useState(null);

    useEffect(()=>{
        const unsuscribe = auth.onAuthStateChanged( (user: any) =>{
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