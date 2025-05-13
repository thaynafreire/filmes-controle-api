/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de diretor
 * data: 22/04/2025
 * autor: thayná
 * versao: 1.0 
 ***************************************************************************************/


const message = require('../../modulo/config.js')

const diretorDAO = require('../../model/DAO/diretor.js')

const filmeDiretorDAO = require('../../model/DAO/filme_diretor.js');

//funcao para tratar a insercao de um diretor no DAO
/*const inserirDiretor = async function(diretor, contentType){

    try {

        if (String(contentType).toLowerCase() == 'application/json'){

            if(diretor.nome == '' || diretor.nome == undefined || diretor.nome == null || diretor.nome.length > 45 ||
               diretor.sobre == undefined || diretor.sobre.length > 100
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultDiretor = await diretorDAO.insertDiretor(diretor)

                if(resultDiretor)
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
}*/

const inserirDiretor = async function(diretor, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (diretor.nome == '' || diretor.nome == undefined || diretor.nome == null || diretor.nome.length > 45 ||
                diretor.sobre == undefined || diretor.sobre.length > 100) {
                return message.ERROR_REQUIRED_FIELDS; //400
            } else {
                // Insere o diretor no banco de dados
                let resultInsert = await diretorDAO.insertDiretor(diretor);
                
                if (resultInsert) {
                    // Se houver filmes para associar
                    if (diretor.filmes && Array.isArray(diretor.filmes)) {
                        // Busca o último ID inserido
                        let lastId = await diretorDAO.selectLastInsertId();
                        
                        if(lastId) {
                            let idDiretor = lastId[0].id;
                            
                            // Para cada filme no array, cria a relação
                            for (let filme of diretor.filmes) {
                                if (filme.id && !isNaN(filme.id)) {
                                    let filmeDiretor = {
                                        id_filme: filme.id,
                                        id_diretor: idDiretor
                                    };
                                    await filmeDiretorDAO.insertFilmeDiretor(filmeDiretor);
                                }
                            }
                        }
                    }
                    return message.SUCCESS_CREATED_ITEM; //201
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL; //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}


//funcao para tratar a atualizacao de um diretor no DAO
const atualizarDiretor = async function(id, diretor, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
               diretor.nome == '' || diretor.nome == undefined || diretor.nome == null || diretor.nome.length > 45 ||
               diretor.sobre == undefined || diretor.sobre.length > 100)
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultDiretor = await diretorDAO.selectByIdDiretor(parseInt(id))

                if(resultDiretor != false || typeof(resultDiretor) == 'object'){

                    if(resultDiretor.length > 0){

                        diretor.id = parseInt(id)
                        let result = await diretorDAO.updateDiretor(diretor)

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


//funcao para tratar a exclusao de um filme no DAO
const excluirDiretor = async function(id){

    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let resultDiretor = await diretorDAO.selectByIdDiretor(parseInt(id))

            if(resultDiretor != false || typeof(resultDiretor) == 'object'){

                if(resultDiretor.length > 0){

                    let result = await diretorDAO.deleteDiretor(parseInt(id))

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

//funcao para tratar o retorno de uma lista de filmes do DAO
/*const listarDiretor = async function(){

    try{
        let dadosDiretor = {}

        let resultDiretor = await diretorDAO.selectAllDiretor()

        if(resultDiretor != false || typeof(resultDiretor) == 'object'){

            if(resultDiretor.length > 0){

                dadosDiretor.status = true
                dadosDiretor.status_code = 200
                dadosDiretor.itens = resultDiretor.length
                dadosDiretor.diretores = resultDiretor

                return dadosDiretor
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}*/

const listarDiretor = async function() {
    try {
        let dadosDiretor = {};
        let resultDiretor = await diretorDAO.selectAllDiretor();

        if(resultDiretor != false && typeof(resultDiretor) == 'object') {
            if(resultDiretor.length > 0) {
                // Para cada diretor, buscar seus filmes
                for (let diretor of resultDiretor) {
                    let filmesDoDiretor = await filmeDiretorDAO.selectFilmeByIdDiretor(diretor.id);
                    diretor.filmes = filmesDoDiretor || [];
                }

                dadosDiretor.status = true;
                dadosDiretor.status_code = 200;
                dadosDiretor.itens = resultDiretor.length;
                dadosDiretor.diretores = resultDiretor;

                return dadosDiretor;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        } 
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

//funcao para tratar o retorno de um filme filtrado pelo id do DAO
const buscarDiretor = async function(id){

    try {
        if (id == '' || id == undefined || id == null|| isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        }else{

            let dadosDiretor = {}

            let resultDiretor = await diretorDAO.selectByIdDiretor(parseInt(id))

            if(resultDiretor != false || typeof(resultDiretor) == 'object'){

                if(resultDiretor.length > 0){

                    dadosDiretor.status = true
                    dadosDiretor.status_code = 200
                    dadosDiretor.diretor = resultDiretor

                    return dadosDiretor //200
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
    inserirDiretor,
    atualizarDiretor,
    excluirDiretor,
    listarDiretor,
    buscarDiretor
}