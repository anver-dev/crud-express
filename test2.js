const express = require('express')
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.text());

app.all('/micuenta/:unnumero/:otronumero', (req, res) => {
    console.log(req.params);
    console.log(req.params.unnumero);
    console.log(req.query);
    console.log(req.headers);
    console.log(req.get('dfdf'));
    console.log(req.body);
    //res.status(401).send("ERROR, hubo un error"); 
    res.send("tu cuenta es ");
})

app.listen(port, ()=>{
    console.log(`escuchando en el puerto ${(port)}`);
})