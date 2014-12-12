var userListData = [];

$(document).ready(function(){
  populateTable();
  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
  $('#btnAddUser').on('click', addUser);
});

function populateTable(){
  var tableContent = '';
  $.getJSON('/users/userlist', function(data){
    userListData = data;
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="'+this.username+'" title="Show Details">'+this.username+'</a></td>';
      tableContent += '<td>'+this.email+'</td>';
      tableContent += '<td><a href"#" class="linkdeleteuser" rel="'+this._id+'">delete</a></td>';
      tableContent += '</tr>';
    });

    $('#userList table tbody').html(tableContent);
  });
};

function showUserInfo(event){
  event.preventDefault();
  var thisUserName = $(this).attr('rel');
  var arrayPosition = userListData.map(function(arrayItem) {return arrayItem.username;}).indexOf(thisUserName);
  var thisUserObject = userListData[arrayPosition];
  $('#userName').text(thisUserObject.username);
  $('#userEmail').text(thisUserObject.email);

//  $('#userInfoAge').text(thisUserObject.age);
//  $('#userInfoGender').text(thisUserObject.gender);
//  $('#userInfoLocation').text(thisUserObject.location);

};

function addUser(event){
  event.preventDefault();
  window.alert("adding");
  var errorCount = 0;
  $('addUser input').each(function(index,val){
    if($(this).val() === ''){errirCount++;}
  });

  if (errorCount === 0) {
    var newUser = {
      'username': $('#addUser fieldset input#inputUserName').val(),
      'email': $('#addUser fieldset input#inputUserEmail').val(),
      'fullname': $('#addUser fieldset input#inputUserFullname').val(),
      'age': $('#addUser fieldset input#inputUserAge').val(),
      'location': $('#addUser fieldset input#inputUserLocation').val(),
      'gender': $('#addUser fieldset input#inputUserGender').val()
    }
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function( response ) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addUser fieldset input').val('');

        // Update the table
        populateTable();

      }
      else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  }
  else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};