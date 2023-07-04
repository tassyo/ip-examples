const express = require('express')
const {getGeolocationByIp} = require("./utils/GetLocalization");
const {getIP} = require("./utils/GetIp");
const moment = require("moment");
const app = express()
const port = 3000

app.get('/example/1', async (req, res) => {
    //se for frotend, podemos usar o windows.navigation;
    // const {userAgent} = window.navigation;
    //se for backend recupera do header da request;
    const  userAgent  = req.headers['user-agent'];
    const ipRequest = await getIP();
    const location = await  getGeolocationByIp(ipRequest);
    //se for no frotend podemos usar esse carinha
    //await getLocation()
    res.send({latitude:location.ll[0],longitude:location.ll[1],userAgent})
})

app.get('/example/2', async (req, res) => {

    //informações da pessoa logada;
    const person = {
        name:'Nome completo',
        mail:'nome.completo@mail.com',
        signature: {
            url:'url-onde-esta-assinatura-da-pessoa.png',
            ip: await getIP()
        }
    }

    const document = {
        createdAt: new Date('2023-01-01T10:00:00'),//Data de criação que backend retorna, seria data que foi criado no S3 da aws
        viewedDate: new Date('2023-01-01T10:30:00') //Manipulamos essa informação pelo front, ao abrir o arquivo pegamos o new Date no onClick
    }

    const signValues = {
        document:document,
        signedDocument: {
            location: await getGeolocationByIp(await getIP()),//nesse caso é o ip de onde foi feito a request;
            name: person.name,
            email: person.email,
            ip: await getIP(),
            sentDate: moment(document.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            viewedDate: moment(document.viewedDate).format('YYYY-MM-DD HH:mm:ss'),
            signedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            signatureIp: person.signature.ip,
        },
    };

    res.send(signValues)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})