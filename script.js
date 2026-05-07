const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const download = document.getElementById('download');
const context = canvas.getContext('2d');

// Aktifkan kamera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert("Kamera tidak bisa diakses: " + err);
  });

// Ambil foto
snap.addEventListener('click', () => {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  function applyFilter(type) {
  if (type === 'bw') {
    context.filter = 'grayscale(100%)';
  } else if (type === 'sepia') {
    context.filter = 'sepia(100%)';
  } else {
    context.filter = 'none';
  }
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
}

// Tombol filter
document.getElementById('bw').addEventListener('click', () => applyFilter('bw'));
document.getElementById('sepia').addEventListener('click', () => applyFilter('sepia'));
document.getElementById('normal').addEventListener('click', () => applyFilter('normal'));

});

  // Buat link download
  const dataURL = canvas.toDataURL('image/png');
  download.href = dataURL;
let isMirror = true; // default mirror

document.getElementById('toggleMirror').addEventListener('click', () => {
  if (isMirror) {
    video.style.transform = 'scaleX(1)'; // normal
    isMirror = false;
  } else {
    video.style.transform = 'scaleX(-1)'; // mirror
    isMirror = true;
  }
});

