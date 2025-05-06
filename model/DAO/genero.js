/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de generos de genero
* data: 19/04/2025
* autor: thayná
* versao: 1.0
***********************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


//inserir genero
const insertGenero = async function(genero){

    try{
        let sql = `insert into tbl_genero (nome,
                                           descricao
                                           ) 
                                           values 
                                           (
                                           '${genero.nome}',
                                           '${genero.descricao}'
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


//atualizar genero existente
const updateGenero = async function(genero){

    try {
        let sql = `update tbl_genero set nome = '${genero.nome}',
                                         descricao = '${genero.descricao}'
                                     where id = ${genero.id}`

        let resultGenero = await prisma.$executeRawUnsafe(sql)

        if(resultGenero)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

//deletar genero
const deleteGenero = async function(id) {

    try {
        let sql = `delete from tbl_genero where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//selecionar todos os generos
const selectAllGenero = async function() {

    try {

        let sql = 'select * from tbl_genero order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

            if(result)
                return result
            else 
                return false

    } catch (error){
        return false
    }
}


//selecionar genero pelo id
const selectByIdGenero = async function(id) {

    try {
        let sql = `select * from tbl_genero where id = ${id}`

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}