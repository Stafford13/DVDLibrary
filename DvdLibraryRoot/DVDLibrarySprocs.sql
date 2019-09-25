use DVDLibrary
go

--CREATE
if exists(select * from INFORMATION_SCHEMA.ROUTINES where ROUTINE_NAME = 'DVDCreate')
begin
    drop procedure DVDCreate
end
go

create procedure DVDCreate (
@Title nvarchar(75),
@Year int,
@Director nvarchar(50),
@Rating char(5),
@Notes nvarchar(300)
)
as
insert into DVDs (title, rating, director, realeaseYear, notes) values
(@Title, @Rating, @Director, @Year, @Notes)
go

--UPDATE
if exists(select * from INFORMATION_SCHEMA.ROUTINES where ROUTINE_NAME = 'DVDUpdate')
begin
    drop procedure DVDUpdate
end
go

create procedure DVDUpdate (
@dvdId int,
@dvdTitle nvarchar(75),
@dvdYear int,
@dvdDirector nvarchar(50),
@dvdRating char(5),
@dvdNotes nvarchar(300)
)
as

update DVDs set
Title = @dvdTitle, 
Rating = @dvdRating, 
Director = @dvdDirector, 
RealeaseYear = @dvdYear, 
Notes = @dvdNotes
where dvdId = @dvdId
go

--DELETE
if exists(select * from INFORMATION_SCHEMA.ROUTINES where ROUTINE_NAME = 'DVDDelete')
begin
    drop procedure DVDDelete
end
go

create procedure DVDDelete (@id int)
as
delete
from DVDs
where dvdId = @id
go

--GetAll
if exists(select * from INFORMATION_SCHEMA.ROUTINES where ROUTINE_NAME = 'DVDSelectAll')
begin
    drop procedure DVDSelectAll
end
go
create procedure DVDSelectAll
as

select *
from DVDs
order by dvdId desc
go

--GetById
if exists(select * from INFORMATION_SCHEMA.ROUTINES where ROUTINE_NAME = 'DVDSelectById')
begin
    drop procedure DVDSelectById
end
go

create procedure DVDSelectById (@id int)
as

select *
from DVDs
where dvdId = @id
order by dvdId desc
go

--GetByTitle
if exists(select * from INFORMATION_SCHEMA.ROUTINES where ROUTINE_NAME = 'DVDSelectByTitle')
begin
    drop procedure DVDSelectByTitle
end
go

create procedure DVDSelectByTitle (@title nvarchar(75))
as

select *
from DVDs
where title = @title
order by dvdId desc
go

--GetByRating
if exists(select * from INFORMATION_SCHEMA.ROUTINES where ROUTINE_NAME = 'DVDSelectByRating')
begin
    drop procedure DVDSelectByRating
end
go

create procedure DVDSelectByRating (@rating char(5))
as

select *
from DVDs
where rating = @rating
order by dvdId desc
go

--GetByYear
if exists(select * from INFORMATION_SCHEMA.ROUTINES where ROUTINE_NAME = 'DVDSelectByRealeaseYear')
begin
    drop procedure DVDSelectByRealeaseYear
end
go

create procedure DVDSelectByRealeaseYear (@year int)
as

select *
from DVDs
where realeaseYear = @year
order by dvdId desc
go

--GetByDirector
if exists(select * from INFORMATION_SCHEMA.ROUTINES where ROUTINE_NAME = 'DVDSelectByDirector')
begin
    drop procedure DVDSelectByDirector
end
go

create procedure DVDSelectByDirector (@director nvarchar(50))
as

select *
from DVDs
where director = @director
order by dvdId desc
go

--
