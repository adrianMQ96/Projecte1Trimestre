export {usuaris, Usuari};

class Usuari{
    constructor( nom, contrasenya){
        this.nom = nom;
        this.contrasenya = contrasenya;
    }
}

let usuaris = [];//Array

document.addEventListener("DOMContentLoaded", function () {
let usuari1 = new Usuari('Adrian','1234');
let usuari2 = new Usuari('Alex','5678');

usuaris.push(usuari1);
usuaris.push(usuari2);


//comprobarUsuari(usuari1);
//console.log(usuaris);
});