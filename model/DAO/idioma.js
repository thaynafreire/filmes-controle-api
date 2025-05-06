/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD dos idiomas
* data: 19/04/2025
* autor: Thayná
* versao: 1.0
***********************************************************************************/


const {PrismaClient}=require('@prisma/client')


const prisma=new PrismaClient()

//função para inserir um novo idioma
const insertIdioma = async function (idioma) {

    try {

        let sql=`insert into tbl_idioma (nome,
                                        sigla
                                        )
                                        values
                                        (
                                        '${idioma.nome}',
                                        '${idioma.sigla}'
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

//função para atualizar um idioma existente
const updateIdioma = async function (idioma) {

    try {
        let sql = `update tbl_idioma set nome = '${idioma.nome}',
                                         sigla = '${idioma.sigla}'
                                     where id = ${idioma.id}
                                        `

        let resultIdioma = await prisma.$executeRawUnsafe(sql)

        if(resultIdioma){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
    
}

//função para excluir um idioma existente
const deleteIdioma = async function (id) {

    try {
        let sql = `delete from tbl_idioma where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false       
    }
    
}

//função para retornar todos os idiomas existentes
const selectAllIdioma = async function () {

    try {

        let sql = 'select * from tbl_idioma order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
        
    } catch (error) {
        return false
    }
    
}

//função para buscar um idioma pelo id
const selectByIdIdioma = async function (id) {
    
    try {
        let sql = `select * from tbl_idioma where id = ${id}`

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
    insertIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdioma,
    selectByIdIdioma
}