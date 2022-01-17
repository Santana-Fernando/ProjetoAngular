const connection = require('../config/connection')

async function listarUsuariosService() {
    let sql = 'select * from usuario'
    let Usuarios = await executeQuery(sql, false)

    return Usuarios;

}

async function listarUsuariosPorIdService(id) {
    let sql = 'select * from usuario where id = ' + id
    let usuario = await executeQuery(sql, false)

    return usuario;

}

async function novoUsuarioService(data) {
    let { nome_completo, nome_usuario, email, senha, cep, logradouro, complemento, numero, uf, cidade, bairro } = data
    let sql = `insert into usuario (nome_completo, nome_usuario, email, senha, cep, logradouro, complemento, numero, uf, cidade, bairro) 
    values ('${nome_completo}', '${nome_usuario}', '${email}', '${senha}', '${cep}', '${logradouro}', '${complemento}', '${numero}', '${uf}', '${cidade}', '${bairro}')`
    
    let novosUsuarios = await executeQuery(sql, true)
    console.log("\nmostrando\n")
    console.log(novosUsuarios)
    if(novosUsuarios.status == '200') {
        return novosUsuarios.message
    }
}

async function atualizandoUsuarioService(data, id) {
    let { nome_completo, nome_usuario, email, senha, cep, logradouro, complemento, numero, uf, cidade, bairro } = data
    let sql = `update usuario set 
    nome_completo = '${nome_completo}',
    nome_usuario = '${nome_usuario}',
    email = '${email}',
    senha = '${senha}',
    cep = '${cep}',
    logradouro = '${logradouro}',
    complemento = '${complemento}',
    numero = '${numero}',
    uf = '${uf}',
    cidade = '${cidade}',
    bairro = '${bairro}'
    where id = '${id}'`

    let usuarioAtualizado = await executeQuery(sql, true)

    if(usuarioAtualizado.status == '200') {
        return "Usuario atualizado com sucesso"
    }
}

async function removerUsuarioService(id) {
    let sql = `delete from usuario where id = ${id}`

    let usuarioRemovido = await executeQuery(sql, true)

    if(usuarioRemovido.status == '200') {
        return "Usuario removido com sucesso"
    }
}

let executeQuery = function (sql, isInsert) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, (err, result) => {
            if (!err) {

                isInsert == true ? resolve({status: '200', message: 'Usuario salvo com sucesso'}) : resolve(result)
            } else {
                resolve({
                    status: "error",
                    message: "Error Getting Data",
                    debug: err
                });
            }
        });
    });
};

module.exports = {
    listarUsuariosService,
    listarUsuariosPorIdService,
    novoUsuarioService,
    atualizandoUsuarioService,
    removerUsuarioService 
}