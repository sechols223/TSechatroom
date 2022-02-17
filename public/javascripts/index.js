const form = document.querySelector('form');
const username = document.getElementById('floatingUsername')
const password = document.getElementById('floatingPasswordR')
const email = document.getElementById('floatingEmailR')
const display = document.querySelector('.error')
console.log('run')
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    display.textContent = ''
    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username: username.value, password: password.value, email: email.value }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        if(res.status === 400 || res.status === 401){
            return display.textContent = `${data.message}. ${data.error ? data.error : ''}`
        }
        data.role === "admin" ? location.assign('/admin') : location.assign('/basic')
    } catch (err) {
        console.log(err.message)
    }
})