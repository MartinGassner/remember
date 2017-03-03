const $ = require('jquery');

$(function () {
  $('#rememberBtn').click(function () {
    let fileString = null;
    const file = $('#fileupload')[0].files[0],
      text = $('#text').val(),
      title = $('#title').val();

    if (file && /\.(jpe?g|png|gif)$/i.test(file.name)) {
      getBase64(title, text, file, 1, 2);
    } else {
      console.log('wrong file type or empty file');
      getBase64(title, text, null, 1, 2);
    }

  });
});

function success() {
  $('.messages').text('erfolgreich hinzugefügt');
}

function getBase64(title, text, file, sender_id, consumer_id) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    saveMemory(title, text, reader.result, sender_id, consumer_id);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

function saveMemory(title, text, img, sender_id, consumer_id) {
  console.log(img);
  $.ajax({
    url: '/sender',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({title: title, text: text, img: img, sender_id: sender_id, consumer_id: consumer_id}),
    success: success
  });

}