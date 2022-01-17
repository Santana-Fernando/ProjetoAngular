const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Fern@nd01331',
    database: 'db_basico'
})

connection.connect((err) => {
    if(err) {
        console.error("Erro ao conectar ao banco de dados " + err)
    } else {
        console.log("Conexão realizada com sucesso")
    }
})

module.exports = connection