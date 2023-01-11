import 'colors';
//console.log('Hola chepy'.bold.red);

import {
    createServer} from 'http';

/*const httpServer = createServer((req, res) => {
    console.log("peticion recibida")
    res.write("mensaje previo \n");
    res.end ("Hola desde nodejs a tu celular");
});
*/
const server = createServer(function (req, res){
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    
    let data ="";
    let chunkIndex=0;
    req.on("data", (chunk)=> {
        data = data + chunk;
        chunkIndex ++;
        console.log(chunkIndex);
    });
    req.on("end", () =>{
        res.end("adios");
    });
});

server.listen(3000, ()=>{
    console.log("escuchando peticiones en el puerto 3000")
});