import React, { useEffect, useState } from "react";

function TimerCard() {
  const [intialValue, setIntialValue] = useState(50);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(intialValue);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("pomodoro");

  function onClickInput(event) {
    const clickId = event.target.id;
    let newInitialValue;
    if (clickId === "short") {
      newInitialValue = 10;
      setMode("short");
    } else if (clickId === "long") {
      newInitialValue = 15;
      setMode("long");
    } else {
      newInitialValue = 50;
      setMode("pomodoro");
    }

    setIntialValue(newInitialValue);
    setMinutes(newInitialValue);
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            clearInterval(interval);
          } else {
            setMinutes((minutes) => minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((seconds) => seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);
  return (
    <div className="App">
      <div className="timer">
        <div className="control">
          <form className="controls">
            <input type="radio" id="pomo" name="mode" onClick={onClickInput} />
            <label htmlFor="pomo" className="controls__button">
              Pomodoro
            </label>
            <input type="radio" id="short" name="mode" onClick={onClickInput} />
            <label htmlFor="short" className="controls__button">
              Short Break
            </label>
            <input type="radio" id="long" name="mode" onClick={onClickInput} />
            <label htmlFor="long" className="controls__button">
              Long Break
            </label>
          </form>
        </div>

        <div className={`timer-box ${mode}`}>
          <div className="time">
            <h1>
              {minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}
            </h1>
            <div className="row">
              <button onClick={() => setIsActive(!isActive)}>
                {isActive ? "Pause" : "Start"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TimerCard;
