let mouseIsPressed = false;

window.addEventListener('mousedown', () => { mouseIsPressed = true });
window.addEventListener('mouseup', () => { mouseIsPressed = false });

const grid = document.querySelector('.grid-container');

const volumeSlider = document.getElementById('volume');
const storedVolume = window.localStorage.getItem('volume');

if (storedVolume !== null) {
  volumeSlider.value = storedVolume;
  updateVolumeIndicator();
}

const sounds = [];

for (let i = 0; i <=8; i++) {
  sounds.push(new Howl({
    src: [`pop${i}.mp3`]
  }));
}

volumeSlider.oninput = updateVolumeIndicator;
volumeSlider.onchange = storeVolume;
document.getElementById('volume-indicator').addEventListener('click', toggleMute);

spawnBubbles(); 

function spawnBubbles() {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  const w = grid.clientWidth;
  const h = grid.clientHeight;
  const fillRow = document.createElement('div');

  for (let col = 0; col < Math.floor(w / 48); col++) {
    const bubble = document.createElement('span');
    bubble.className = 'unpopped';
    bubble.innerHTML = '*pop*';
    fillRow.append(bubble);
  }

  for (let row = 0; row < Math.floor(h / 48); row++) {
    grid.append(fillRow.cloneNode(true));  
  }

  document.querySelectorAll('.unpopped').forEach((el) => {
    el.addEventListener('mouseover', handleInteract);
    el.addEventListener('click', handleInteract);
  })
}

function handleInteract(event) {
  if (event.type === 'mouseover' && !mouseIsPressed) return;

  const sound = sounds[Math.floor(Math.random() * sounds.length)];
  sound.rate(Math.random() * 0.8 + 1);
  sound.volume(volumeSlider.value);
  sound.play();

  event.target.className = 'popped';
  event.target.removeEventListener('click', handleInteract);
  event.target.removeEventListener('mouseover', handleInteract);
}

function updateVolumeIndicator() {
  const volume = volumeSlider.value;
  let state;
  if (volume > 0.7) {
    state = 'high';
  } else if (volume > 0.3) {
    state = 'medium';
  } else if (volume > 0) {
    state = 'low';
  } else {
    state = 'muted';
  }

  document.getElementById('volume-indicator').src = `volume-${state}.png`;
}

function storeVolume() {
  const volume = volumeSlider.value;
  window.localStorage.setItem('volume', volume)
}

function toggleMute() {
  if (volumeSlider.value != 0) {
    volumeSlider.beforeMute = volumeSlider.value;
    volumeSlider.value = 0;  
  } else {
    volumeSlider.value = volumeSlider.beforeMute;
  }
  updateVolumeIndicator();
}