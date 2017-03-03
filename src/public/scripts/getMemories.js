$(function () {
  let memories = null;

  if (window.location.pathname === '/consumer') {
    $.get('/memories').then(data => {
      memories = data;
      data.forEach(memory => {
        $('.memories__list').append('<p>' + memory.title + '</p>');
      });

    });

    $('#getRandomMemory').click(function () {
      const randi = Math.floor(Math.random() * memories.length);
      $('.memory__random').html(`<p> ${memories[randi].title} </p>`);
    });

    $('#allMemories').click(function () {
      $('.memories__list').fadeToggle();
    });
  }


});