const colorName = document.getElementById('colorName');
const btn = document.getElementById('btn');
const wrapper = document.querySelector('.wrapper');
const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
let bgColor = '';
let list = [];

function randomColor() {
  for (let i = 0; i < 6; i++) {
    bgColor += hex[Math.floor(Math.random() * hex.length)];
  };
  wrapper.style.backgroundColor = '#' + bgColor;
  return bgColor;
}

function getName(bgcolor, loader) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', `https://www.thecolorapi.com/id?hex=${bgColor}`, true );

  xhr.onprogress = function () {
    console.log('READYSTATE', this.readyState);
  }

  xhr.onload = function() {
    const response = JSON.parse(this.responseText);
    list.push(response.name.value.split(''));
    setTimeout(() => {
      colorName.classList.add('animate');
      colorName.style.color = response.contrast.value;
      colorName.textContent = response.name.value;
    },500);
  }
  xhr.send();
}


btn.addEventListener('click', function(e) {
  colorName.textContent = '';
  colorName.classList.remove('animate');
  randomColor();
  getName();
  bgColor = '';
  list = [];
});
