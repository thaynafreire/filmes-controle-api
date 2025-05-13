/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de diretores
* data: 22/04/2025
* autor: Thayná
* versao: 1.0
***********************************************************************************/


const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


//inserir novo diretor
const insertDiretor = async function(diretor){

    try{

        let sql = `insert into tbl_diretor (nome,
                                            sobre
                                            ) 
                                            values 
                                            (
                                            '${diretor.nome}',
                                             '${diretor.sobre}'
                                            )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}   


//atualizar diretor
const updateDiretor = async function(diretor){
    
    try {
        let sql = `update tbl_diretor set nome = '${diretor.nome}',
                                          sobre = '${diretor.sobre}'
                                       where id = ${diretor.id}`

        let resultDiretor = await prisma.$executeRawUnsafe(sql)

        if(resultDiretor){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}


//excluir diretor
const deleteDiretor = async function(id) {

    try {
        let sql = `delete from tbl_diretor where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//listar todos os diretores
const selectAllDiretor = async function() {

    try {

        let sql = 'select * from tbl_diretor order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
            return false
    } catch (error){
        return false
    }
}

//listar diretor pelo id
const selectByIdDiretor = async function(id) {

    try {

        let sql = `select * from tbl_diretor where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if (result)
            return result 
        else
            return false
    } catch (error) {
        return false
    }
}

const selectLastInsertId = async function() {
    try {
        let sql = 'select id from tbl_diretor order by id desc limit 1';
        let result = await prisma.$queryRawUnsafe(sql);
        if(result)
            return result;
        else
            return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    insertDiretor,
    updateDiretor,
    deleteDiretor,
    selectAllDiretor,
    selectByIdDiretor,
    selectLastInsertId
}