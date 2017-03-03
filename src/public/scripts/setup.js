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

    $('#rememberBtn').click(function () {
      const file = $('#fileupload')[0].files[0],
        text = $('#text').val(),
        title = $('#title').val(),
        category = $('input[name=category]:checked').val();
      console.log(category);

      if (file && /\.(jpe?g|png|gif)$/i.test(file.name)) {
        getBase64(title, text, file, category, 1, 2);
      } else {
        console.log('wrong file type or empty file');
        saveMemory(title, text, null, category, 1, 2);
      }
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

function getBase64(title, text, file, category, sender_id, consumer_id) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    saveMemory(title, text, reader.result, category, sender_id, consumer_id);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

function saveMemory(title, text, img, category, sender_id, consumer_id) {

  $.ajax({
    url: '/sender',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      title: title,
      text: text,
      img: img,
      category: category,
      sender_id: sender_id,
      consumer_id: consumer_id
    }),
    success: success
  });

}