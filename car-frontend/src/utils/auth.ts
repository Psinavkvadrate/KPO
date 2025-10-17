export function setUser(user: unknown) {
    localStorage.setItem('user', JSON.stringify(user))
}


export function getUser() {
    const s = localStorage.getItem('user')
    return s ? JSON.parse(s) : null
}


export function clearUser() {
    localStorage.removeItem('user')
}