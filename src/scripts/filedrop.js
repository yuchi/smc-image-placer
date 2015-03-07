export default function filedrop(dropzone, callback) {

  dropzone.addEventListener('dragover', event => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    dropzone.classList.add('dropping');
  }, false);

  dropzone.addEventListener('dragleave', event => {
    event.stopPropagation();
    event.preventDefault();
    dropzone.classList.remove('dropping');
  }, false);

  dropzone.addEventListener('drop', event => {
    event.stopPropagation();
    event.preventDefault();
    dropzone.classList.remove('dropping');

    callback(event.dataTransfer.files, event);
  }, false);

}

export function readAsImage(file, cb) {
  const img = new Image();
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = ({ target: { result }}) => {
    img.src = result;
    img.onload = () => cb(img);
  };
}
