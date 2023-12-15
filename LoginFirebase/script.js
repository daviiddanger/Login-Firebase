const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

//Inicialzar Firebase
firebase.initializeApp(firebaseConfig);
//Inicializar variables
const auth = firebase.auth();
const database = firebase.database();

//Configurar nuestra funcion de registro

function register(){
    full_name = document.getElementById('full_name').value
    email = document.getElementById('emailR').value
    password = document.getElementById('passwordR').value
    //Continuar con la autenticacion
    auth.createUserWithEmailAndPassword(email,password)
    .then(function(){
        //Declarar variable de usuario
        var user = auth.currentUser

        //agregar este usuario a la BD de Firebase
        var database_ref = database.ref()

        //Crear datos de Usuario
        var user_data ={
            email: email,
            full_name : full_name,
        }
        //Enviar  a la BD de Firebase
        database_ref.child('users/' + user.uid).set(user_data)

        //Ok
        Swal.fire({
            title: "Registro Exitoso",
            text: "Bienvenido al club :v",
            icon: "success"
          });
    })
    //control de errores
    .catch(function(error){
        alert(error)
    })

    
}


//programar el boton de registrar y despues el login
window.onload = function(){
    var registerButton = document.getElementById('registerButton');
    if(registerButton){
        registerButton.addEventListener('click',function(event){
            register();
        })
    }

    var loginButton = document.getElementById('loginButton');
    if(loginButton){
        loginButton.addEventListener('click',function(event){
            login();
        })
    }
}



//Configurar nuestra funcion de inicio de session

function login(){
    //Obtener los campos de entrada
    email = document.getElementById('email').value 
    password = document.getElementById('password').value 
    auth.signInWithEmailAndPassword(email,password)
    .then(function(){
        //Declarar variable de usuario
        var user = auth.currentUser

        //Referencia a los datos de usuario en FireBase
        var userRef = database.ref('users/' + user.uid);
        //Obtener los datos del usuario
        userRef.once('value').then(function(snapshot){
            var userData = snapshot.val();

            //Comprobar si existe
            if(userData && userData.full_name){
                //los datos del usuario existen
                Swal.fire({
                    title: "Inicio de session Exitoso",
                    text: "Bienvenido : "+ userData.full_name,
                    icon: "success"
                  });
            }else{
                alert('no hay datos o algun dato es incorrecto etc')
            }
        });  
    })
    //excepciones
    .catch(function(error){
        alert(error)
    })
}



function toggleForms(){
    var loginForm = document.getElementById("loginForm");
    var registerForm = document.getElementById("registerForm");


    if(loginForm.classList.contains("hidden")){
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
    }else{
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
    }
}