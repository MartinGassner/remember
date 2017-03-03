const io = require('socket.io-client'),
  serverUrl = ('http://localhost:8080'),
  connection = io.connect(serverUrl),
  socket = io(),
  $ = require('jquery');

$(function () {

  if (window.location.pathname === '/consumer') {
    $.get('/memories').then(data => {
      data.forEach(memory => {
        let newHtml = `<div class="memory__single"></div><p>${memory.title}</p> <p>${memory.text}</p>`;
        if (memory.img) {
          newHtml += `<img src="${memory.img}" alt="">`;
        }
        newHtml += '</div>';
        $('.memories__list').append(newHtml);

      });
      $('#getRandomMemory').click(function () {
        const randi = Math.floor(Math.random() * data.length);
        let newHtml = `<div class="memory__single"></div><p>${data[randi].title}</p> <p>${data[randi].text}</p>`;
        if (data[randi].img) {
          newHtml += `<img src="${data[randi].img}" alt="">`;
        }
        newHtml += '</div>';

        $('.memory__random').html(newHtml);
        if (responsiveVoice.voiceSupport()) {
          responsiveVoice.speak(`${data[randi].title}`, "Deutsch Female", {rate: 0.75});
          responsiveVoice.speak(`${data[randi].text}`, "Deutsch Female", {rate: 0.75});
        }
      });
      $('#allMemories').click(function () {
        $('.memories__list').fadeToggle();
      });
    });
    socket.on('message', function (msg) {
      console.log(`Neuer Eintrag: ${msg}`)
      alert(`Neuer Eintrag: ${msg.title}`)
    });
  }
  if (window.location.pathname === '/sender') {

    $('#rememberBtn').click(function (e) {
      const text = $('#text').val(),
        title = $('#title').val();
      $.ajax({
        url: '/sender',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({title: title, text: text}),
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
