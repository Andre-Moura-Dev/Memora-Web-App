create database memora_web_app;

use memora_web_app;

create table Administradores (
	id_administradores int auto_increment,
	nivel_acesso varchar(50) not null,
    nome varchar(100) not null,
    email varchar(50) not null,
    senha varchar(50) not null,
    tipo_usuario enum('Administrador', 'Usuário', 'Editor') not null,
    primary key (id_administradores)
);

create table Permissoes (
	id_permissoes int auto_increment,
    ID_Administradores int not null, -- Chave estrangeira
    descricao text not null,
    nivel_permissao varchar(100) not null,
    constraint foreign key (ID_Administradores) references Administradores (ID_Administradores),
    primary key (id_permissoes)
);

create table Publicacoes (
	id_publicacoes int auto_increment,
    ID_Administradores int not null, -- Chave Estrangeira
    titulo varchar(255) not null,
    conteudo text not null,
    categoria enum('Notícia', 'Evento', 'Comunicado', 'Outro') not null,
    data_publicacao datetime not null default current_timestamp,
    data_atualizacao datetime not null default current_timestamp on update current_timestamp,
    curtidas int not null,
    comentarios int not null,
    status enum('Rascunho', 'Publicado', 'Arquivado') not null default 'Rascunho',
    constraint foreign key (ID_Administradores) references Administradores(ID_Administradores),
    primary key (id_publicacoes)
);