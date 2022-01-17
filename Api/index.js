const express = require('express')
const port = (process.env.port || 3000)

const BodyParser = require('body-parser')
const cors = require("cors");

const app = express()

app.use(cors())

app.use(express.json())

app.set('port', port)

app.use(BodyParser.json());

app.use(BodyParser.urlencoded({ extended: false }));

app.use('/api', require('./routes'))

app.listen(app.get('port'), (error) => {
    if(error) {
        console.error("Erro ao iniciar api")
        console.error(error)
    } else {
        console.log("Inicialização feita com sucesso")
    }
})