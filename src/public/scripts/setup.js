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
        if(responsiveVoice.voiceSupport()) {
          responsiveVoice.speak(`${data[randi].title}`, "Deutsch Female", {rate: 0.75});
          responsiveVoice.speak(`${data[randi].text}`, "Deutsch Female", {rate: 0.75});
        }
      });
      $('#allMemories').click(function() {
        $('.memories__list').fadeToggle();
      });
    });
    socket.on('message', function(msg) {
      console.log(`Neuer Eintrag: ${msg}`)
      alert(`Neuer Eintrag: ${msg.title}`)
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



});


function success() {
  $('.messages').text('erfolgreich hinzugefügt');
}
