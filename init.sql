CREATE user collab_user WITH password 'Io3202!!';

CREATE database collaboratory; 
\connect collaboratory;

CREATE TABLE users( id SERIAL PRIMARY KEY, username varchar(50) not null UNIQUE, password char(60) not null);

grant select,insert,update,delete on users to collab_user;
grant select,USAGE on sequence users_id_seq to collab_user;