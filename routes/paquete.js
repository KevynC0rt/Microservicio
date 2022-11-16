var express = require('express');
var router = express.Router();

var request= require('request');
 
var mensaje="";
/* GET users listing. */

router.get('/',function (req, res, next ) {
  request.get("http://localhost:4000/paquete",(error, response,body)=>{
    mensaje='';
    if(error){
        console.log(error);
        mensaje='Error:'+error;
    }
    console.log(JSON.parse(body));
    res.render('paquete/index',{
        mensaje:mensaje,
        title:'Listado de clientes con servicis',
        data: JSON.parse(body)
    });

  });
});


router.get('/add',(req,res)=>{
    mensaje='Agregando Servicio';
    res.render('paquete/add',{
        mensaje:mensaje,
        title:'Agregar un Cliente a un paquete',
        IDcliente:'',
        IDpaquete:'',
        Adeudo:'',
        Estatus:''
     

    });
});

router.post('/add',function(req,res,next){
    //Extraelosdatosenviadosporlaforma
    let IDcliente =req.body.IDcliente;
    let IDpaquete=req.body.IDpaquete;
    
    let Adeudo=req.body.Adeudo;
    let Estatus=req.body.Estatus;
 

    let errors=false;
    //Sinohayerrores
    if(!errors){
        //Encapsuladatosdelaforma
        var datosForma={
            IDcliente:IDcliente,
            IDpaquete:IDpaquete,
            
            Adeudo:Adeudo,
            Estatus:Estatus
        }//InvocaalMicroservicio
        request.post({url:"http://localhost:4000/paquete",json:datosForma},
        (error,response,body)=>{mensaje='Eldatosehaagregadoconéxito';
        if(error){
            console.log(error);
            mensaje='Error:'+error;
            
        }
        console.log(response);
        res.redirect('/paquete');
        //RedirigeaListadodeEstudiantes
    });

}
});

//DespliegapantallaparaModificarEstudiante
router.get('/update/:IDcliente',(req,res)=>{
    IDcliente= req.params.IDcliente;
    mensaje='Modificando registro con su ID'+ IDcliente;
    console.log(mensaje);
    var paqueteFind;
    //Buscasiexisteelestudiantedeacuerdoalnúmerodecontrol
    URI="http://localhost:4000/paquete/"+IDcliente;

    console.log('URI:'+ URI);

    request.get(URI,(error,response,body)=>{

        mensaje='';

        if(error){
            //Encasodequesurjaunerror
            console.log(error);
            mensaje='Error:'+error;
        }
        console.log("ClienteServicio Encontrado ===>");
        console.log(body);
        //DespliegapantallaparamodificardeEstudiante
        res.render('paquete/update',{
            mensaje:mensaje,
            title:'Modificando ClienteServicio',
            IDpaquete: JSON.parse(body).IDpaquete,
            Adeudo: JSON.parse(body).Adeudo,
            Estatus: JSON.parse(body).Estatus,
        });
    });
});
router.post('/update',function(req,res,next){ 
console.log('Modificando un ClienteServicio');
//Extraelosdatosenviadosporlaforma

let IDcliente=req.body.IDcliente;
let IDpaquete=req.body.IDpaquete;
let Adeudo=req.body.Adeudo;
let Estatus=req.body.Estatus;
let errors=false;//Sinohayerrores
if(!errors){//Encapsuladatosprovenientesdelaforma
    var datosForma= { 
        IDcliente:IDcliente,
        IDpaquete:IDpaquete,
        Adeudo:Adeudo,
        Estatus:Estatus,
    }//InvocaalMicroserviciodemodificar
    request.put({url:"http://localhost:4000/paquete",json: datosForma },
    (error,response,body)=>{
        mensaje='El dato  se ha modificado con éxito';
        if(error){
            console.log(error);
            mensaje='Error:'+error;
            
        }
        console.log(response);
        res.redirect('/paquete');
        //RedirigeaListadodeEstudiantes
    });
}

});
router.get('/delete/:IDcliente',(req,res)=>
{IDcliente=req.params.IDcliente;
    mensaje='Eliminando paquete'+IDcliente;
    console.log(mensaje)
    ;if(IDcliente){//InvocaalMicroservicio
        URI="http://localhost:4000/paquete/"+IDcliente;
        request.delete(URI,(error,response,body)=>{
            mensaje='Eldatosehaeliminadoconéxito';
            if(error){console.log(error);
                mensaje='Error:'+error;
}
console.log(response);
res.redirect('/paquete');
});
}});


module.exports = router;