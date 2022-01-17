const routes = require('express').Router()
const { Router } = require('express')
const controllers = require('../controller/index')

const { 
    listarUsuarios, 
    listarUsuariosPorId, 
    novoUsuario, 
    atualizandoUsuario, 
    removerUsuario 
} = controllers

routes.get('/', listarUsuarios)
routes.get('/:id', listarUsuariosPorId)
routes.post('/new', novoUsuario)
routes.put('/update/:id', atualizandoUsuario)
routes.delete('/remove/:id', removerUsuario)

module.exports = routes;