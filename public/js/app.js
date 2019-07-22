

const weatherform = document.querySelector('form')    
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
//messageOne.textContent = ''
const messageTwo = document.querySelector('#message2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
           
            if (data.error) {
                messageOne.textContent = error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })

})