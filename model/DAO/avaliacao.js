const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const insertAvaliacao = async function(avaliacao) {
    try {
        let sql = `insert into tbl_avaliacao (
                    nota,
                    comentario,
                    id_filme,
                    id_usuario
                ) values (
                    '${avaliacao.nota}',
                    '${avaliacao.comentario}',
                    ${avaliacao.id_filme},
                    ${avaliacao.id_usuario}
                )`
        
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateAvaliacao = async function(avaliacao) {
    try {
        let sql = `update tbl_avaliacao set 
                    nota = '${avaliacao.nota}',
                    comentario = '${avaliacao.comentario}',
                    id_filme = ${avaliacao.id_filme},
                    id_usuario = ${avaliacao.id_usuario}
                where id = ${avaliacao.id}`
        
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteAvaliacao = async function(id) {
    try {
        let sql = `delete from tbl_avaliacao where id = ${id}`
        
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllAvaliacao = async function() {
    try {
        let sql = 'select * from tbl_avaliacao order by id desc'
        
        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdAvaliacao = async function(id) {
    try {
        let sql = `select * from tbl_avaliacao where id = ${id}`
        
        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    selectAllAvaliacao,
    selectByIdAvaliacao
}