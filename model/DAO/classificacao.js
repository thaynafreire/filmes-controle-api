/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de classificacoes
* data: 22/04/2025
* autor: Thayná
* versao: 1.0
***********************************************************************************/


const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


//inserir nova classificacao
const insertClassificacao = async function(classificacao){

    try{
        
        let sql = `insert into tbl_classificacao (idade_indicativa,
                                                 descricao
                                                ) 
                                                values 
                                                (
                                                '${classificacao.idade_indicativa}',
                                                '${classificacao.descricao}'
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


//atualizar classificacao
const updateClassificacao = async function(classificacao){
    try {
        let sql = `update tbl_classificacao set  idade_indicativa = '${classificacao.idade_indicativa}',
                                                 descricao = '${classificacao.descricao}' 
                                            where id = ${classificacao.id}`

        let resultClassificacao = await prisma.$executeRawUnsafe(sql)

        if(resultClassificacao)
            return true
        else
            return false
    
    } catch (error) {
        return false
    }
}

//excluir classificacao
const deleteClassificacao = async function(id) {
    try {
        let sql = `delete from tbl_classificacao where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//listar todas as classificacoes
const selectAllClassificacao = async function() {
    try {

        let sql = 'select * from tbl_classificacao order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
            return false

    } catch (error){
        return false
    }
}

//listar classificacao pelo id
const selectByIdClassificacao = async function(id) {

    try {
        let sql = `select * from tbl_classificacao where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if (result)
            return result 
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao
}