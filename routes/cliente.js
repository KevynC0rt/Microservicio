var express = require('express');
var router = express.Router();

var request= require('request');
 
var mensaje="";
/* GET users listing. */

router.get('/',function (req, res, next ) {
  request.get("http://localhost:4000/cliente",(error, response,body)=>{
    mensaje='';
    if(error){
        console.log(error);
        mensaje='Error:'+error;
    }
    console.log(JSON.parse(body));
    res.render('cliente/index',{
        mensaje:mensaje,
        title:'Listado de cliente',
        data: JSON.parse(body)
    });

  });
});

router.get('/add',(req,res)=>{
    mensaje='Agregando Cliente';
    res.render('cliente/add',{
        mensaje:mensaje,
        title:'Agregar un Cliente',
        IDcliente:'',
        Nombre:'',
        Apellidos:'',
        Edad:'',
        telefono:'',
        direccion:''

    });
});

router.post('/add',function(req,res,next){
    //Extraelosdatosenviadosporlaforma
    let IDcliente=req.body.IDcliente;
    let Nombre =req.body.Nombre;
    let Apellidos=req.body.Apellidos;
    let Edad=req.body.Edad;
    let telefono=req.body.telefono;
    let direccion=req.body.direccion

    let errors=false;
    //Sinohayerrores
    if(!errors){
        //Encapsuladatosdelaforma
        var datosForma={
            IDcliente:IDcliente,
            Nombre:Nombre,
            Apellidos:Apellidos,
            Edad:Edad,
            telefono:telefono,
            direccion:direccion
        }//InvocaalMicroservicio
        request.post({url:"http://localhost:4000/cliente",json:datosForma},
        (error,response,body)=>{mensaje='Eldatosehaagregadoconéxito';
        if(error){
            console.log(error);
            mensaje='Error:'+error;
        }
        console.log(response);
        res.redirect('/cliente');
        //RedirigeaListadodeEstudiantes
    });
}
});

//DespliegapantallaparaModificarEstudiante
router.get('/update/:IDcliente',(req,res)=>{
    IDcliente= req.params.IDcliente;
    mensaje='Modificando Cliente con ID de la federacion '+ IDcliente;
    console.log(mensaje);
    var ClienteFind;
    //Buscasiexisteelestudiantedeacuerdoalnúmerodecontrol
    URI="http://localhost:4000/cliente/"+IDcliente;

    console.log('URI:'+ URI);

    request.get(URI,(error,response,body)=>{

        mensaje='';

        if(error){
            //Encasodequesurjaunerror
            console.log(error);
            mensaje='Error:'+error;
        }
        console.log("Cliente Encontrado ===>");
        console.log(body);
        //DespliegapantallaparamodificardeEstudiante
        res.render('cliente/update',{
            mensaje:mensaje,
            title:'Modificando Cliente',
            NumeroControl: JSON.parse(body).NumeroControl,
            Nombre: JSON.parse(body).Nombre,
            Apellidos: JSON.parse(body).Apellidos,
            Edad: JSON.parse(body).Edad,
            telefono:JSON.parse(body).telefono,
            direccion:JSON.parse(body).direccion
        });
    });
});
router.post('/update',function(req,res,next){ 
console.log('Modificando un Cliente');
//Extraelosdatosenviadosporlaforma
let IDcliente=req.body.IDcliente;
let Nombre=req.body.Nombre;
let Apellidos=req.body.Apellidos;
let Edad=req.body.Edad;
let telefono=req.body.telefono;
let direccion=req.body.direccion;
let errors=false;//Sinohayerrores
if(!errors){//Encapsuladatosprovenientesdelaforma
    var datosForma= { 
        IDcliente:IDcliente,
        Nombre:Nombre,
        Apellidos:Apellidos,
        Edad:Edad,
        telefono:telefono,
        direccion:direccion
    }//InvocaalMicroserviciodemodificar
    request.put({url:"http://localhost:4000/cliente",json: datosForma },
    (error,response,body)=>{
        mensaje='El dato  se ha modificado con éxito';
        if(error){
            console.log(error);
            mensaje='Error:'+error;
            
        }
        console.log(response);
        res.redirect('/cliente');
        //RedirigeaListadodeEstudiantes
    });
}

});
router.get('/delete/:IDcliente',(req,res)=>
{IDcliente=req.params.IDcliente;
    mensaje='Eliminando cliente'+IDcliente;
    console.log(mensaje)
    ;if(IDcliente){//InvocaalMicroservicio
        URI="http://localhost:4000/cliente/"+IDcliente;
        request.delete(URI,(error,response,body)=>{
            mensaje='Eldatosehaeliminadoconéxito';
            if(error){console.log(error);
                mensaje='Error:'+error;
}
console.log(response);
res.redirect('/cliente');
});
}});


module.exports = router;


