"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthHook = void 0;
const react_1 = require("react");
const auth_1 = require("firebase/auth");
function useAuthHook() {
    const auth = (0, auth_1.getAuth)();
    const [userAuth, setUserAuth] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const unsuscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserAuth(user);
            }
            else {
                setUserAuth(null);
            }
        });
        return () => unsuscribe();
        // eslint-disable-next-line
    }, [userAuth]);
    return userAuth;
}
exports.useAuthHook = useAuthHook;
