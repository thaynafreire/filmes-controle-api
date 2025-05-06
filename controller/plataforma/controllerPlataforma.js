/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD das plataformas
 * data: 19/04/2025
 * autor: Thayná
 * versao: 1.0 
 ***************************************************************************************/


const message = require('../../modulo/config.js')


const plataformaDAO = require('../../model/DAO/plataforma.js')

//funcao para tratar a insercao de uma plataforma no DAO
const inserirPlataforma = async function (plataforma, contentType) {

    try {

        if(String(contentType).toLowerCase() == 'application/json'){

            if(plataforma.nome == ''                 ||plataforma.nome ==undefined            ||plataforma.nome==null              ||plataforma.nome.length>45      ||
               plataforma.sobre == ''                 ||plataforma.sobre ==undefined            ||plataforma.sobre==null              ||plataforma.sobre.length>100      
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultPlataforma = await plataformaDAO.insertPlataforma(plataforma)

                if(resultPlataforma)
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


//funcao para tratar a atualizacao de uma plataforma no DAO
const atualizarPlataforma = async function (id, plataforma, contentType) {

    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            if(id          == ''                || id         == undefined          || id        == null            || isNaN(id)                || id <= 0 ||
            plataforma.nome == ''                 ||plataforma.nome ==undefined            ||plataforma.nome==null              ||plataforma.nome.length>45      ||
            plataforma.sobre == ''                 ||plataforma.sobre ==undefined            ||plataforma.sobre==null              ||plataforma.sobre.length>100      
        )
        {
            return message.ERROR_REQUIRED_FIELDS //400

        }else{

            let resultPlataforma = await plataformaDAO.selectByIdPlataforma(parseInt(id))

            if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){

                if(resultPlataforma.length > 0){
                    
                    plataforma.id = parseInt(id)

                    let result = await plataformaDAO.updateplataforma(plataforma)

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

//funcao para tratar a exclusao de uma plataforma no DAO 
const excluirPlataforma=async function(id){

    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            
            let resultPlataforma = await plataformaDAO.selectByIdPlataforma(parseInt(id))

            if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){
                
                if(resultPlataforma.length > 0){
                    
                    let result = await plataformaDAO.deletePlataforma(parseInt(id))

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


//funcao para tratar o retorno de uma lista de plataformas no DAO 
const listarPlataforma=async function(){

    try{

        let dadosPlataforma = {}

    
        let resultPlataforma = await plataformaDAO.selectAllPlataforma()

        if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){

            if(resultPlataforma.length > 0){

                dadosPlataforma.status = true
                dadosPlataforma.status_code = 200
                dadosPlataforma.itens = resultPlataforma.length
                dadosPlataforma.platform = resultPlataforma

                return dadosPlataforma

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

const buscarPlataforma=async function(id){

    try {
        if (id == '' || id == undefined || id == null|| isNaN(id) || id<=0) {
            return message.ERROR_REQUIRED_FIELDS 
        }else{

            dadosPlataforma = {}

            let resultPlataforma = await plataformaDAO.selectByIdPlataforma(parseInt(id))

            if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){

                if(resultPlataforma.length > 0){

                    dadosPlataforma.status = true
                    dadosPlataforma.status_code = 200
                    dadosPlataforma.platform = resultPlataforma

                    return dadosPlataforma //200 
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
    inserirPlataforma,
    atualizarPlataforma,
    excluirPlataforma,
    listarPlataforma,
    buscarPlataforma
}