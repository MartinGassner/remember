const io = require('socket.io-client'),
  serverUrl = ('http://localhost:8080'),
  connection = io.connect(serverUrl),
  socket = io(),
  $ = require('jquery');

$(function () {
  let screenReaderOn = false;
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

      $('#toggleScreenReader').click(function (){
        $('#toggleScreenReader').toggleClass('active');
        screenReaderOn = (screenReaderOn) ? false : true;
      });
      // $('#getRandomMemory').click(function () {
      //   const randi = Math.floor(Math.random() * data.length);
      //   let newHtml = `<div class="memory__single"><p>${data[randi].title}</p> <p>${data[randi].text}</p>`;
      //   if (data[randi].img) {
      //     newHtml += `<img src="${data[randi].img}" alt="">`;
      //   }
      //   newHtml += '</div>';

      //   $('.memory__random').html(newHtml);
      // });
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

  function screenReading(_this) {
    if (responsiveVoice.voiceSupport() && screenReaderOn) {
      responsiveVoice.speak(_this.find($('.text__wrapper p:first-child')).text(), "Deutsch Female", {rate: 0.75});
      // responsiveVoice.speak(_this.find($('.text__wrapper p:nth-child(2)')).text(), "Deutsch Female", {rate: 0.75});
    }
  }

  // slidehsow options
  setInterval(function() {
    $('#slideshow > div:first')
      .fadeOut(1000)
      .next()
      .fadeIn(1000, function(){
        const _this = $(this);
        screenReading(_this);
      })
      .end()
      .appendTo('#slideshow');
  },  5000);


});


function success() {
  $('.messages').text('erfolgreich hinzugefügt');
}
