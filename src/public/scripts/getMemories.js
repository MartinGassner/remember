$(function () {
  if(window.location.pathname === '/consumer') {
    $.get('/memories', function (data){
      data.forEach(function(e){
        console.log(e.title);
        $('.memories__list').append('<p>' + e.title + '</p>');

      });
    })
  }
});