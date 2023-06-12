CREATE user collab_user WITH password 'Io3202!!';

CREATE database collaboratory; 
\connect collaboratory;

CREATE TABLE users( id SERIAL PRIMARY KEY, username varchar(50) not null UNIQUE, password char(60) not null);