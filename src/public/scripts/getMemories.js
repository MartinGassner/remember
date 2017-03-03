$(function() {

  if (window.location.pathname === '/consumer') {
    $.get('/memories').then(data => {
      data.forEach(memory => {
        let newHtml = `<div class="memory__single"></div><p>${memory.title}</p> <p>${memory.text}</p>`;
        if(memory.img) {
          newHtml += `<img src="${memory.img}" alt="">`;
        }
        newHtml += '</div>';
        $('.memories__list').append(newHtml);

      });
      $('#getRandomMemory').click(function() {
        const randi = Math.floor(Math.random() * data.length);
        let newHtml = `<div class="memory__single"></div><p>${data[randi].title}</p> <p>${data[randi].text}</p>`;
        if(data[randi].img) {
          newHtml += `<img src="${data[randi].img}" alt="">`;
        }
        newHtml += '</div>';

        $('.memory__random').html(newHtml);
      });

      $('#allMemories').click(function() {
        $('.memories__list').fadeToggle();
      });
    });
  }


});
