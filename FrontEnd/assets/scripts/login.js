import { API_URL } from "./Constantes.js"
import {SessionManager} from './SessionManager.js'

if (SessionManager().isAuthenticated()) window.location.href = `./index.html`

const loginForm = document.querySelector('.login-form')
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const inputEmail = document.querySelector('input[type=email]')
    const inputPassword = document.querySelector('input[type=password]')

    const credentials = {
        email: inputEmail.value,
        password: inputPassword.value
    }

    // const credentials = {
    //     email: `sophie.bluel@test.tld`,
    //     password: `S0phie`
    // }

    const headers = {
        "Content-Type": "application/json"
    }

    const request = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(credentials)
    }).then(response => response)

    const data = await request.json()

    let errorsMessage = document.querySelector('.errors')

    switch (request.status) {
        case 200:
            SessionManager().validate(data.token)
            window.location.href = `./index.html`
            break;
        case 401:
            errorsMessage.innerText = `L'adresse e-mail et/ou le mot de passe sont incorrect`
            break;
        default:
            errorsMessage.innerText = `${request.status} ${request.statusText}`
    }
})
    
const input = document.getElementById("email")
const password = document.getElementById("password")
const patterns = {
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
}
const pattern2 = {
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/
}
// var regex = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/


function validate(field, regex) {
    if (regex.test(field.value)) {
        field.className='valid'
    }
    else {
        field.className='invalid'
    }
}

input.addEventListener('keyup', (e) => {
    validate(e.target, patterns[e.target.attributes.name.value])
})

password.addEventListener('keyup', (e) => {
    validate(e.target, pattern2[e.target.attributes.name.value])
})