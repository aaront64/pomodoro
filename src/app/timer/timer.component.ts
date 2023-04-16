import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimerComponent implements OnInit {
  timeLeft: number = 0;
  timerInterval: any;
  isRunning: boolean = false;
  minutes: number = 25; // set work time to 25 minutes
  seconds: number = 0; // initialize seconds to 0 for work time
  sessions: number = 1;
  remainingTime: number = 0;
  timerState: String = 'Study';

  startTimer() {
    let totalSeconds = (this.minutes * 60) + this.seconds; // convert minutes to seconds
    // Use time in seconds if available, else use default value of 0
    this.timeLeft = this.remainingTime || totalSeconds || 0;
    this.isRunning = true;
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopTimer();
        // Switch to break time of 5 minutes
        this.minutes = 5;
        this.seconds = 0;
        this.timerState = 'Break';
        this.startTimer();
      }
    }, 1000); // 1 second interval (ms)
  }

  stopTimer() {
    this.isRunning = false; // stops the timer
    clearInterval(this.timerInterval); // reset the interval
    this.remainingTime = this.timeLeft;
    if (this.timerState === 'Study') {
      this.timerState = 'Study';
    } else if (this.timerState === 'Break') {
      this.timerState = 'Break';
    }
  }

  resetTimer() {
    this.stopTimer();
    this.minutes = 25; // reset work time to 25 minutes
    this.seconds = 0; // reset seconds to 0 for work time
    this.timeLeft = 0; // reset time left to 0
    this.remainingTime = 0; // reset remaining time to 0
    if (this.timerState === 'Study') {
      this.timerState = 'Study';
    } else if (this.timerState === 'Break') {
      this.timerState = 'Break';
    }
  }

  startRepeatingTimer(){
    for(let i = 0; i < this.sessions; i++){
      setTimeout(() => {
        this.startTimer();
      }, i * (25 * 60 * 1000 + 5 * 60 * 1000));
    }
  }

  formatTime(time: number): string {
    // Convert remaining time from seconds to hours, minutes, and seconds
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    // Format the time string
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }
  ngOnInit() {
    this.timerState = 'Study';
  }
}
