function init() {
  document.getElementById('1').addEventListener('click', function () {
    document.getElementById('answer-1').classList.toggle('none')
    document.getElementById('signal-1').innerHTML = document.getElementById('signal-1').innerHTML === '+' ? '-' : '+'
  });
  document.getElementById('2').addEventListener('click', function() {
    document.getElementById('answer-2').classList.toggle('none')
    document.getElementById('signal-2').innerHTML = document.getElementById('signal-2').innerHTML === '+' ? '-' : '+'
  });
  document.getElementById('3').addEventListener('click', function() {
    document.getElementById('answer-3').classList.toggle('none')
    document.getElementById('signal-3').innerHTML = document.getElementById('signal-3').innerHTML === '+' ? '-' : '+'
  });

}

function slideDownFaq() {
  document.querySelector('#faq').scrollIntoView()
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})