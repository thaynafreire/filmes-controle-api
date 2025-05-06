/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD das plataformas
* data: 19/04/2025
* autor: Thayná
* versao: 1.0
***********************************************************************************/


const {PrismaClient}=require('@prisma/client')


const prisma=new PrismaClient()

//função para inserir uma nova plataforma
const insertPlataforma = async function (plataforma) {

    try {

        let sql=`insert into tbl_plataforma (nome,
                                            sobre
                                        )
                                        values
                                        (
                                        '${plataforma.nome}',
                                        '${plataforma.sobre}'
                                        )`

        let result= await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
        
    }

    
}

//função para atualizar uma plataforma
const updateplataforma = async function (plataforma) {

    try {
        let sql = `update tbl_plataforma set nome = '${plataforma.nome}',
                                         sobre = '${plataforma.sobre}'
                                     where id = ${plataforma.id}
                                        `

        let resultPlataforma = await prisma.$executeRawUnsafe(sql)

        if(resultPlataforma){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
    
}

//função para excluir uma plataforma existente
const deletePlataforma = async function (id) {

    try {
        let sql = `delete from tbl_plataforma where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false       
    }
    
}

//função para retornar todas as plataformas existentes
const selectAllPlataforma = async function () {

    try {

        let sql = 'select * from tbl_plataforma order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
        
    } catch (error) {
        return false
    }
    
}

//função para buscar uma plataforma pelo id
const selectByIdPlataforma = async function (id) {
    try {
        
        let sql = `select * from tbl_plataforma where id = ${id}`

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
    insertPlataforma,
    updateplataforma,
    deletePlataforma,
    selectAllPlataforma,
    selectByIdPlataforma
}