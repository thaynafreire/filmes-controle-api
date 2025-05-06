/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de genero
 * data: 11/02/2025
 * autor: thayná
 * versao: 1.0 
 ***************************************************************************************/


const message = require('../../modulo/config.js')

const generoDAO = require('../../model/DAO/genero.js')

//funcao para tratar a insercao de um genero no DAO
const inserirGenero = async function(genero, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            if(genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 45 ||
               genero.descricao == '' || genero.descricao == undefined || genero.descricao == null || genero.descricao.length > 100
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultGenero = await generoDAO.insertGenero(genero)

                    if(resultGenero)
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


//funcao para tratar a atualizacao de um genero no DAO
const atualizarGenero = async function(id, genero, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
               genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 45 ||
               genero.descricao == '' || genero.descricao == undefined || genero.descricao == null || genero.descricao.length > 100
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

                if(resultGenero != false || typeof(resultGenero) == 'object'){

                    if(resultGenero.length > 0){

                        genero.id = parseInt(id)
                        let result = await generoDAO.updateGenero(genero)

                        if (result)
                            return message.SUCCESS_UPDATED_ITEM //200
                        else
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        
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

//funcao para tratar a exclusao de um genero no DAO
const excluirGenero = async function(id){

    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

            if(resultGenero != false || typeof(resultGenero) == 'object'){

                if(resultGenero.length > 0){

                    let result = await generoDAO.deleteGenero(parseInt(id))

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

//funcao para tratar o retorno de uma lista de generos no DAO
const listarGenero = async function(){

    try{
        let dadosGenero = {}

        let resultGenero = await generoDAO.selectAllGenero()

        if(resultGenero != false || typeof(resultGenero) == 'object'){

            if(resultGenero.length > 0){

                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.itens = resultGenero.length
                dadosGenero.generos = resultGenero

                return dadosGenero
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

//funcao para tratar o retorno de um filme filtrado pelo id do DAO
const buscarGenero = async function(id){

    try {
        if (id == '' || id == undefined || id == null|| isNaN(id) || id<=0) {
            return message.ERROR_REQUIRED_FIELDS
        }else{

            dadosGenero={}

            let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

            if(resultGenero != false || typeof(resultGenero) == 'object'){

                if(resultGenero.length > 0){

                    dadosGenero.status = true
                    dadosGenero.status_code = 200
                    dadosGenero.generos = resultGenero

                    return dadosGenero //200
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
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
}