const io = require('socket.io-client'),
  serverUrl = ('http://localhost:8080'),
  connection = io.connect(serverUrl),
  socket = io(),
  $ = require('jquery');



$(function() {

  if (window.location.pathname === '/consumer') {
    $.get('/memories').then(data => {
      data.forEach(memory => {
        $('.memories__list').append('<p>' + memory.title + '</p>');
      });
      $('#getRandomMemory').click(function() {
        const randi = Math.floor(Math.random() * data.length);
        $('.memory__random').html(`<p> ${data[randi].title} </p>`);
      });

      $('#allMemories').click(function() {
        $('.memories__list').fadeToggle();
      });
    });
  }
  if (window.location.pathname === '/sender') {

    $('#rememberBtn').click(function(e) {
      var text = $('#text').val();
      var title = $('#title').val();
      $.ajax({
        url: '/sender',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ title: title, text: text }),
        success: success
      });
      socket.emit('message', {
        title: title,
        text: text
      });
    });

  }
  socket.on('message', function(msg) {
    $('#notification').html(`<p>${msg.title}</p>`)
    $('#notification').addClass('show');
    $('#notification').removeClass('hide');
    setTimeout(function() {
      $('#notification').addClass('hide');
      $('#notification').removeClass('show');
    }, 3000)
  });


});


function success() {
  $('.messages').text('erfolgreich hinzugefügt');
}
