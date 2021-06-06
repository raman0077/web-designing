$(document).ready(function() {
    registerUser();
});

function registerUser(){
    $("#register").click(function(event){
        event.preventDefault();
        var username = $("#floatingUsername").val();
        var password = $("#floatingPassword").val();
        $("#floatingUsername").val('');
        $("#floatingPassword").val('');
        var url = "http://localhost:5555/register/";
        var data = {"username": username, "password": password};
        $.post({url: url, data: data, success: function(data){
            if(data.result == true){
                alert("Registered Success!!!!!");
            }else{
                alert("Register Failed!!!!!");
            }
          }});
    });
}