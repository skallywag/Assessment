
// const calBtn = document.getElementById('cal-btn')
const bookForm = document.getElementById('booking-form')

bookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = document.getElementById('book-city').value
    // console.log(city);
    const dateSlct = document.getElementById('date-slct').value
    // console.log(dateSlct);
    const weight = document.getElementById('payload').value
    // console.log(weight);
    const ticket = document.getElementById('ticket-qty').value
    // console.log(ticket);
    
    if(bookValidate({city, weight, ticket, dateSlct})){
        document.getElementById('book-city').value = 'City:'
        document.getElementById('payload').value = ''
        document.getElementById('ticket-qty').value = 'QTY'
        document.getElementById('date-slct').value = 'mm/dd/yyyy'
        let user = JSON.parse(localStorage.getItem('user'))
        let userId = user.id

       

        const card = `<h1>Your Ticket Info:</h1>
                    <div>
                    <span>Desination:</span> <h2 class="destination">${city}</h2>
                    <span>Payload:</span> <h2 class="destination">${weight}</h2>
                    <span>Ticket QTY:</span> <h2 class="destination">${ticket}</h2>
                    <span>Date:</span> <h2 class="destination">${dateSlct}</h2>
                     <button id="confirm-book-btn">Book</button>
                     </div>
        `
        document.getElementById('confirm-con').innerHTML = card
        

        
        
        const bookBtn = document.getElementById('confirm-book-btn')
        console.log(bookBtn);
        bookBtn.addEventListener('click', () => {
            axios.post('http://localhost:5432/api/trips', {userId, city, weight, ticket, dateSlct})
            .then(res => {
                console.log(res)
            })        
        })
    } 
})


function bookValidate(input){
    const user = JSON.parse(localStorage.getItem('user'))
    let errors = {}
    // console.log(input.city, 'city')
    if(input.city === 'City:'){
        console.log(errors.city)
        errors.city = `<span>please select a destination</span>`
        document.getElementById('cityErr').innerHTML = errors.city
    }
    
    if(input.weight === 0 || input.weight === ''){
        console.log(errors.weight);
        errors.weight = `<span>please eanter a payload</span>`
        document.getElementById('payloadErr').innerHTML = errors.weight
    }
    
    if(input.ticket == 'QTY'){
        console.log(errors.ticket);
        errors.ticket = `<span>please select qty</span>`
        document.getElementById('qtyErr').innerHTML = errors.ticket
    }

    if(input.dateSlct == 'mm/dd/yyyy'){
        console.log(errors.dateSlct)
        errors.dateSlct = `<span>Please select a date</span>`
        document.getElementById('dateErr').innerHTML = errors.dateSlct
    }

    if(!user){
       const logReq = document.getElementById('login-required')
       logReq.innerHTML = `Please Login`
    }

    
    if(Object.keys(errors).length === 0) return true
    console.log(errors)
    return false
}



function checkUser(){
    const logOut = document.querySelector('.log-out')
    // console.log(logOut)
    const accBtns = document.getElementById('acc-btns')
    // console.log(accBtns);
    const loggedName = document.getElementById('loggedName')

    const user = JSON.parse(localStorage.getItem('user'))

    if(user){
        logOut.style.display = 'flex'
        accBtns.style.display = 'none'
        loggedName.innerHTML = user.name
    }

    if(!user){
        logOut.style.display = 'none'
    }
}
checkUser()


const logOutUser = () => {
   window.localStorage.removeItem('user')
   const logOut = document.querySelector('.log-out')
   const accBtns = document.getElementById('acc-btns')
   const loggedName = document.getElementById('loggedName')

   logOut.style.display = 'none'
   accBtns.style.display = 'flex'
   loggedName.innerHTML = ''
}

const logOutBtn = document.getElementById('log-out')
logOutBtn.addEventListener('click', logOutUser)



























 
 




