/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de FilmeGeneros
 * Data: 13/05/2025
 * Autor: thayná
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertFilmeDiretor = async function(filmeDiretor) {
    try {
        let sql = `insert into tbl_filme_diretor (id_filme, id_diretor)
                   values (${filmeDiretor.id_filme}, ${filmeDiretor.id_diretor})`;
        
        let result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateFilmeDiretor = async function(filmeDiretor) {
    try {
        let sql = `update tbl_filme_diretor set 
                   id_filme = ${filmeDiretor.id_filme},
                   id_diretor = ${filmeDiretor.id_diretor}
                   where id = ${filmeDiretor.id}`;
        
        let result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteFilmeDiretor = async function(id) {
    try {
        let sql = `delete from tbl_filme_diretor where id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const selectAllFilmeDiretor = async function() {
    try {
        let sql = 'select * from tbl_filme_diretor order by id desc';
        let result = await prisma.$queryRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const selectByIdFilmeDiretor = async function(id) {
    try {
        let sql = `select * from tbl_filme_diretor where id = ${id}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const selectDiretorByIdFilme = async function(idFilme) {
    try {
        let sql = `select d.* from tbl_diretor d
                   inner join tbl_filme_diretor fd on d.id = fd.id_diretor
                   where fd.id_filme = ${idFilme}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const selectFilmeByIdDiretor = async function(idDiretor) {
    try {
        let sql = `select f.* from tbl_filme f
                   inner join tbl_filme_diretor fd on f.id = fd.id_filme
                   where fd.id_diretor = ${idDiretor}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    insertFilmeDiretor,
    updateFilmeDiretor,
    deleteFilmeDiretor,
    selectAllFilmeDiretor,
    selectByIdFilmeDiretor,
    selectDiretorByIdFilme,
    selectFilmeByIdDiretor
};