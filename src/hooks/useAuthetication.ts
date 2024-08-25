import { login, logout } from "@/stores/modules/authentication";
import { useDispatch } from "react-redux";

import { LoginCredential } from "@/models/login-credential";
import { AuthedRoutes } from "@/constants/route-constants";

export function useAuthentication() {
    const dispatch = useDispatch<any>();
    // TODO: Make the optional parameter mandatory
    const handleLogin = (credentials?: LoginCredential) => {
        if (credentials) {
            dispatch(login(credentials, AuthedRoutes.home));
        }
    };
    const handleLogout = () => {
        dispatch(logout());
    };

    return { handleLogin, handleLogout };
}
