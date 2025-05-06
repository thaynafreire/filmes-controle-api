/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de FilmeGeneros
 * Data: 06/05/2025
 * Autor: thayná
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertFilmeGenero = async function(FilmeGenero){
  try {

      let sql = `insert into tbl_filme_genero  ( 
                                          id_filme,
                                          id_genero
                                        ) 
                                          values 
                                        (
                                          ${FilmeGenero.id_filme},
                                          ${FilmeGenero.id_genero}
                                        )`
      //console.log(sql)

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um FilmeGenero existente
const updateFilmeGenero = async function(FilmeGenero){
  try {
      let sql = `update tbl_filme_genero set        id_filme       = ${FilmeGenero.id_filme},
                                                    id_genero      = ${FilmeGenero.id_genero}
                                        
                            where id = ${FilmeGenero.id}                
                            `
      let resultFilmeGenero = await prisma.$executeRawUnsafe(sql)

      if(resultFilmeGenero)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteFilmeGenero = async function(id){
  try {
    let sql = `delete from tbl_filme_genero where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllFilmeGenero = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_filme_genero order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um FilmeGenero pelo ID
const selectByIdFilmeGenero = async function(id){
  try {
    let sql = `select * from tbl_filme_genero where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os filmes pelo genero
const selectFilmeByIdGenero = async function(idGenero){
  try {
      let sql = `select tbl_filme.* from tbl_filme 
                                            inner join tbl_filme_genero
                                              on tbl_filme.id = tbl_filme_genero.id_filme
                                            inner join tbl_genero
                                              on tbl_genero.id = tbl_filme_genero.id_genero
                  where tbl_filme_genero.id_genero = ${idGenero}`

      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os generos pelo Filme
const selectGeneroByIdFilme = async function(idFilme){
 try {
      let sql = `select tbl_genero.* from tbl_filme 
                                            inner join tbl_filme_genero
                                              on tbl_filme.id = tbl_filme_genero.id_filme
                                            inner join tbl_genero
                                              on tbl_genero.id = tbl_filme_genero.id_genero
                  where tbl_filme_genero.id_filme = ${idFilme}`
                  
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
    insertFilmeGenero,
    updateFilmeGenero,
    deleteFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectFilmeByIdGenero,
    selectGeneroByIdFilme
}