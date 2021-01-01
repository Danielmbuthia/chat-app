const socket = io()
const messageForm = document.querySelector('#sendForm');
const messageFormInput = document.querySelector('input');
const messageFormButton = document.querySelector('button');
const locationButton = document.querySelector('#sendLocation');
const messageDiv = document.querySelector('#messages');
const messageTemplate = document.querySelector('#message-template').innerHTML;

socket.on('message',(welcome)=>{
    console.log(` ${welcome}`)
     const html = Mustache.render(messageTemplate,{
         message:welcome
     });
     messageDiv.insertAdjacentHTML('beforeend',html)
})


messageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    messageFormButton.setAttribute('disabled','disabled');
   const message = e.target.elements.message.value;
    socket.emit('sendMessage',message,()=>{
        messageFormButton.removeAttribute('disabled');
        messageFormInput.value='';
        messageFormInput.focus();
        console.log('Message delivered!')
    })
});

locationButton.addEventListener('click',()=>{
    if (!navigator.geolocation){
        return alert('Your browser does not support this');
    }
    locationButton.setAttribute('disabled','disabled');
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation', {
           'lat':position.coords.latitude,
            'long':position.coords.longitude
        },()=>{
            locationButton.removeAttribute('disabled');
            console.log('Location shared!')
        })
    });
});
