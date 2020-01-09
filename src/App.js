import React, { Component } from "react";
import "./App.css";
import soundFile from "./sounds/Hypnotic Clock Sound.52d08540.m4a";

class App extends Component {
  constructor() {
    super();
    this.state = {
      year: 0,
      month: 0,
      monthDays: 0,
      day: 0,
      week: 0,
      hour: 0,
      Minute: 0,
      second: 0,
      playing: false
    };
  }

  componentDidMount() {
    setInterval(() => {
      let time = new Date();

      this.setState({
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        monthDays: new Date(this.state.year, this.state.month, 0).getDate(),
        day: time.getDate(),
        week: time.getDay(),
        hour: time.getHours(),
        Minute: time.getMinutes(),
        second: time.getSeconds(),
        playing: false
      });
    }, 1000);
  }

  // array = length =>
  //   Array.from({ length })
  //     .map((v, k) => k)
  //     .map(x => x + 1);

  array = length => Array.from({ length }, (v, k) => k + 1);

  playAudio() {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    const text = document.getElementsByClassName("text")[0];
    let isPlaying =
      audioEl.currentTime > 0 &&
      !audioEl.paused &&
      !audioEl.ended &&
      audioEl.readyState > 2;
    if (audioEl.paused) {
      audioEl.play();
      audioEl.volume = 0.3;
      text.innerHTML = "tick";
    } else {
      audioEl.pause();
      text.innerHTML = "no tick";
    }

    if (!isPlaying) {
      audioEl.play();
    }
  }

  render() {
    return (
      <div className="App">
        <button className="tick" onClick={this.playAudio}>
          <span className="text">tick</span>
        </button>

        <audio className="audio-element">
          <source src={soundFile}></source>
        </audio>
        <header className="App-header">
          <div className="msg">
            <div className="year">
              <span>{this.state.year}</span>
            </div>
          </div>

          <div className="box">
            {this.array(12).map((x, index) => {
              const theMonth = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Spt",
                "Oct",
                "Nov",
                "Dec"
              ];
              return (
                <div
                  key={index}
                  className={`month item ${
                    index === this.state.month - 1 ? "active" : ""
                  }`}
                  style={{
                    transform: `rotate(${index * 31 -
                      31 * (this.state.month - 1)}deg)`
                  }}
                >
                  {`${theMonth[x - 1]}`}
                </div>
              );
            })}

            {this.array(this.state.monthDays).map((x, index) => {
              return (
                <div
                  key={index}
                  className={`day item ${
                    index === this.state.day - 1 ? "active" : ""
                  }`}
                  style={{
                    transform: `rotate(${index * 11.6 -
                      11.6 * (this.state.day - 1)}deg)`
                  }}
                >
                  {`${x}.`}
                </div>
              );
            })}

            {this.array(7).map((x, index) => {
              const dayName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

              return (
                <div
                  key={index}
                  className={`week item ${
                    index === this.state.week - 1 ? "active" : ""
                  }`}
                  style={{
                    transform: `rotate(${index * (180 / 7) -
                      (180 / 7) * (this.state.week - 1)}deg)`
                  }}
                >
                  {` ${dayName[x - 1]}`}
                </div>
              );
            })}

            {this.array(24).map((x, index) => {
              return (
                <div
                  key={index}
                  className={`hour item ${
                    index === this.state.hour - 1 ? "active" : ""
                  }`}
                  style={{
                    transform: `rotate(${index * (360 / 24) -
                      (360 / 24) * (this.state.hour - 1)}deg)`
                  }}
                >
                  {`${x} hr`}
                </div>
              );
            })}

            {this.array(60).map((x, index) => {
              return (
                <div
                  key={index}
                  className={`Minute item ${
                    index === this.state.Minute - 1 ? "active" : ""
                  }`}
                  style={{
                    transform: `rotate(${index * (360 / 60) -
                      (360 / 60) * (this.state.Minute - 1)}deg)`
                  }}
                >
                  {`${x} min`}
                </div>
              );
            })}

            {this.array(60).map((x, index) => {
              return (
                <div
                  key={index}
                  className={`second item ${
                    index === this.state.second - 1 ? "active" : ""
                  }`}
                  style={{
                    transform: `rotate(${index * (360 / 60) -
                      (360 / 60) * (this.state.second - 1)}deg)`
                  }}
                >
                  {`${x}s`}
                </div>
              );
            })}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
