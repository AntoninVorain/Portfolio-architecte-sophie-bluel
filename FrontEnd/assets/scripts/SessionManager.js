import { createAdminHUD, deleteAdminHUD } from "./AdminHUD.js"

export const SessionManager = () => {
    // console.log('sessionManager')
    return {
        refreshHUD: (data = null) => SessionManager().isAuthenticated() ? createAdminHUD(data = null) : deleteAdminHUD(),
        /**
         * retire le jeton 
         */
        unvalidate: () => sessionStorage.removeItem('token'),
        /**
         * met le jeton dans session storage
         */
        validate: (token, expire = null) => sessionStorage.setItem('token', token),
        /**
         * Retourne le jeton stocké
         * @returns string
         */
        getToken: () => {
            return sessionStorage.getItem('token')
        },
        /**
         * Vérifie si le jeton de l'utilisateur est correctement stocké dans session storage
         * @returns bool
         */
        isAuthenticated: () => {
            let storedToken = SessionManager().getToken()
            if (storedToken === null) return false
            return true;
        }
    }
}