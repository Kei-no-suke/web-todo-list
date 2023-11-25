create table if not exists users(user_id serial primary key, login_type integer );

create table if not exists sessions(session_id varchar primary key, user_id integer, expired_date timestamp, foreign key (user_id) references users(user_id)
on delete cascade on update cascade );

create table if not exists google_users(google_user_id serial primary key,
user_id integer, email varchar, google_id varchar, foreign key (user_id) references users(user_id)
on delete cascade on update cascade );

create table if not exists password_users(password_user_id serial primary key,
user_id integer, email varchar, password varchar, foreign key (user_id) references users(user_id)
on delete cascade on update cascade );

create table if not exists groups(group_id serial primary key, user_id integer, name varchar, detail varchar, 
foreign key (user_id) references users(user_id)
on delete cascade on update cascade );

create table if not exists tasks(task_id serial primary key, user_id integer, group_id integer, name varchar, detail varchar,
deadline date, status integer, doc_url varchar,
foreign key (group_id) references groups(group_id)
on delete set null on update cascade,
foreign key (user_id) references users(user_id)
on delete cascade on update cascade );