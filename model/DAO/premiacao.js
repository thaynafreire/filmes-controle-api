/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de premiacao
* data: 22/04/2025
* autor: thayná
* versao: 1.0
***********************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


//adicionar nova premiacao
const insertPremiacao = async function(premiacao){

    try{

        let sql = `insert into tbl_premiacao (nome,
                                              sobre
                                              ) 
                                              values 
                                              (
                                              '${premiacao.nome}',
                                              '${premiacao.sobre}'
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


//atualizar premiacao
const updatePremiacao = async function(premiacao){

    try {
        let sql = `update tbl_premiacao set nome = '${premiacao.nome}',
                                            sobre = '${premiacao.sobre}'
                                        where id = ${premiacao.id}`

        let resultPremiacao = await prisma.$executeRawUnsafe(sql)

        if(resultPremiacao)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

//deletar premiacao
const deletePremiacao = async function(id) {

    try {
        let sql = `delete from tbl_premiacao where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//listar todas as premiacoes
const selectAllPremiacao = async function() {

    try {

        let sql = 'select * from tbl_premiacao order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
            return false

    } catch (error){
        return false
    }
}

//listar premiacao pelo id
const selectByIdPremiacao = async function(id) {

    try {
        let sql = `select * from tbl_premiacao where id = ${id}`

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
    insertPremiacao,
    updatePremiacao,
    deletePremiacao,
    selectAllPremiacao,
    selectByIdPremiacao
}