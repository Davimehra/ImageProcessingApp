import axios from 'axios';

async function Authenticate(mode, Email, Password) {

    const WebApi = 'AIzaSyCeCuTwXbjD_p--mJ4y130RHbTlDkEHQp0';
    const HttpRequestUrl = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${WebApi}`;
    const response = await axios(HttpRequestUrl, {
        method: 'post',
        data: { email: Email, password: Password, returnSecureToken: true },
        headers: { 'Content-Type': 'Content-Type: application/json' }
    })
    return (response);
}

export function SignUp(Email, Password) {
    return Authenticate('signUp', Email, Password);
}

export function SignIn(Email, Password) {
    return Authenticate('signInWithPassword', Email, Password);
}


