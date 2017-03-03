console.log('in file');
const $ = require('jquery');

$('#rememberBtn').click(function(e){
console.log('in function');
  $.post('/sender');
});