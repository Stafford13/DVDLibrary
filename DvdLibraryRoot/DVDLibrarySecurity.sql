use DVDLibrary
go

if exists (select * from sys.server_principals where name = N'DVDLibraryApp')
drop login DVDLibraryApp 
go

if exists (select * from sys.database_principals where name = N'DVDLibraryApp')
drop user DVDLibraryApp 
go

create login DVDLibraryApp with password='Testing123'
go

create user DVDLibraryApp for login DvdLibraryApp
go

GRANT EXECUTE ON DVDSelectAll TO DVDLibraryApp
GRANT EXECUTE ON DVDSelectById TO DVDLibraryApp
GRANT EXECUTE ON DVDCreate TO DVDLibraryApp
GRANT EXECUTE ON DVDUpdate TO DVDLibraryApp
GRANT EXECUTE ON DVDDelete TO DVDLibraryApp
GRANT EXECUTE ON DVDSelectByRating TO DVDLibraryApp
GRANT EXECUTE ON DVDSelectByTitle TO DVDLibraryApp
GRANT EXECUTE ON DVDSelectByDirector TO DVDLibraryApp
GRANT EXECUTE ON DVDSelectByRealeaseYear TO DVDLibraryApp
go

grant select on DVDs to DVDLibraryApp
grant insert on DVDs to DVDLibraryApp
grant update on DVDs to DVDLibraryApp
grant delete on DVDs to DVDLibraryApp
go