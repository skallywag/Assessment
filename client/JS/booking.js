
// const calBtn = document.getElementById('cal-btn')
const bookForm = document.getElementById('booking-form')

bookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let city = document.getElementById('book-city').value
    // console.log(city);
    let dateSlct = document.getElementById('date-slct').value
    // console.log(dateSlct);
    let weight = document.getElementById('payload').value
    // console.log(weight);
    let ticketQty = document.getElementById('ticket-qty').value
    // console.log(ticket);
    
    if(bookValidate({city, weight, ticketQty, dateSlct})){
        document.getElementById('book-city').value = 'City:'
        document.getElementById('payload').value = ''
        document.getElementById('ticket-qty').value = 'QTY'
        document.getElementById('date-slct').value = 'mm/dd/yyyy'

        let user = JSON.parse(localStorage.getItem('user'))
        let userId = user.id

        const card = `
                <h1 class="bk-confirm-title">Your Ticket Info:</h1>
                    <div class="confirm-ticket">
                        <div class="book-info">
                          <span>Name:</span><h2 id="updateName" class="update">${user.name}</h2>
                        </div>
                        <div class="book-info">
                           <span>Email:</span> <h2 id="updateEmail">${user.email}</h2>
                        </div>
                        <div class="book-info">
                            <span>Desination:</span> <h2 id="updateCity" class="update">${city}</h2>
                        </div>
                        <div class="book-info">
                            <span>Payload:</span> <h2 id="updateWeight" class="update">${weight}</h2>
                        </div> 
                        <div class="book-info">
                            <span>Ticket QTY:</span> <h2  id="updateTicketQty" class="update">${ticketQty}</h2>
                        </div>   
                        <div class="book-info">
                            <span>Date:</span> <h2  id="dateUpdate" class="update">${dateSlct}</h2> 
                        </div>
                        <div class="price-sum">
                            <span>Price:</span><div id="price"> </div><span>USD</span>
                        </div>
                    </div>
                    <div class="edit-btns">
                        <button id="edit-book-btn">Edit</button>
                        <button id="done-book-btn">Done</button>
                        <button id="delete-bk-btn">X</button>
                    </div> 
                    <div class="book-btn">
                        <button id="confirm-book-btn">Book</button>
                    </div>
        `
       const confrmCon = document.getElementById('confirm-con')
       confrmCon.innerHTML = card

       if(confrmCon.style.display === 'none'){
            confrmCon.style.display = 'flex'
       }

       const editBtn = document.getElementById('edit-book-btn')
       const doneBtn = document.getElementById('done-book-btn')
    //    const emailUpdate = document.getElementById('')
    //    const updateName = document.getElementById('')
       const updateInfo = document.querySelectorAll('.update')
    //    const updatePrice = document.getElementById('price')
       
       editBtn.addEventListener('click', () => {    
           for(let i = 0; i < updateInfo.length; i++){
               updateInfo[i].contentEditable = 'true'
               updateInfo[i].style.backgroundColor = 'darkgray'
           }
       })

       doneBtn.addEventListener('click', () => {

           for(let i = 0; i < updateInfo.length; i++){
               updateInfo[i].contentEditable = 'false'
               updateInfo[i].style.backgroundColor = '#C1440D'
           }

         

          
       })

       const deleteBtn = document.getElementById('delete-bk-btn')
       deleteBtn.addEventListener('click', () => {
        document.getElementById('confirm-con').remove()
       })

        const bookBtn = document.getElementById('confirm-book-btn')
        // console.log(bookBtn);
        bookBtn.addEventListener('click', () => {
            if(confrmCon.style.display === 'flex'){
                confrmCon.style.display = 'none'
            }
            axios.post('http://localhost:5432/api/trips', {userId, city, weight, ticketQty, dateSlct})
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
        errors.weight = `<span>please enter a payload/valid</span>`
        document.getElementById('payloadErr').innerHTML = errors.weight
    }
    
    if(input.ticketQty == 'QTY'){
        console.log(errors.ticketQty);
        errors.ticketQty = `<span>please select qty</span>`
        document.getElementById('qtyErr').innerHTML = errors.ticketQty
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



























 
 




