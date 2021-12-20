const calBtn = document.getElementById('cal-btn')
console.log(calBtn);

calBtn.addEventListener('click', () => {
    const calendar = document.getElementById('cal-con')
    console.log(calendar);
    if(calendar.style.display === 'none'){
        calendar.style.display = 'flex'
    }
    
})