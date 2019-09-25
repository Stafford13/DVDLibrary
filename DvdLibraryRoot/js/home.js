$(document).ready(function () {

LoadAllDVDLibrary();

$('#CreateDvdButton').click(function (event) {

  $('#dvdTableDiv').hide();
$('#createFormDiv').show();

});

$('#SearchButton').click(function (event) {
  $('#DvdTable').empty();
var contentRows = $('#DvdTable');
var category = $('#myList').val();
var term = $('#SearchTextbox').val();
alert(category + term);
  $.ajax ({
    type: 'GET',
    url: 'http://localhost:54272/dvds/' + category + '/' + term,
    success: function(data) {
      $.each(data, function (index, item) {

        // var id = item.dvdId;
        // var title = item.title;
        // var year = item.realeaseYear;
        // var director = item.director;
        // var rating = item.rating;
        var editLink = '<a href=# onclick="showEditForm(' + item.dvdId + ')">Edit</a>';
        var deleteLink = '<a href=# style="color: red;" onclick="deleteDvd(' + item.dvdId + ')">Delete</a>';
        $('#errorMessages')
          .append($('<li>')
          .attr({class: 'list-group-item list-group-item-danger'})
          .text('Success.'));
        var row = '<tr>';
            row += '<td>' + item.title + '</td>';
            row += '<td>' + item.realeaseYear + '</td>';
            row += '<td>' + item.director + '</td>';
            row += '<td>' + item.rating + '</td>';
            row += '<td style="text-align: center">' + editLink +' | '+ deleteLink + '</td>';
            row += '</tr>';
        contentRows.append(row);
      })
    },
    error: function(data, status) {
   $('#errorMessages')
     .append($('<li>')
     .attr({class: 'list-group-item list-group-item-danger'})
     .text('Error calling web service.  Please try again later.'));
    },
  })
});



$('#cancelEditButton').click(function (event) {
  $('#dvdTableDiv').show();
  $('#editFormDiv').hide();
});

$('#cancelCreateButton').click(function (event) {
  $('#dvdTableDiv').show();
  $('#createFormDiv').hide();
});

$('#saveEditButton').click(function (event) {
  alert($('#edit-dvd-Id').val());
  $.ajax ({
    type: 'PUT',
    url: 'http://localhost:54272/dvd/'+ $('#edit-dvd-Id').val(),
    data: JSON.stringify({
      dvdId: $('#edit-dvd-Id').val(),
      title: $('#edit-title').val(),
      realeaseYear: $('#edit-release-year').val(),
      director: $('#edit-director').val(),
      rating: $('#edit-rating').val(),
      notes: $('#edit-notes').val()
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
  'dataType': 'json',
    success: function() {
        $('#errorMessages').empty();
        hideEditForm();
        LoadAllDVDLibrary();
    },
    error: function() {
      $('#errorMessages')
         .append($('<li>')
         .attr({class: 'list-group-item list-group-item-danger'})
         .text('Error calling web service.  Please try again later.'));
    },
  })

  $('#dvdTableDiv').show();
  $('#editFormDiv').hide();
});

$('#saveCreateButton').click(function (event) {
  $.ajax ({
    type: 'POST',
    url: 'http://localhost:54272/dvd',
    data: JSON.stringify({
      title: $('#create-title').val(),
      realeaseYear: $('#create-release-year').val(),
      director: $('#create-director').val(),
      rating: $('#create-rating').val(),
      notes: $('#create-notes').val()
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
    dataType: 'json',
    success: function(data, status) {
      $('#errorMessages').empty();
      $('#create-title').val('');
      $('#create-release-year').val('');
      $('#create-director').val('');
      $('#create-rating').val('');
      $('#create-notes').val('');
      LoadAllDVDLibrary();
    },
    error: function(data, status) {
      $('#errorMessages')
         .append($('<li>')
         .attr({class: 'list-group-item list-group-item-danger'})
         .text('Error calling web service.  Please try again later.'));
    }
  });

  $('#dvdTableDiv').show();
  $('#createFormDiv').hide();
});

});

function LoadAllDVDLibrary() {
clearDVDTable();
var contentRows = $('#DvdTable');
var row = '<tr>';
    row += '<th>Title</th>';
    row += '<th>Release Date</th>';
    row += '<th>Director</th>';
    row += '<th>Rating</th>';
    row += '<th></th>';
    row += '</tr>';

  $.ajax ({
    type:'GET',
    url:'http://localhost:54272/dvds/',
    success: function(data, status) {
      $.each(data, function (index, item) {
        var id = item.dvdId;
        var title = item.title;
        var year = item.realeaseYear;
        var director = item.director;
        var rating = item.rating;
        var editLink = '<a href=# onclick="showEditForm(' + item.dvdId + ')">Edit</a>';
        var deleteLink = '<a href=# style="color: red;" onclick="deleteDvd(' + item.dvdId + ')">Delete</a>';

        var row = '<tr>';
            row += '<td>' + title + '</td>';
            row += '<td>' + year + '</td>';
            row += '<td>' + director + '</td>';
            row += '<td>' + rating + '</td>';
            row += '<td style="text-align: center">' + editLink +' | '+ deleteLink + '</td>';
            row += '</tr>';
        contentRows.append(row);
      })
    },
    error: function() {
      $('#errorMessages')
        .append($('<li>')
        .attr({class: 'list-group-item list-group-item-danger'})
        .text('Error calling web service.  Please try again later.'));
    }
  });
}

function clearDVDTable() {
    $('#DvdTable').empty();
}

function showEditForm(dvdId) {
    // clear errorMessages
    $('#errorMessages').empty();
    // get the contact details from the server and then fill and show the
    // form on success
    $.ajax({
        type: 'GET',
        url: 'http://localhost:54272/dvd/' + dvdId,
        success: function(data, status) {
              $('#edit-dvd-Id').val(data.dvdId);
              $('#edit-title').val(data.title);
              $('#edit-release-year').val(data.realeaseYear);
              $('#edit-director').val(data.director);
              $('#edit-rating').val($.trim(data.rating));
              $('#edit-notes').val(data.notes);
              $('#saveEditButton').val(data.dvdId);
          },
          error: function() {
            $('#errorMessages')
               .append($('<li>')
               .attr({class: 'list-group-item list-group-item-danger'})
               .text('Error calling web service.  Please try again later.'));
          }
    });

  $('#dvdTableDiv').hide();
  $('#editFormDiv').show();
};

function hideCreateForm() {
  $('#errorMessages').empty();
  $('#create-title').val('');
  $('#create-release-year').val('');
  $('#create-director').val('');
  $('#create-rating').val('');
  $('#create-notes').val('');
  $('#createFormDiv').hide();
  $('#DvdTableDiv').show();
}

function hideEditForm() {
  $('#errorMessages').empty();
  $('#edit-title').val('');
  $('#edit-release-year').val('');
  $('#edit-director').val('');
  $('#edit-rating').val('');
  $('#edit-notes').val('');
  $('#editFormDiv').hide();
  $('#DvdTableDiv').show();
}

function deleteDvd(dvdId) {
   var txt;
   if (confirm("Are you sure you would like to delete this?")) {
     $.ajax({
         type: 'DELETE',
         url: 'http://localhost:54272/dvd/' + dvdId,
         success: function (status) {
           LoadAllDVDLibrary();
         }
   });
}
}
