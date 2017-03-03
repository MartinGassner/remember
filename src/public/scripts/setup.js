const io = require('socket.io-client'),
  serverUrl = ('http://localhost:8080'),
  connection = io.connect(serverUrl),
  socket = io(),
  $ = require('jquery');

$(function () {

  if (window.location.pathname === '/consumer') {
    $.get('/memories').then(data => {
      data.forEach(memory => {
        let cssClss = 'text';
        if (memory.img) {cssClss = 'image'}
        let newHtml = `<div class="memory__single ${cssClss}"><div class="text__wrapper"><p>${memory.title}</p> <p>${memory.text}</p></div>`;
        if (memory.img) {
          newHtml += `<img src="${memory.img}" alt="">`;
        }
        newHtml += '</div>';
        $('.memories__list').append(newHtml);

      });
      $('#getRandomMemory').click(function () {
        const randi = Math.floor(Math.random() * data.length);
        let newHtml = `<div class="memory__single"><p>${data[randi].title}</p> <p>${data[randi].text}</p>`;
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
  // slidehsow options
  setInterval(function() {
    $('#slideshow > div:first')
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('#slideshow');
  },  5000);


});


function success() {
  $('.messages').text('erfolgreich hinzugefügt');
}
