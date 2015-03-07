import './detect';

import filedrop, { readAsImage } from './filedrop';

const dropzone = document.getElementById('dropzone');

const fontName = 'Lato';

const canvas = document.createElement('canvas');
const context = canvas.getContext("2d");
const title = document.getElementById('title');
const titleSize = document.getElementById('title-size');
const subtitle = document.getElementById('subtitle');

title.value = window.localStorage.title || '';
titleSize.value = window.localStorage.titleSize || '';
subtitle.value = window.localStorage.subtitle || '';

const logo = new Image();

logo.src = 'images/logo_w.png';

let image;

dropzone.appendChild(canvas);

for (let n of [ title, titleSize, subtitle ]) {
  for (let e of ['change', 'keyup']) {
    n.addEventListener(e, update);
  }
}


filedrop(dropzone, files => {
  const file = files.item(0);

  if (file) readAsImage(file, setImage)
});

function setImage(img) {
  const width = Math.min(1200, Math.max(800, img.width));
  const height = Math.round((width / img.width) * img.height)

  canvas.width = width;
  canvas.height = height;

  canvas.style.marginRight = -(width/2) + 'px'
  canvas.style.marginBottom = -(height/2) + 'px'

  dropzone.classList.add('done');

  image = img;

  update();
}

function update() {
  clear();

  context.imageSmoothingEnabled = true;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.0)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
  context.fillStyle = gradient;
  context.fillRect(0 , 0 , canvas.width, canvas.height);

  context.drawImage(logo, canvas.width - 150, canvas.height - 125, 100, 75);

  const titleText = title.value.trim();
  const titleSizeValue = titleSize.value.trim();
  const subtitleText = subtitle.value.trim();

  window.localStorage.title = titleText;
  window.localStorage.titleSize = titleSizeValue;
  window.localStorage.subtitle = subtitleText;

  const titleShift = subtitleText ? 50 : 0;

  context.font = '100 ' + titleSizeValue + ' ' + fontName;
  context.fillStyle = 'white';
  context.fillText(title.value, 50, canvas.height - (50 + titleShift));

  if (subtitleText) {
    context.font = '100 40px ' + fontName;
    context.fillStyle = 'rgba(255,255,255,0.6)';
    context.fillText(subtitle.value, 53, canvas.height - 50)
  }
}

function clear() {
  context.clearRect(0 , 0 , canvas.width, canvas.height);
}
