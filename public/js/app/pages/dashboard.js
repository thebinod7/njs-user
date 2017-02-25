$(document).ready(function() {
   var userData = JSON.parse(localStorage.getItem('userSession'));
   if(userData){
       $('#user_fname').html(userData.user.firstName);
      $('#userFullName').html(userData.user.firstName + ' ' + userData.user.lastName);
       $('#email').val(userData.user.email);
       $('#fname').val(userData.user.firstName);
       $('#lname').val(userData.user.lastName);
       $('#phone').html(userData.user.phone);
   }
   else {
      location.replace('/login');
   }
//   console.log(JSON.parse(userData).user.firstName);
});