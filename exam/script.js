var allNames = document.getElementById("name");
var sub = document.getElementById("submit");
var ul = document.querySelector("ul");
var listNames;

function storeNames() {
  var names = allNames.value.split(",");
  listNames = names;
}

function viewList() {
  for (var i = 0; i < listNames.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = listNames[i];
    ul.appendChild(li);
  }
}
