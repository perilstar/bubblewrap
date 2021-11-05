let mouseIsPressed = false;

//       <span class="unpopped">*pop*</span>
const grid = document.querySelector('.grid-container');
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

window.addEventListener('mousedown', () => { mouseIsPressed = true });
window.addEventListener('mouseup', () => { mouseIsPressed = false });

document.querySelectorAll('.unpopped').forEach((el) => {
  el.addEventListener('mouseover', handleMouseOver);
  el.addEventListener('click', handleMouseOver);
})

function handleMouseOver(event) {
  if (event.type === 'mouseover' && !mouseIsPressed) return;
  const audio = new Audio('pop.mp3');
  audio.play();
  event.target.className = 'popped';
  event.target.removeEventListener('click', handleMouseOver);
  event.target.removeEventListener('mouseover', handleMouseOver);
}