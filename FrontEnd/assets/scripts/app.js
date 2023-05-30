import {SessionManager} from "./SessionManager.js"

/**
 * Vérifie si l'utilisateur est loggé
 */
document.querySelector('#authLink').addEventListener('click', (e) => {
    if (SessionManager().isAuthenticated()) {
        // console.log('app.js')
        e.preventDefault()
        e.target.innerText = `login`
        // console.log("login")
        SessionManager().unvalidate()
        SessionManager().refreshHUD()
    } else {
        if (e.target.getAttribute('href') === null) e.target.setAttribute('href', 'login.html')
    }
})