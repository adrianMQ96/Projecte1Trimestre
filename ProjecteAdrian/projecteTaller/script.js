import { setCookie, getCookie } from './cookies.js';
import{usuaris, Usuari} from './usuari.js';

let cardContainer;//Variable


class Cita {//Classe
  constructor(client, estat, treballador, data, tempsEstimat, tempsReal){
    this.client = client;
    this.estat = estat;
    this.treballador = treballador;
    this.data = data;
    this.tempsEstimat = tempsEstimat;
    this.tempsReal = tempsReal;
  }
  dibuixar = () => {
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';
    card.style = 'width: 15rem; padding: 1rem; margin: 2rem;';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let client = document.createElement('h5');
    client.innerText = this.client;
    client.className = 'card-client';

    let estat = document.createElement('div');
    estat.innerText = 'Estat: '+this.estat;
    estat.className = 'card-estat';

    cardBody.appendChild(client);
    cardBody.appendChild(estat);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
  }
}

function mostrarLogin() {//Funcio
  let cardLog = document.createElement('div');
  cardLog.className = 'card shadow cursor-pointer';
  cardLog.style = 'width: 25rem; height: 10rem; padding: 1rem; margin: 2rem;';

  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  let usuari = document.createElement('input');
  usuari.type = 'text';
  usuari.id = 'user';
  usuari.className = 'fadeIn second';
  usuari.placeholder = 'user';

  let contrasenya = document.createElement('input');
  contrasenya.type = 'password';
  contrasenya.id = 'password';
  contrasenya.className = 'fadeIn second';
  contrasenya.placeholder = 'password';

  let loginBoto = document.createElement('button');
  loginBoto.id = 'login';
  loginBoto.className="btn btn-primary";
  loginBoto.textContent="Login";
  loginBoto.style = 'margin: 1rem;';


  cardBody.appendChild(usuari);
  cardBody.appendChild(contrasenya);
  
  cardBody.appendChild(loginBoto);
  cardLog.appendChild(cardBody);
  cardContainer.appendChild(cardLog);
} 

function login(){
  let checkUsuari = document.getElementById("user").value;
  let checkContrasenya = document.getElementById("password").value;
  
  let nouUsuari = new Usuari(checkUsuari,checkContrasenya);//Objecte
  console.log(nouUsuari)//Template literal
  console.log(usuaris)
  let existeix = false;

  usuaris.forEach(u => {
    if (u.nom == nouUsuari.nom) {
      existeix = true;//Objecte predefinit Boolean
      
    }
  });

  if(existeix){
    //
    console.log('wtf')
    setCookie("username", nouUsuari.nom, 1);
    location.reload();
  }else{
    alert('Usuari o contrasenya incorrectes');
  }
}

let llistarLogin = () => {//Funcio fletxa
  if (cardContainer) {
    document.getElementById('card-container').replaceWith(cardContainer);
    return;
}
cardContainer = document.getElementById('card-container');
mostrarLogin();//Declaracio de funcio
};

document.addEventListener("DOMContentLoaded", function () {

  "use strict";//Strict

  let userCookie=getCookie("username");
  console.log(userCookie);
  
    const myRequest = new Request('cites.json');//json

  fetch(myRequest)//fetch
   .then(response => response.json())
   .then(cites => {

    let citesClient = [];
      //
    let llistaCites = () => {
        if (cardContainer) {
            document.getElementById('card-container').replaceWith(cardContainer);
            return;
        }
    
        cardContainer = document.getElementById('card-container');
        cites.forEach((cita) => {
            if (cita.client == userCookie)
              citesClient.push(new Cita(cita.client, cita.estat, cita.treballador, cita.data, cita.tempsEstimat, cita.tempsReal)); 
              cita.dibuixar;
            
        });

        for (let c of citesClient) {
          c.dibuixar();
        }
        

        let botoNou = document.createElement("button");
        botoNou.className="btn btn-primary";
        botoNou.textContent="Nova cita(No funciona)";
        

        let contenidorBoto = document.getElementById("boto1");
        contenidorBoto.appendChild(botoNou);
    };
    
    
    
    if (userCookie != "") {
      llistaCites();
    }else{
      
      //llistaCites();
    llistarLogin();
    let button = document.querySelector('#login');//Selector
    button.addEventListener('click', login);
    }

  });
});

