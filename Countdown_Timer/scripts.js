let countdown;
const endTime = document.querySelector('.display__end-time');
const timeDisplay = document.querySelector('.display__time-left');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear existing timers
    clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds* 1000;     // now will be milliseconds
  DisplayTimeLeft(seconds);
  displayEndTime(then);

   countdown = setInterval(()=> {
     const timeLeft = Math.round((then - Date.now()) / 1000);
     if (timeLeft <= 0) {
        clearInterval(countdown);
        return;  
     }
     DisplayTimeLeft(timeLeft);
  }, 1000);
}

function DisplayTimeLeft(seconds){
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes}: ${remainingSeconds < 10 ? '0' : '' }${remainingSeconds}`;
    timeDisplay.textContent = display;
    document.title = display;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    console.log(seconds);
    timer(seconds);
}

function displayEndTime(timestamp){

    const end = new Date(timestamp);
    const hours = end.getHours();
    const mins = end.getMinutes();
    const adjustTime = hours > 12 ? (hours -12) : hours;
    endTime.textContent = `Be back at ${adjustTime} : ${mins < 10 ? '0':''}${mins}`;
}

buttons.forEach(element => { element.addEventListener('click', startTimer)});
document.customForm.addEventListener('submit',function(event) {
    event.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60 );
    this.reset();
});
