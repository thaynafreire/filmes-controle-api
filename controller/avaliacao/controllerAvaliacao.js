const message = require('../../modulo/config.js')
const avaliacaoDAO = require('../../model/DAO/avaliacao.js')
const controllerFilme = require('../filme/controllerFilme.js')
const controllerUsuario = require('../usuario/controllerUsuario.js')

const inserirAvaliacao = async function(avaliacao, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if(avaliacao.nota == '' || avaliacao.nota == undefined || avaliacao.nota == null || avaliacao.nota.length > 5 ||
               avaliacao.comentario == undefined || avaliacao.comentario.length > 150 ||
               avaliacao.id_filme == '' || avaliacao.id_filme == undefined || avaliacao.id_filme == null || isNaN(avaliacao.id_filme) ||
               avaliacao.id_usuario == '' || avaliacao.id_usuario == undefined || avaliacao.id_usuario == null || isNaN(avaliacao.id_usuario)) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultAvaliacao = await avaliacaoDAO.insertAvaliacao(avaliacao)
                
                if(resultAvaliacao)
                    return message.SUCCESS_CREATED_ITEM
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarAvaliacao = async function(id, avaliacao, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
               avaliacao.nota == '' || avaliacao.nota == undefined || avaliacao.nota == null || avaliacao.nota.length > 5 ||
               avaliacao.comentario == undefined || avaliacao.comentario.length > 150 ||
               avaliacao.id_filme == '' || avaliacao.id_filme == undefined || avaliacao.id_filme == null || isNaN(avaliacao.id_filme) ||
               avaliacao.id_usuario == '' || avaliacao.id_usuario == undefined || avaliacao.id_usuario == null || isNaN(avaliacao.id_usuario)) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))
                
                if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object') {
                    if(resultAvaliacao.length > 0) {
                        avaliacao.id = parseInt(id)
                        let result = await avaliacaoDAO.updateAvaliacao(avaliacao)
                        
                        if(result)
                            return message.SUCCESS_UPDATED_ITEM
                        else
                            return message.ERROR_INTERNAL_SERVER_MODEL
                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirAvaliacao = async function(id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))
            
            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object') {
                if(resultAvaliacao.length > 0) {
                    let result = await avaliacaoDAO.deleteAvaliacao(parseInt(id))
                    
                    if(result)
                        return message.SUCCESS_DELETED_ITEM
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarAvaliacao = async function() {
    try {
        let arrayAvaliacoes = []
        let dadosAvaliacao = {}
        
        let resultAvaliacao = await avaliacaoDAO.selectAllAvaliacao()
        
        if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object') {
            if(resultAvaliacao.length > 0) {
                dadosAvaliacao.status = true
                dadosAvaliacao.status_code = 200
                dadosAvaliacao.items = resultAvaliacao.length
                
                for(const itemAvaliacao of resultAvaliacao) {
                    let dadosFilme = await controllerFilme.buscarFilme(itemAvaliacao.id_filme)
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemAvaliacao.id_usuario)
                    
                    itemAvaliacao.filme = dadosFilme.films[0]
                    itemAvaliacao.usuario = dadosUsuario.usuario
                    
                    delete itemAvaliacao.id_filme
                    delete itemAvaliacao.id_usuario
                    
                    arrayAvaliacoes.push(itemAvaliacao)
                }
                
                dadosAvaliacao.avaliacoes = arrayAvaliacoes
                
                return dadosAvaliacao
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarAvaliacao = async function(id) {
    try {
        let arrayAvaliacoes = []
        
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            dadosAvaliacao = {}
            
            let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))
            
            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object') {
                if(resultAvaliacao.length > 0) {
                    dadosAvaliacao.status = true
                    dadosAvaliacao.status_code = 200
                    
                    for(const itemAvaliacao of resultAvaliacao) {
                        let dadosFilme = await controllerFilme.buscarFilme(itemAvaliacao.id_filme)
                        let dadosUsuario = await controllerUsuario.buscarUsuario(itemAvaliacao.id_usuario)
                        
                        itemAvaliacao.filme = dadosFilme.films[0]
                        itemAvaliacao.usuario = dadosUsuario.usuario
                        
                        delete itemAvaliacao.id_filme
                        delete itemAvaliacao.id_usuario
                        
                        arrayAvaliacoes.push(itemAvaliacao)
                    }
                    
                    dadosAvaliacao.avaliacoes = arrayAvaliacoes
                    
                    return dadosAvaliacao
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirAvaliacao,
    atualizarAvaliacao,
    excluirAvaliacao,
    listarAvaliacao,
    buscarAvaliacao
}