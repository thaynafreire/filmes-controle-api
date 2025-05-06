/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de idioma
 * data: 19/04/2025
 * autor: Thayná
 * versao: 1.0 
 ***************************************************************************************/


const message = require('../../modulo/config.js')


const idiomaDAO = require('../../model/DAO/idioma.js')

//funcao para tratar a inserção de um idioma no DAO
const inserirIdioma = async function (idioma, contentType) {

    try {

        if(String(contentType).toLowerCase() == 'application/json'){

            if(idioma.nome == ''                 ||idioma.nome ==undefined            ||idioma.nome==null              ||idioma.nome.length>45      ||
               idioma.sigla == ''                 ||idioma.sigla ==undefined            ||idioma.sigla==null              ||idioma.sigla.length>5      
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultIdioma = await idiomaDAO.insertIdioma(idioma)

                if(resultIdioma)
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


//funcao para tratar a insercao de um idioma no DAO
const atualizarIdioma = async function (id, idioma, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            if(id          == ''                || id         == undefined          || id        == null            || isNaN(id)                || id <= 0 ||
            idioma.nome == ''                 ||idioma.nome ==undefined            ||idioma.nome==null              ||idioma.nome.length>45      ||
            idioma.sigla == ''                 ||idioma.sigla ==undefined            ||idioma.sigla==null              ||idioma.sigla.length>5      
        )
        {
            return message.ERROR_REQUIRED_FIELDS //400

        }else{

            let resultIdioma = await idiomaDAO.selectByIdIdioma(parseInt(id))

            if(resultIdioma != false || typeof(resultIdioma) == 'object'){

                if(resultIdioma.length > 0){
                    
                    idioma.id = parseInt(id)

                    let result = await idiomaDAO.updateIdioma(idioma)

                    if (result)
                        return message.SUCCESS_UPDATED_ITEM //200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500

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

//funcao para tratar a exclusao de um idioma no DAO
const excluirIdioma=async function(id){

    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            
            let resultIdioma = await idiomaDAO.selectByIdIdioma(parseInt(id))

            if(resultIdioma != false || typeof(resultIdioma) == 'object'){
                
                if(resultIdioma.length > 0){
                    
                    let result = await idiomaDAO.deleteIdioma(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                }else{
                    return message.ERROR_NOT_FOUND // 404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}


//funcao para tratar o retorno de uma lista de idiomas no DAO
const listarIdioma=async function(){

    try{

        let dadosIdioma = {}

        let resultIdioma = await idiomaDAO.selectAllIdioma()

        if(resultIdioma != false || typeof(resultIdioma) == 'object'){
            if(resultIdioma.length > 0){

                dadosIdioma.status = true
                dadosIdioma.status_code = 200
                dadosIdioma.itens = resultIdioma.length
                dadosIdioma.idiom = resultIdioma

                return dadosIdioma

            } else {
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL // 500
        } 

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500

    }
}

//funcao para tratar o retorno de um idioma filtrado pelo id no DAO
const buscarIdioma=async function(id){

    try {
        if (id == '' || id == undefined || id == null|| isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS 
        }else{

            dadosIdioma = {}

            let resultIdioma = await idiomaDAO.selectByIdIdioma(parseInt(id))

            if(resultIdioma != false || typeof(resultIdioma) == 'object'){
                if(resultIdioma.length > 0){

                    dadosIdioma.status = true
                    dadosIdioma.status_code = 200
                    dadosIdioma.idiom = resultIdioma

                    return dadosIdioma //200

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
    inserirIdioma,
    atualizarIdioma,
    excluirIdioma,
    listarIdioma,
    buscarIdioma
}