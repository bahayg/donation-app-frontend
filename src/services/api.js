const API_ROOT = `http://localhost:3000`;

const token = () => localStorage.getItem("token");

const headers = () => ({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token()
})

const login = data =>
    fetch(`${API_ROOT}/auth`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)
    }).then(r => r.json())

const getCurrentUser = () => {
    return fetch(`${API_ROOT}/auth/current_user`, {
        headers: headers()
    }).then(res => res.json());
};

const signup = user =>
    fetch(`${API_ROOT}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(user)
    }).then(res => res.json())


const getCharities = () => {
    return fetch(`http://localhost:3000/charities`, {
        headers: headers()
    }).then(res => res.json())
}

export const api = {
    auth: {
        login,
        getCurrentUser,
        signup
    },
    charities: {
        getCharities
    }
};