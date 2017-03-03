$(function () {
  if(window.location.pathname === '/consumer') {
    $.get('/memories').then( data => {
      data.forEach(memory => {
        $('.memories__list').append('<p>' + memory.title + '</p>');
      });
    });
  }
});