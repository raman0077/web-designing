$(document).ready(function() {
    logout();
});

function logout(){
    $("#logout").click(function(){
        location.href="index.html";
    });
}