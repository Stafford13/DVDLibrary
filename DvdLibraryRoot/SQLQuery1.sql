use DVDLibrary
go

drop table DVDs
create table DVDs (
dvdId int primary key identity (1,1) not null,
title nvarchar(75) not null,
realeaseYear int not null,
director nvarchar(50) not null,
rating char(5) not null,
notes nvarchar(300) null,
)

insert into DVDs (title, realeaseYear, director, rating, notes) values 
('A Great Tale', 2015, 'Sam Jones', 'PG', 'This really is a great tale!'),
('A Good Tale',2015, 'Sam Jones', 'PG', 'This really is a good tale!')