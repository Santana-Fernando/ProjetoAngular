const Services = require('../Services/index')

const {
    listarUsuariosService,
    listarUsuariosPorIdService,
    novoUsuarioService,
    atualizandoUsuarioService,
    removerUsuarioService 
} = Services

async function listarUsuarios(req, res) {
    let Usuarios = await listarUsuariosService()
    res.json(Usuarios)
}

async function listarUsuariosPorId(req, res) {
    let { id } = req.params
    let Usuarios = await listarUsuariosPorIdService(id)
    res.json(Usuarios)
}

async function novoUsuario(req, res) {
    let novoUsuario = await novoUsuarioService(req.body)

    res.json({message: novoUsuario})
}

async function atualizandoUsuario(req, res) {
    let { id } = req.params

    let novoUsuario = await atualizandoUsuarioService(req.body, id)

    res.json({message: novoUsuario})
}

async function removerUsuario(req, res) {
    let { id } = req.params

    let novoUsuario = await removerUsuarioService(id)

    res.json({message: novoUsuario})
}

module.exports = {
    listarUsuarios,
    listarUsuariosPorId,
    novoUsuario,
    atualizandoUsuario,
    removerUsuario 
}