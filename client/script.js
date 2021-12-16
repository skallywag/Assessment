

const createForm = document.querySelector('#create-form')
// console.log(createForm);
const loginForm = document.querySelector('#login-form')
// console.log(loginForm);
const error = document.getElementById('error')

const zipBtn = document.getElementById('zip-btn')
// console.log(zipBtn);
const tempCard = document.getElementById('temp-card')


function closeForm(){

    const createForm = document.querySelector('.form-con')
    if (createForm.style.display === 'flex'){
        createForm.style.display = 'none'
    }

    const loginForm = document.querySelector('.login-con')
    console.log(loginForm);
    if(loginForm.style.display === 'flex'){
        loginForm.style.display = 'none'
    }
}

function showLogin(){
    const loginForm = document.querySelector('.login-con')
    if(loginForm.style.display === 'none'){
        loginForm.style.display = 'flex'
    }
}

function showSignUp(){
    const createForm = document.querySelector('.form-con')
    if(createForm.style.display === 'none'){
        createForm.style.display = 'flex'
    }
}

createForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmPass = document.getElementById('pass-confirm').value
    
    if(validate({name, username, email, password, confirmPass})){
        console.log(true);
        document.getElementById('err').innerHTML = ''
        document.getElementById('name').value = ''
        document.getElementById('username').value = ''
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        document.getElementById('pass-confirm').value = ''

        const success = document.createElement('h1')
        success.textContent = 'Account Created!'
        document.body.append(success) 
        

        axios.post('http://localhost:5432/api/users', {name, username, email, password})
        .then(console.log('success'))
        .catch(err => console.log(err))
    }
})


function validate(input){
    let errors = {}
    const passRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)
    if(!passRegex.test(input.password)){
        errors.password = '<span class="error">Enter a valid password</span>'
        console.log(input.password)
        document.getElementById('errPassword').innerHTML = errors.password
    } 

    if(input.confirmPass !== input.password){
        console.log(input.confirmPass);
        errors.confirmPass = '<span class="error">Password does not match</span>'
        document.getElementById('errConfirm').innerHTML = errors.confirmPass
    }

    if(input.name.length < 3){
        errors.name = '<span class="error">Enter a valid name</span>'
        document.getElementById('errName').innerHTML = errors.name
    }

    if(input.username.length < 3){
        errors.username = '<span class="error">Enter a user name</span>'
        document.getElementById('errUsername').innerHTML = errors.username
    }

    const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g)
    if(!emailRegex.test(input.email)){
        errors.email = '<span class="error">Enter a valid Email</span>'
        console.log(input.email)
        document.getElementById('errEmail').innerHTML = errors.email
    }

    if(Object.keys(errors).length === 0) return true
    console.log(errors)
    return false
}




loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    loginEmail = document.getElementById('login-email').value 
    loginPass = document.getElementById('login-pass').value
    // console.log(loginEmail);
    // console.log(userLogin);

    if(loginValid({loginEmail, loginPass})){
        // console.log(userLogin);
        console.log(true);
        document.getElementById('login-email').value = ''
        document.getElementById('login-pass').value = ''
        
        
        axios.post('http://localhost:5432/api/login', {loginEmail, loginPass})
        .then((req, res) => {
           
            if(req.data === ''){
                console.log('user not found');
            }

        })
        .catch(err => console.log(err))
    }
})

function loginValid(input){
    let errors = {}
    if(input.loginEmail === '' || input.loginPass === ''){
        errors.loginEmail = '<span class="error">Invalid inputs</span>'
        document.getElementById('errLogin').innerHTML = errors.loginEmail
    }

    if(Object.keys(errors).length === 0) return true
    console.log(errors)
    return false

}


zipBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const zipCode = document.getElementById('zip-code').value
    
    document.getElementById('zip-code').value = ''

    axios.get(`https://api.weatherapi.com/v1/current.json?key=77781fb0f0734297b2603939211512&q=${zipCode}&aqi=no`)
    .then(res => {
        // console.log(res.data);
        let iconSrc = res.data.current.condition.icon
        const location = res.data.location.name
            let tempNum = res.data.current.temp_f
         let tempInt = Math.ceil(tempNum)
        // console.log(iconSrc);   
        // console.log(iconImg);

        document.getElementById('temp-card')
        const li = document.createElement('li')
        
        const cardContent =  
        `<div class="temp-card">
        <h1 class="location">${location}</h1>
        <span class="city-temp">${tempInt}</span><sup class="degree">°F</sup>
        <img src="http:${iconSrc}" alt="">
        </div>`
                                      
        li.innerHTML = cardContent
        document.getElementById('weather-list').appendChild(li)
    })
})


