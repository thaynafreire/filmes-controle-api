
/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de usuarios
* data: 19/04/2025
* autor: thayná
* versao: 1.0
***********************************************************************************/

const {PrismaClient}=require('@prisma/client')

const prisma=new PrismaClient()


//funcao para inserir um novo usuario
const insertUsuario= async function (usuario) {

    try {

        let sql = `insert into tbl_usuario (nome,
                                            email,
                                            username,
                                            data_nascimento,
                                            senha
                                            )
                                            values
                                            (
                                            '${usuario.nome}',
                                            '${usuario.email}',
                                            '${usuario.username}',
                                            '${usuario.data_nascimento}',
                                            '${usuario.senha}'
                                            )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        //console.log(error)
        return false
    }
    
}

//funcao para atualizar um usuario
const updateUsuario = async function (usuario) {

    try {
        let sql = `update tbl_usuario set nome =            '${usuario.nome}',
                                          email =           '${usuario.email}',
                                          username =        '${usuario.username}',
                                          data_nascimento = '${usuario.data_nascimento}',
                                          senha =           '${usuario.senha}'
                                        where id = ${usuario.id}
                                          `

        let resultUsuario = await prisma.$executeRawUnsafe(sql)

        if(resultUsuario){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
    
}

//funcao para excluir um filme existente
const deleteUsuario = async function (id) {

    try {
        let sql = `delete from tbl_usuario where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql) 

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false     
    }
    
}

//funcao para retornar todos os usuarios existentes
const selectAllUsuario = async function () {

    try {
        
        let sql = 'select * from tbl_usuario order by id desc'

                
        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result
        else 
            return false
        
    } catch (error) {
        return false
    }
    
}

//função para buscar um usuario pelo id 
const selectByIdUsuario = async function (id) {
    try {
        let sql = `select * from tbl_usuario where id = ${id}`

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
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}
