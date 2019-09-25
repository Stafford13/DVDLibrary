USE [DVDLibrary]
GO

CREATE TABLE [dbo].[DVDs](
	[dvdId] [int] IDENTITY(0,1) PRIMARY KEY NOT NULL,
	[title] [nvarchar](75) NOT NULL,
	[director] [nvarchar](50) NOT NULL,
	[realeaseYear] [int] NOT NULL,
	[rating] [char](5) NOT NULL,
	[notes] [nvarchar](300) NULL,

(



