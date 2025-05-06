/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD do usuario
 * data: 19/04/2025
 * autora: Thayná
 * versao: 1.0 
 ***************************************************************************************/

const message = require('../../modulo/config.js')

const usuarioDAO = require('../../model/DAO/usuario.js')


//funcao para tratar a insercao de um usuario no DAO
const inserirUsuario = async function(usuario, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            if(usuario.nome == '' || usuario.nome == undefined || usuario.nome == null || usuario.nome.length > 45 ||
               usuario.email == '' || usuario.email == undefined || usuario.email == null || usuario.email.length > 80 ||
               usuario.username == '' || usuario.username == undefined || usuario.username == null || usuario.username.length > 45 ||
               usuario.data_nascimento == '' || usuario.data_nascimento == undefined || usuario.data_nascimento == null ||
               usuario.senha == '' || usuario.senha == undefined || usuario.senha == null || usuario.senha.length > 45
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultUsuario = await usuarioDAO.insertUsuario(usuario)
        
                if(resultUsuario)
                    return message.SUCCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


//funcao para tratar a atualizacao de um usuario no DAO
const atualizarUsuario = async function(id, usuario, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
               usuario.nome == '' || usuario.nome == undefined || usuario.nome == null || usuario.nome.length > 45 ||
               usuario.email == '' || usuario.email == undefined || usuario.email == null || usuario.email.length > 80 ||
               usuario.username == '' || usuario.username == undefined || usuario.username == null || usuario.username.length > 45 ||
               usuario.data_nascimento == '' || usuario.data_nascimento == undefined || usuario.data_nascimento == null ||
               usuario.senha == '' || usuario.senha == undefined || usuario.senha == null || usuario.senha.length > 45
            ){

                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

                if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                    if(resultUsuario.length > 0){

                        usuario.id = parseInt(id)

                        let result = await usuarioDAO.updateUsuario(usuario)

                        if (result){
                            return message.SUCCESS_UPDATED_ITEM //200
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    }else{
                        return message.ERROR_NOT_FOUND //404
                    }
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//funcao para tratar a exclusao de um filme no DAO
const excluirUsuario = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){

                if(resultUsuario.length > 0){

                    let result = await usuarioDAO.deleteUsuario(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//funcao para tratar o retorno de uma lista de usuarios no DAO
const listarUsuario = async function(){

    try{
        let dadosUsuario = {}

        let resultUsuario = await usuarioDAO.selectAllUsuario()

        if(resultUsuario != false || typeof(resultUsuario) == 'object'){

            if(resultUsuario.length > 0){

                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.itens = resultUsuario.length
                dadosUsuario.usuarios = resultUsuario

                return dadosUsuario
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


//funcao para tratar o retorno de um filme filtrado pelo id no DAO
const buscarUsuario = async function(id){

    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        }else{

            let dadosUsuario = {}

            let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){

                if(resultUsuario.length > 0){

                    dadosUsuario.status = true
                    dadosUsuario.status_code = 200
                    dadosUsuario.usuario = resultUsuario

                    return dadosUsuario //200

                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}