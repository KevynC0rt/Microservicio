var express = require('express');
var router = express.Router();

var request= require('request');
 
var mensaje="";
/* GET users listing. */
 
router.get('/',function (req, res, next ) {
  request.get("http://localhost:4000/servicio",(error, response,body)=>{
    mensaje='';
    if(error){
        console.log(error);
        mensaje='Error:'+error+':(';
    }
    console.log(JSON.parse(body));
    res.render('servicio/index',{
        mensaje:mensaje,
        title:'Listado de servicio',
        data: JSON.parse(body)
    });

  });
});


router.get('/add',(req,res)=>{
    mensaje='Agregando servicio';
    res.render('servicio/add',{
        mensaje:mensaje,
        title:'Agregar un servicio',
        IDservicio:'',
        Nombre:'',
        Costo:'',
        Contenido:'',
     

    });
});

router.post('/add',function(req,res,next){
    //Extraelosdatosenviadosporlaforma
    let IDservicio=req.body.IDservicio;
    let Nombre =req.body.Nombre;
    let Costo=req.body.Costo;
    let Contenido=req.body.Contenido;
 

    let errors=false;
    //Sinohayerrores
    if(!errors){
        //Encapsuladatosdelaforma
        var datosForma={
            IDservicio:IDservicio,
            Nombre:Nombre,
            Costo:Costo,
            Contenido:Contenido
        }//InvocaalMicroservicio
        request.post({url:"http://localhost:4000/servicio",json:datosForma},
        (error,response,body)=>{mensaje='Eldatosehaagregadoconéxito';
        if(error){
            console.log(error);
            mensaje='Error:'+error;
        }
        console.log(response);
        res.redirect('/servicio');
        //RedirigeaListadodeEstudiantes
    });
}
});

//DespliegapantallaparaModificarEstudiante
router.get('/update/:IDservicio',(req,res)=>{
    IDservicio= req.params.IDservicio;
    mensaje='Modificando servicio con su ID'+ IDservicio;
    console.log(mensaje);
    var servicioFind;
    //Buscasiexisteelestudiantedeacuerdoalnúmerodecontrol
    URI="http://localhost:4000/servicio/"+IDservicio;

    console.log('URI:'+ URI);

    request.get(URI,(error,response,body)=>{

        mensaje='';

        if(error){
            //Encasodequesurjaunerror
            console.log(error);
            mensaje='Error:'+error;
        }
        console.log("servicio Encontrado ===>");
        console.log(body);
        //DespliegapantallaparamodificardeEstudiante
        res.render('servicio/update',{
            mensaje:mensaje,
            title:'Modificando cliente',
            Nombre: JSON.parse(body).Nombre,
            Costo: JSON.parse(body).Costo,
            Contenido: JSON.parse(body).Contenido,
        });
    });
});
router.post('/update',function(req,res,next){ 
console.log('Modificando un servicio');
//Extraelosdatosenviadosporlaforma
let IDservicio=req.body.IDservicio;
let Nombre=req.body.Nombre;
let Costo=req.body.Costo;
let Contenido=req.body.Contenido;
let errors=false;//Sinohayerrores
if(!errors){//Encapsuladatosprovenientesdelaforma
    var datosForma= { 
        IDservicio:IDservicio,
        Nombre:Nombre,
        Costo:Costo,
        Contenido:Contenido
    }//InvocaalMicroserviciodemodificar
    request.put({url:"http://localhost:4000/servicio",json: datosForma },
    (error,response,body)=>{
        mensaje='El dato  se ha modificado con éxito';
        if(error){
            console.log(error);
            mensaje='Error:'+error;
            
        }
        console.log(response);
        res.redirect('/servicio');
        //RedirigeaListadodeEstudiantes
    });
}

});
router.get('/delete/:IDservicio',(req,res)=>
{IDservicio=req.params.IDservicio;
    mensaje='Eliminando servicio'+IDservicio;
    console.log(mensaje)
    ;if(IDservicio){//InvocaalMicroservicio
        URI="http://localhost:4000/servicio/"+IDservicio;
        request.delete(URI,(error,response,body)=>{
            mensaje='Eldatosehaeliminadoconéxito';
            if(error){console.log(error);
                mensaje='Error:'+error;
}
console.log(response);
res.redirect('/servicio');
});
}});


module.exports = router;