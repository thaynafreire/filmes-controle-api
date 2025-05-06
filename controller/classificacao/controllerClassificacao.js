/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de classificacao
 * data: 19/04/2025
 * autor: thayná
 * versao: 1.0 
 ***************************************************************************************/


const message = require('../../modulo/config.js')

const classificacaoDAO = require('../../model/DAO/classificacao.js')


//funcao para tratar a insercao de uma classificacao no DAO
const inserirClassificacao = async function(classificacao, contentType){

    try {

        if (String(contentType).toLowerCase() == 'application/json')
            {
            if(classificacao.idade_indicativa == '' || classificacao.idade_indicativa == undefined || classificacao.idade_indicativa == null || classificacao.idade_indicativa.length > 2 ||
               classificacao.descricao == '' || classificacao.descricao == undefined || classificacao.descricao == null || classificacao.descricao.length > 100
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let result = await classificacaoDAO.insertClassificacao(classificacao)

                if(result)
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


const atualizarClassificacao = async function(id, classificacao, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json')
            {
            if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
               classificacao.idade_indicativa == '' || classificacao.idade_indicativa == undefined || classificacao.idade_indicativa == null || classificacao.idade_indicativa.length > 2 ||
               classificacao.descricao == '' || classificacao.descricao == undefined || classificacao.descricao == null || classificacao.descricao.length > 100
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(parseInt(id))

                if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){
                    if(resultClassificacao.length > 0){

                        classificacao.id = parseInt(id)

                        let result = await classificacaoDAO.updateClassificacao(classificacao)

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

const excluirClassificacao = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(parseInt(id))

            if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){

                if(resultClassificacao.length > 0){

                    let result = await classificacaoDAO.deleteClassificacao(parseInt(id))

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

const listarClassificacao = async function(){
    try{

        let dadosClassificacao = {}

        let resultClassificacao = await classificacaoDAO.selectAllClassificacao()

        if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){

            if(resultClassificacao.length > 0){

                dadosClassificacao.status = true
                dadosClassificacao.status_code = 200
                dadosClassificacao.itens = resultClassificacao.length
                dadosClassificacao.classificacoes = resultClassificacao

                return dadosClassificacao
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


const buscarClassificacao = async function(id){

    try {
        if (id == '' || id == undefined || id == null|| isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let dadosClassificacao = {}

            let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(parseInt(id))

            if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){
                if(resultClassificacao.length > 0){

                    dadosClassificacao.status = true
                    dadosClassificacao.status_code = 200
                    dadosClassificacao.classificacao = resultClassificacao

                    return dadosClassificacao //200
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
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao,
    listarClassificacao,
    buscarClassificacao
}