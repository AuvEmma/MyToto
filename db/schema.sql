drop table if exists users cascade;

create table users(
  user_id serial primary key,
  email text unique,
  password_digest text
);
