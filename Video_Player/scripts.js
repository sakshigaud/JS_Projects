const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const range = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

function togglePlay(){
    if(video.paused)
        video.play();
    else
        video.pause();
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){

    video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange(){
    console.log(this.value);
    video[this.name] = this.value;    
}
function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progress.style.flexBasis = `${percent}%`
}

function scrub(event){
   const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime;
}
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
skipButtons.forEach(button => button.addEventListener('click',skip));

function updateFullScreen(){
    const icon = document.exitFullscreen ? '🡦' : '🡤';
    fullscreen.textContent = icon;
}
function fullScreen(){
    player.requestFullscreen();
    if (document.webkitExitFullscreen)              // for Chrome & Safari
     document.webkitExitFullscreen();
 
}

range.forEach(range => range.addEventListener('change',updateRange));
range.forEach(range => range.addEventListener('mousemove',updateRange));
video.addEventListener('timeupdate',handleProgress);
progress.addEventListener('click', scrub);

fullscreen.addEventListener('click',fullScreen);
fullscreen.addEventListener('click',updateFullScreen);

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
