/***************************************************************
 * objetivo: criar uma API para realizar o CRUD do sistema de controle de filmes
 * data: 11/02/2025
 * autor: Thayná
 * versao: 1.0
 * observacao:
 *      para criar a API precisamos instalar:
 *          express         npm install express --save
 *          cors            npm install cors --save
 *          body-parser     npm install body-parser --save
 * 
 *      para criar a integracao com o banco de dados precisamos instalar:
 *          prisma          npm install prisma --save (para fazer a conexao com o banco de dados)
 *          prisma/client   npm install @prisma/client --save (para rodar os scripts SQL)
 * 
 *      após a instalação do prisma e do prisma client devemos:
 *          npx prisma init
 *      você deverá cofigurar o arqivo .env e o schema.prisma com as credenciais do banco de dados
 *      apos essa configuraçao devera rodar o seguinte comando:
 *          npx prisma migrate dev
**********************************************************************************/

//import das bibliotecas para configrar a api
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//manipular o body da reqisição para chegar apenas JSON
const bodyParserJSON = bodyParser.json()

//cria objeto app com referencias do express para criar a api
const app = express()


//configurações de acesso doo CORS para a api
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})


//filme
const controllerFilme = require('./controller/filme/controllerFilme.js')

app.post('/v1/controle-filmes/filme', cors(), bodyParserJSON, async function(request, response){


    //Recebe o content type da requisição
    let contentType = request.header('content-type')

    //recebe do body da requisiçao os dados encaminhados
    let dadosBody = request.body
    let resultFilme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.get('/v1/controle-filmes/filme', cors(), async function (request, response){

    //chama a função para retornar os filmes 
    let resultFilme = await controllerFilme.listarFilme()

    response.status(resultFilme.status_code)
    response.json(resultFilme)
    
})

app.get('/v1/controle-filmes/filme/:id', cors(), async function (request, response) {
    let idFilme = request.params.id

    let resultFilme = await controllerFilme.buscarFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.delete('/v1/controle-filmes/filme/:id', cors(), async function (request, response) {
    //recebe id da requisição
    let idFilme = request.params.id
    let resultFilme = await controllerFilme.excluirFilme(idFilme)

    response.status(resultFilme.status_code)  
    response.json(resultFilme)
    
})

app.put('/v1/controle-filmes/filme/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da requisição
    let idFilme = request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultFilme = await controllerFilme.atualizarFilme(idFilme, dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)


})



//usuario
const controllerUsuario = require('./controller/usuario/controllerUsuario.js')

//inserir novo usuario
app.post('/v1/controle-filmes/usuario', cors(), bodyParserJSON, async function(request, response){
    
    let contentType = request.header('content-type')

    let dadosBody = request.body
    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//listar todos os usuarios
app.get('/v1/controle-filmes/usuario', cors(), async function (request, response){

    let resultUsuario = await controllerUsuario.listarUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//listar usuario pelo id
app.get('/v1/controle-filmes/usuario/:id', cors(), async function (request, response) {
    
    let idUsuario = request.params.id

    let resultUsuario = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//excluir usuario
app.delete('/v1/controle-filmes/usuario/:id', cors(), async function (request, response) {
    
    let idUsuario = request.params.id
    let resultUsuario = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(resultUsuario.status_code)  
    response.json(resultUsuario)
})

//atualizar usuario
app.put('/v1/controle-filmes/usuario/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let contentType = request.headers['content-type']

    let idUsuario = request.params.id

    let dadosBody = request.body

    let resultUsuario = await controllerUsuario.atualizarUsuario(idUsuario, dadosBody, contentType)
    
    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})



//idioma
const controllerIdioma = require('./controller/idioma/controllerIdioma.js')

//inserir idioma
app.post('/v1/controle-filmes/idioma', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.header('content-type')

    let dadosBody = request.body
    let resultIdioma = await controllerIdioma.inserirIdioma(dadosBody,contentType)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
    
})

//listar todos os idiomas
app.get('/v1/controle-filmes/idioma', cors(), async function (request, response){

     
    let resultIdioma = await controllerIdioma.listarIdioma()

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
    
})

//listar idioma pelo id
app.get('/v1/controle-filmes/idioma/:id', cors(), async function (request, response) {
    let idIdioma = request.params.id

    let resultIdioma = await controllerIdioma.buscarIdioma(idIdioma)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

//excluir idioma
app.delete('/v1/controle-filmes/idioma/:id', cors(), async function (request, response) {
    
    let idIdioma = request.params.id
    let resultIdioma = await controllerIdioma.excluirIdioma(idIdioma)

    response.status(resultIdioma.status_code)  
    response.json(resultIdioma)
    
})

//atualizar idioma
app.put('/v1/controle-filmes/idioma/:id', cors(), bodyParserJSON, async function (request, response) {
    
    
    let contentType = request.headers['content-type']

    
    let idIdioma = request.params.id

    
    let dadosBody = request.body

    let resultIdioma = await controllerIdioma.atualizarIdioma(idIdioma, dadosBody, contentType)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)

})



//plataforma
const controllerPlataforma = require('./controller/plataforma/controllerPlataforma.js')

//inserir plataforma
app.post('/v1/controle-filmes/plataforma', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.header('content-type')

    let dadosBody = request.body
    let resultPlataforma = await controllerPlataforma.inserirPlataforma(dadosBody,contentType)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
    
})

//listar todos as plataformas
app.get('/v1/controle-filmes/plataforma', cors(), async function (request, response){

     
    let resultPlataforma = await controllerPlataforma.listarPlataforma()

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
    
})

//listar plataforma pelo id
app.get('/v1/controle-filmes/plataforma/:id', cors(), async function (request, response) {
    let idPlataforma = request.params.id

    let resultPlataforma = await controllerPlataforma.buscarPlataforma(idPlataforma)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})

//excluir plataforma
app.delete('/v1/controle-filmes/plataforma/:id', cors(), async function (request, response) {
    
    let idPlataforma = request.params.id
    let resultPlataforma = await controllerPlataforma.excluirPlataforma(idPlataforma)

    response.status(resultPlataforma.status_code)  
    response.json(resultPlataforma)
    
})

//atualizar plataforma
app.put('/v1/controle-filmes/plataforma/:id', cors(), bodyParserJSON, async function (request, response) {
    
    
    let contentType = request.headers['content-type']

    
    let idPlataforma = request.params.id

    
    let dadosBody = request.body

    let resultPlataforma = await controllerPlataforma.atualizarPlataforma(idPlataforma, dadosBody, contentType)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)

})



//premiacao
const controllerPremiacao = require('./controller/premiacao/controllerPremiacao.js')

//inserir nova premiação
app.post('/v1/controle-filmes/premiacao', cors(), bodyParserJSON, async function(request, response){
    
    let contentType = request.header('content-type')
    
    let dadosBody = request.body
    let resultPremiacao = await controllerPremiacao.inserirPremiacao(dadosBody, contentType)
    
    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

//listar todas as premiacoes
app.get('/v1/controle-filmes/premiacao', cors(), async function (request, response){
    
    let resultPremiacao = await controllerPremiacao.listarPremiacao()
    
    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

//listar premiação pelo id
app.get('/v1/controle-filmes/premiacao/:id', cors(), async function (request, response) {
    let idPremiacao = request.params.id
    
    let resultPremiacao = await controllerPremiacao.buscarPremiacao(idPremiacao)
    
    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

//excluir premiação
app.delete('/v1/controle-filmes/premiacao/:id', cors(), async function (request, response) {
    
    let idPremiacao = request.params.id
    let resultPremiacao = await controllerPremiacao.excluirPremiacao(idPremiacao)
    
    response.status(resultPremiacao.status_code)  
    response.json(resultPremiacao)
})

//atualizar premiação
app.put('/v1/controle-filmes/premiacao/:id', cors(), bodyParserJSON, async function (request, response) {
    
    
    let contentType = request.headers['content-type']
    
    let idPremiacao = request.params.id
    
    let dadosBody = request.body
    
    let resultPremiacao = await controllerPremiacao.atualizarPremiacao(idPremiacao, dadosBody, contentType)
    
    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})



//diretor
const controllerDiretor = require('./controller/diretor/controllerDiretor.js')

//inserir novo diretor
app.post('/v1/controle-filmes/diretor', cors(), bodyParserJSON, async function(request, response){
    
    let contentType = request.header('content-type')
    
    let dadosBody = request.body
    let resultDiretor = await controllerDiretor.inserirDiretor(dadosBody, contentType)
    
    response.status(resultDiretor.status_code)
    response.json(resultDiretor)
})

//listar todos os diretores
app.get('/v1/controle-filmes/diretor', cors(), async function (request, response){
    
    let resultDiretor = await controllerDiretor.listarDiretor()
    
    response.status(resultDiretor.status_code)
    response.json(resultDiretor)
})

//listar diretor pelo id
app.get('/v1/controle-filmes/diretor/:id', cors(), async function (request, response) {
   
    let idDiretor = request.params.id
    
    let resultDiretor = await controllerDiretor.buscarDiretor(idDiretor)
    
    response.status(resultDiretor.status_code)
    response.json(resultDiretor)
})

//excluir diretor
app.delete('/v1/controle-filmes/diretor/:id', cors(), async function (request, response) {
    
    let idDiretor = request.params.id
    let resultDiretor = await controllerDiretor.excluirDiretor(idDiretor)
    
    response.status(resultDiretor.status_code)  
    response.json(resultDiretor)
})

//atualizar diretor
app.put('/v1/controle-filmes/diretor/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let contentType = request.headers['content-type']
    
    let idDiretor = request.params.id
    
    let dadosBody = request.body
    
    let resultDiretor = await controllerDiretor.atualizarDiretor(idDiretor, dadosBody, contentType)
    
    response.status(resultDiretor.status_code)
    response.json(resultDiretor)
})



//genero
const controllerGenero = require('./controller/genero/controllerGenero.js')

//inserir novo genero
app.post('/v1/controle-filmes/genero', cors(), bodyParserJSON, async function(request, response){
    
    let contentType = request.header('content-type')
    
    let dadosBody = request.body
    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)
    
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//listar todos os generos
app.get('/v1/controle-filmes/genero', cors(), async function (request, response){
    
    let resultGenero = await controllerGenero.listarGenero()
    
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//listar genero pelo id
app.get('/v1/controle-filmes/genero/:id', cors(), async function (request, response) {
    
    let idGenero = request.params.id
    
    let resultGenero = await controllerGenero.buscarGenero(idGenero)
    
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//excluir genero
app.delete('/v1/controle-filmes/genero/:id', cors(), async function (request, response) {
    
    let idGenero = request.params.id
    let resultGenero = await controllerGenero.excluirGenero(idGenero)
    
    response.status(resultGenero.status_code)  
    response.json(resultGenero)
})

//atualizar genero
app.put('/v1/controle-filmes/genero/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let contentType = request.headers['content-type']
    
    let idGenero = request.params.id
    
    let dadosBody = request.body
    
    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)
    
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})



//classificacao
const controllerClassificacao = require('./controller/classificacao/controllerClassificacao.js')

//inserir classificacao
app.post('/v1/controle-filmes/classificacao', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.header('content-type')
    let dadosBody = request.body
    let result = await controllerClassificacao.inserirClassificacao(dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})


//listar classificacoes
app.get('/v1/controle-filmes/classificacao', cors(), async function (request, response){
    let result = await controllerClassificacao.listarClassificacao()
    response.status(result.status_code)
    response.json(result)
})

//listar classificacao pelo id
app.get('/v1/controle-filmes/classificacao/:id', cors(), async function (request, response) {
    let id = request.params.id
    let result = await controllerClassificacao.buscarClassificacao(id)
    response.status(result.status_code)
    response.json(result)
})

//deletar classificacao
app.delete('/v1/controle-filmes/classificacao/:id', cors(), async function (request, response) {
    let id = request.params.id
    let result = await controllerClassificacao.excluirClassificacao(id)
    response.status(result.status_code)  
    response.json(result)
})

//atualizar classificacao
app.put('/v1/controle-filmes/classificacao/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body
    let result = await controllerClassificacao.atualizarClassificacao(id, dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})

//avaliacao
const controllerAvaliacao = require('./controller/avaliacao/controllerAvaliacao.js')

app.post('/v1/controle-filmes/avaliacao', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.header('content-type')
    let dadosBody = request.body
    let resultAvaliacao = await controllerAvaliacao.inserirAvaliacao(dadosBody, contentType)
    
    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

app.get('/v1/controle-filmes/avaliacao', cors(), async function(request, response) {
    let resultAvaliacao = await controllerAvaliacao.listarAvaliacao()
    
    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

app.get('/v1/controle-filmes/avaliacao/:id', cors(), async function(request, response) {
    let idAvaliacao = request.params.id
    let resultAvaliacao = await controllerAvaliacao.buscarAvaliacao(idAvaliacao)
    
    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

app.delete('/v1/controle-filmes/avaliacao/:id', cors(), async function(request, response) {
    let idAvaliacao = request.params.id
    let resultAvaliacao = await controllerAvaliacao.excluirAvaliacao(idAvaliacao)
    
    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

app.put('/v1/controle-filmes/avaliacao/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let idAvaliacao = request.params.id
    let dadosBody = request.body
    let resultAvaliacao = await controllerAvaliacao.atualizarAvaliacao(idAvaliacao, dadosBody, contentType)
    
    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})


app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições')
})

