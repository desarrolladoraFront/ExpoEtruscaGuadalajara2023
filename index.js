// Array for user objetct.
const USERS = {};
//Variable that creates alert messages.
const WARNINGS_MESSAGE = document.getElementById('warnings');
const USER_NAME = document.getElementById('name').value;
const TELEPHONE_NUMBER = document.getElementById('number').value;


document.addEventListener("DOMContentLoaded", function(event) {
    //código a ejecutar cuando el DOM está listo para recibir acciones
    if (localStorage.getItem('email') !== null) {
        console.log(`Email address exists`);
        openNewPage()
    } else {
        console.log(`Email address not found`);
    }
   
});

// Delete the dom and create the message "Congratulations you can stop by for your gift".
function openNewPage() {

    const root = document.getElementById('root');
    root.innerHTML= '';

    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const codigoPremio = document.createElement('h2');
    

    div.classList = 'divFelicidades';
    img.setAttribute('src', 'https://amcce.org/images/AMCCE-BLANCO.svg');
    img.classList = 'logoAMCCE';
    h1.style.color = 'white';
    

    h1.textContent = '¡Gracias por tu registro!';
    h2.textContent = 'Ven por tu regalo al stand 710 de la AMCCE.';
    codigoPremio.textContent = 'Este es tu código: ' + localStorage.getItem('codigo')

    div.append(h1, h2, img, codigoPremio);

    root.appendChild(div);
}

//Check and save the name.
function saveName (){
    const USER_NAME = document.getElementById('name').value;

    if ( USER_NAME == null || USER_NAME.length == 0 || /^\s+$/.test(USER_NAME) ) {
        WARNINGS_MESSAGE.innerHTML ='Hey escribe un nombre';
            } else {
                USERS.name = USER_NAME;
                }
}

//Check and save telephone number.
function saveNumber(){
    const TELEPHONE_NUMBER = document.getElementById('number').value;

    if (TELEPHONE_NUMBER == null || TELEPHONE_NUMBER.length == 0 || /^\s+$/.test(TELEPHONE_NUMBER)){
        WARNINGS_MESSAGE.innerHTML ='Tú número telefónico debe tener 10 digitos.';
            } else {
                USERS.number = TELEPHONE_NUMBER;
            }
}

//Check and save email.
function saveEmail(){
    const EMAIL = document.getElementById('email').value;
  // Define our regular expression.
    const IS_VALID_EMAIL =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // Using test we can check if the text match the pattern.
        if( IS_VALID_EMAIL.test( jQuery('#email').val() ) ){
            USERS.email = EMAIL;
            return true;
        }else{
            // alert('Email is invalid, skip form submission');
            return false;
        }
}

function checkbox() {
    const THANKS_MESSAGE = document.getElementById('thanksForSuscribing');
    const CHECKBOX = document.getElementById('checkboxNewsLetter');

        if (CHECKBOX.checked == true) {
            THANKS_MESSAGE.innerHTML = '¡Gracias por suscribirte!';
            USERS.newLetter = true;
        } else {
            USERS.newLetter = false;
        }
}


function onsub(event){
    event.preventDefault();
    document.getElementById('divBtn').style.display = 'none';
    document.getElementById('reload').style.display = 'block';
    saveName();
    checkbox();
    saveNumber();
    saveEmail();
          fetch('https://cafeetrusca.com/api/newsLetter', {
            method: "POST",
            body: JSON.stringify(USERS),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              }
          }).then(response => {
            response.json().then(parsedValue => {  console.log(parsedValue);
            localStorage.setItem('codigo', parsedValue.codigo),
            localStorage.setItem('email', parsedValue.email),
            location.reload()
            
        })}).catch(err => console.log(err));
   
};


    //Botones
const logo = document.getElementById('logo');
logo.addEventListener('click', () => {
    window.open('https://cafeetrusca.com/');
})

const face = document.getElementById('btnFacebook');
face.addEventListener('click', () => {
    window.open('https://www.facebook.com/cafeetrusca/?locale=es_LA');
})

const twitter = document.getElementById('btnTwitter');
twitter.addEventListener('click', () => {
    window.open('https://twitter.com/cafeetrusca?lang=es');
})

const instagram = document.getElementById('btnInstagram');
instagram.addEventListener('click', () => {
    window.open('https://www.instagram.com/cafe.etrusca/');
})



