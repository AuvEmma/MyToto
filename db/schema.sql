drop table if exists users cascade;
drop table if exists privatetoto cascade;

create table users(
  user_id serial primary key,
  email text unique,
  password_digest text
);

CREATE TABLE privatetoto(
  privatetoto_id       SERIAL PRIMARY KEY
  ,user_id             integer REFERENCES users(user_id)
  ,Name                VARCHAR not null
  ,Location            VARCHAR
  ,Latitude            NUMERIC not null
  ,Longitude           NUMERIC not null
  ,Open_YearRound      VARCHAR
  ,Handicap_Accessible VARCHAR
  ,Borough             VARCHAR
  ,Comments            VARCHAR
);
