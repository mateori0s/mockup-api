const express = require ('express')

// Creo servidor Express

const app = express();

const  getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
  
app.use(express.json());

app.post ('/packs/pendingrenewpacks', (req, res)=>{

    const { cellularNumber , channel} = req.body
    const rResfull= getRandomInt(2)
    const rCode= getRandomInt(2)
    const rMessage = (rCode==0) ? "Operacion exitosa" : "ERROR";
    const rVigencia= getRandomInt(11)
    const rCapacidad= getRandomInt(11)
    const rPack = {
        "packId": "PR"+rCapacidad+"G"+rVigencia+"D",
        "status": "P",
        "description": ""+rCapacidad+"GB por "+rVigencia+" días"
    }
    const rHandle = getRandomInt(1042229807)

    let  response ={
        "responseCode": rCode,
        "responseMessage": rMessage,
        "cellularNumber": cellularNumber,
    }

    if (rCode){
        response =
        {
            "code": 20000+rCode,
            "description": "El tipo de negocio no es aplicable a pack renovables",
            "timestamp": "06-03-2024 12:16:34"
        }
    }

    const responsefull={
        ...response, handle: rHandle.toString(), pack: rPack    
      }
    
    res.status(200).json((rCode)?response:(rResfull)?responsefull:response);
})

app.listen(3000, ()=>{
    console.log ('Servidor corriendo en puerto 3000...')
});