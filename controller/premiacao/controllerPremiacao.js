/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de premiacao
 * data: 22/04/2025
 * autor: thayná
 * versao: 1.0 
 ***************************************************************************************/


const message = require('../../modulo/config.js')

const premiacaoDAO = require('../../model/DAO/premiacao.js')


//funcao para tratar a insercao de uma premiacao no DAO
const inserirPremiacao = async function(premiacao, contentType){

    try {

        if (String(contentType).toLowerCase() == 'application/json'){

            if(premiacao.nome == '' || premiacao.nome == undefined || premiacao.nome == null || premiacao.nome.length > 45 ||
               premiacao.sobre == undefined || premiacao.sobre.length > 100
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultPremiacao = await premiacaoDAO.insertPremiacao(premiacao)

                if(resultPremiacao)
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


//funcao para tratar a atualizacao de uma premiacao no DAO
const atualizarPremiacao = async function(id, premiacao, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
               premiacao.nome == '' || premiacao.nome == undefined || premiacao.nome == null || premiacao.nome.length > 45 ||
               premiacao.sobre == undefined || premiacao.sobre.length > 100
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))

                if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){

                    if(resultPremiacao.length > 0){

                        premiacao.id = parseInt(id)
                        let result = await premiacaoDAO.updatePremiacao(premiacao)
                        if (result)
                            return message.SUCCESS_UPDATED_ITEM //200
                        else
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
        
                    }else{
                        return message.ERROR_NOT_FOUND
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


//funcao para tratar a exclusao de uma premiacao no DAO
const excluirPremiacao = async function(id){

    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))

            if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){

                if(resultPremiacao.length > 0){

                    let result = await premiacaoDAO.deletePremiacao(parseInt(id))

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


//funcao para tratar o retorno de uma lista de filmes no DAO
const listarPremiacao = async function(){

    try{

        let dadosPremiacao = {}

        let resultPremiacao = await premiacaoDAO.selectAllPremiacao()

        if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){

            if(resultPremiacao.length > 0){

                dadosPremiacao.status = true
                dadosPremiacao.status_code = 200
                dadosPremiacao.itens = resultPremiacao.length
                dadosPremiacao.premiacoes = resultPremiacao

                return dadosPremiacao
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

//funcao para tratar o retorno de uma premiacao filtrada pelo id do DAO
const buscarPremiacao = async function(id){

    try {
        if (id == '' || id == undefined || id == null|| isNaN(id) || id<=0) {
            return message.ERROR_REQUIRED_FIELDS
        }else{

            let dadosPremiacao = {}

            let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))

            if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
                if(resultPremiacao.length > 0){

                    dadosPremiacao.status = true
                    dadosPremiacao.status_code = 200
                    dadosPremiacao.premiacao = resultPremiacao

                    return dadosPremiacao //200
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
    inserirPremiacao,
    atualizarPremiacao,
    excluirPremiacao,
    listarPremiacao,
    buscarPremiacao
}