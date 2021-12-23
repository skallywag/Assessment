

// const calBtn = document.getElementById('cal-btn')
const bookForm = document.getElementById('booking-form')

bookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = document.getElementById('book-city').value
    console.log(city);
    const dateSlct = document.getElementById('date-slct').value
    console.log(dateSlct);
    const weight = document.getElementById('payload').value
    console.log(weight);
    const ticket = document.getElementById('ticket-qty').value
    console.log(ticket);
    
    if(bookValidate({city, weight, ticket, dateSlct})){
        document.getElementById('book-city').value = 'City:'
        document.getElementById('payload').value = ''
        document.getElementById('ticket-qty').value = 'QTY'
        let user = JSON.parse(localStorage.getItem('user'))
        let userId = user.id

        




        axios.post('http://localhost:5432/api/trips', {userId, city, weight, ticket, dateSlct})
        .then(res => {
            console.log(res)
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


// calBtn.addEventListener('click', (e) => {
//     // e.preventDefault()
// const calendar = document.getElementById('cal-con')
// console.log(calendar);
// if(calendar.style.display === 'none'){
//     calendar.style.display = 'flex'
// }
// })



























 
 




