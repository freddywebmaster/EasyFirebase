"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useAuth(auth) {
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
exports.default = useAuth;
