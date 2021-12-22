const calBtn = document.getElementById('cal-btn')
// const cityError = document.getElementById('city-err')


const bookForm = document.getElementById('booking-form')
// console.log(bookForm);

bookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = document.getElementById('book-city').value
    console.log(city);
    const date = document.getElementById('calendar').value
    console.log(date);
    const weight = document.getElementById('payload').value
    console.log(weight);
    const ticket = document.getElementById('ticket-qty').value
    console.log(ticket);
    
    if(bookValidate({city, weight, ticket})){
        
    }
    
    
    
    
})


function bookValidate(input){
    let errors = {}
    // console.log(input.city, 'city')
    if(input.city === '0'){
        // console.log(errors.city)
        errors.city = `<span>please select a city</span>`
        document.getElementById('cityErr').innerHTML = errors.city
    }
    
    if(input.weight === 0 || input.weight === ''){
        // console.log(errors.weight);
        errors.weight = `<span>please eanter a weight</span>`
        document.getElementById('weightErr').innerHTML = errors.weight
    }
    
    if(input.ticket == 'QTY' ){
        // console.log(errors.ticket);
        errors.ticket = `<span>please enter qty</span>`
        document.getElementById('qtyErr').innerHTML = errors.ticket
    }
    
    
    if(Object.keys(errors).length === 0) return true
    console.log(errors)
    return false
}


calBtn.addEventListener('click', (e) => {
        // e.preventDefault()
    const calendar = document.getElementById('cal-con')
    console.log(calendar);
    if(calendar.style.display === 'none'){
        calendar.style.display = 'flex'
    }
})

