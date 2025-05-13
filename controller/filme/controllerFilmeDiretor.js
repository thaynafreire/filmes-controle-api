/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Diretor
 * Data: 13/05
 * Autor: thayná
 * Versão: 1.0
 **********************************************************************************/

const message = require('../../modulo/config.js');
const filmeDiretorDAO = require('../../model/DAO/filme_diretor.js');
const diretorDAO = require('../../model/DAO/diretor.js');

// Função para inserir um novo diretor e suas relações com filmes
const inserirFilmeDiretor = async function(filmeDiretor, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if(filmeDiretor.id_filme == '' || filmeDiretor.id_filme == undefined || filmeDiretor.id_filme == null || 
               isNaN(filmeDiretor.id_filme) || filmeDiretor.id_filme <= 0 ||
               filmeDiretor.id_diretor == '' || filmeDiretor.id_diretor == undefined || filmeDiretor.id_diretor == null || 
               isNaN(filmeDiretor.id_diretor) || filmeDiretor.id_diretor <= 0) {
                return message.ERROR_REQUIRED_FIELDS; //400
            } else {
                let result = await filmeDiretorDAO.insertFilmeDiretor(filmeDiretor);
                
                if(result) {
                    return message.SUCCESS_CREATED_ITEM; //201
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL; //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

// Função para atualizar uma relação filme-diretor
const atualizarFilmeDiretor = async function(id, filmeDiretor, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
               filmeDiretor.id_filme == '' || filmeDiretor.id_filme == undefined || filmeDiretor.id_filme == null || 
               isNaN(filmeDiretor.id_filme) || filmeDiretor.id_filme <= 0 ||
               filmeDiretor.id_diretor == '' || filmeDiretor.id_diretor == undefined || filmeDiretor.id_diretor == null || 
               isNaN(filmeDiretor.id_diretor) || filmeDiretor.id_diretor <= 0) {
                return message.ERROR_REQUIRED_FIELDS; //400
            } else {
                let resultFilmeDiretor = await filmeDiretorDAO.selectByIdFilmeDiretor(parseInt(id));
                
                if(resultFilmeDiretor != false && typeof(resultFilmeDiretor) == 'object' && resultFilmeDiretor.length > 0) {
                    filmeDiretor.id = parseInt(id);
                    let result = await filmeDiretorDAO.updateFilmeDiretor(filmeDiretor);
                    
                    if(result) {
                        return message.SUCCESS_UPDATED_ITEM; //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return message.ERROR_NOT_FOUND; //404
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

// Função para excluir uma relação filme-diretor
const excluirFilmeDiretor = async function(id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS; //400
        } else {
            let resultFilmeDiretor = await filmeDiretorDAO.selectByIdFilmeDiretor(parseInt(id));
            
            if(resultFilmeDiretor != false && typeof(resultFilmeDiretor) == 'object') {
                if(resultFilmeDiretor.length > 0) {
                    let result = await filmeDiretorDAO.deleteFilmeDiretor(parseInt(id));
                    
                    if(result) {
                        return message.SUCCESS_DELETED_ITEM; //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return message.ERROR_NOT_FOUND; //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

// Função para listar todas as relações filme-diretor
const listarFilmeDiretor = async function() {
    try {
        let dadosFilmeDiretor = {};
        let result = await filmeDiretorDAO.selectAllFilmeDiretor();
        
        if(result != false && typeof(result) == 'object') {
            if(result.length > 0) {
                dadosFilmeDiretor.status = true;
                dadosFilmeDiretor.status_code = 200;
                dadosFilmeDiretor.items = result.length;
                dadosFilmeDiretor.relations = result;
                
                return dadosFilmeDiretor;
            } else {
                return message.ERROR_NOT_FOUND; //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL; //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

// Função para buscar uma relação filme-diretor específica
const buscarFilmeDiretor = async function(id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS; //400
        } else {
            let dadosFilmeDiretor = {};
            let result = await filmeDiretorDAO.selectByIdFilmeDiretor(parseInt(id));
            
            if(result != false && typeof(result) == 'object') {
                if(result.length > 0) {
                    dadosFilmeDiretor.status = true;
                    dadosFilmeDiretor.status_code = 200;
                    dadosFilmeDiretor.relation = result;
                    
                    return dadosFilmeDiretor;
                } else {
                    return message.ERROR_NOT_FOUND; //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

// Função para buscar diretores por filme
const buscarDiretorPorFilme = async function(idFilme) {
    try {
        if(idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <= 0) {
            return message.ERROR_REQUIRED_FIELDS; //400
        } else {
            let dadosDiretores = {};
            let result = await filmeDiretorDAO.selectDiretorByIdFilme(parseInt(idFilme));
            
            if(result != false && typeof(result) == 'object') {
                if(result.length > 0) {
                    dadosDiretores.status = true;
                    dadosDiretores.status_code = 200;
                    dadosDiretores.diretores = result;
                    
                    return dadosDiretores;
                } else {
                    return message.ERROR_NOT_FOUND; //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

// Função para buscar filmes por diretor
const buscarFilmePorDiretor = async function(idDiretor) {
    try {
        if(idDiretor == '' || idDiretor == undefined || idDiretor == null || isNaN(idDiretor) || idDiretor <= 0) {
            return message.ERROR_REQUIRED_FIELDS; //400
        } else {
            let dadosFilmes = {};
            let result = await filmeDiretorDAO.selectFilmeByIdDiretor(parseInt(idDiretor));
            
            if(result != false && typeof(result) == 'object') {
                if(result.length > 0) {
                    dadosFilmes.status = true;
                    dadosFilmes.status_code = 200;
                    dadosFilmes.filmes = result;
                    
                    return dadosFilmes;
                } else {
                    return message.ERROR_NOT_FOUND; //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

module.exports = {
    inserirFilmeDiretor,
    atualizarFilmeDiretor,
    excluirFilmeDiretor,
    listarFilmeDiretor,
    buscarFilmeDiretor,
    buscarDiretorPorFilme,
    buscarFilmePorDiretor
};