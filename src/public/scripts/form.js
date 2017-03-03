$(function () {
  $('#rememberBtn').click(function (e) {

    var text = $('#text').val();
    var title = $('#title').val();
    $.ajax({
      url: '/sender',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({title: title, text: text}),
      success: success
    });
  });
});

function success(){
  $('.messages').text('erfolgreich hinzugefügt');
}
