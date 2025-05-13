create database db_controle_filmes_ab;

use db_controle_filmes_ab;

#tem que obrigatoriamente comecar com o tipo
create table tbl_filme(
	id int not null primary key auto_increment,
	nome varchar(80) not null,
    duracao time not null,
    sinopse text not null,
    data_lancamento date not null,
    foto_capa varchar(200),
    link_trailer varchar(200),
    id_classificacao int not null,

    constraint FK_CLASSIFICACAO_FILME #Cria um nome para o relacionamento
    foreign key (id_classificacao)    #Especifica qual o atributo desta tabela será a FK
    references tbl_classificacao(id)  #Especifica a origem da Chave, ou seja, de qual tabela virá a PK
);

drop table tbl_teste;

create table tbl_usuario(
	id int not null primary key auto_increment,
	nome varchar(45) not null,
    email varchar(80) not null,
    username varchar(45) not null,
    data_nascimento date not null,
    senha varchar(45) not null
);

create table tbl_idioma(
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    sigla varchar(5) not null
);

create table tbl_plataforma(
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    sobre varchar(100) 
);

create table tbl_premiacao(
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    sobre varchar(100) 
);

create table tbl_diretor(
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    sobre varchar(100) 
);

create table tbl_genero(
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    descricao varchar(100) not null
);

create table tbl_classificacao(
    id int not null primary key auto_increment,
    idade_indicativa varchar(2) not null,
    descricao varchar(100)
);

create table tbl_avaliacao(
	id int not null primary key auto_increment,
	nota varchar(5) not null,
    comentario varchar(150),
    id_filme int not null,
    id_usuario int not null,

    constraint FK_FILME_AVALIACAO #Cria um nome para o relacionamento
    foreign key (id_filme)    #Especifica qual o atributo desta tabela será a FK
    references tbl_filme(id),  #Especifica a origem da Chave, ou seja, de qual tabela virá a PK

    constraint FK_USUARIO_AVALIACAO #Cria um nome para o relacionamento
    foreign key (id_usuario)    #Especifica qual o atributo desta tabela será a FK
    references tbl_usuario(id)  #Especifica a origem da Chave, ou seja, de qual tabela virá a PK
);

create table tbl_filme_genero (
	id 				int not null primary key auto_increment,
    id_filme		int not null,
    id_genero 		int	not null,
	constraint FK_FILME_FILME_GENERO
    foreign key (id_filme) 
    references tbl_filme(id),
    
    constraint FK_GENERO_FILME_GENERO
    foreign key (id_genero) 
    references tbl_genero(id)
);

create table tbl_filme_diretor (
    id int not null primary key auto_increment,
    id_filme int not null,
    id_diretor int not null,

    constraint FK_FILME_DIRETOR
    foreign key (id_filme) 
    references tbl_filme(id),

    constraint FK_DIRETOR_FILME_DIRETOR
    foreign key (id_diretor)
    references tbl_diretor(id)
);