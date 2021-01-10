function parseJson() {
    var jsonStringObject = '{"name": "John Doe", "age": 15, "city": "Montreal"}';
    var jsonObject = JSON.parse(jsonStringObject);
    console.log("jsonObject :>", jsonObject);
}

$( document ).ready(function() {
    parseJson();
});
