import React, { useEffect, useState } from "react";

import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

const THEMES = {
  DARK_THEME: "theme--dark",
  LIGHT_THEME: "theme--light",
};

const THEMES_TOGGLE_BUTTON_NAMES = {
  DARK_THEME: "Light theme",
  LIGHT_THEME: "Dark theme",
};

export default function Timer() {
  let [endDate, setEndDate] = useState(null);
  let [daysLeft, setDaysLeft] = useState(0);
  let [hoursLeft, setHoursLeft] = useState(0);
  let [minutesLeft, setMinutesLeft] = useState(0);
  let [secondsLeft, setSecondsLeft] = useState(0);
  let [timerId, setTimerId] = useState("");
  let [themeBtnName, setThemeBtnName] = useState(
    THEMES_TOGGLE_BUTTON_NAMES.DARK_THEME
  );
  let [currentTheme, setCurrentTheme] = useState(THEMES.DARK_THEME);
  let [finalText, setFinalText] = useState("");

  useEffect(() => {
    document.title = "Simple timer";

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const htmlClassListRef = document.querySelector("html").classList;
    if (currentTheme === THEMES.DARK_THEME) {
      setThemeBtnName(THEMES_TOGGLE_BUTTON_NAMES.DARK_THEME);
      htmlClassListRef.add(THEMES.DARK_THEME);
      htmlClassListRef.remove(THEMES.LIGHT_THEME);
    } else {
      setThemeBtnName(THEMES_TOGGLE_BUTTON_NAMES.LIGHT_THEME);
      htmlClassListRef.add(THEMES.LIGHT_THEME);
      htmlClassListRef.remove(THEMES.DARK_THEME);
    }
  }, [currentTheme]);

  const countdown = () => {
    const dist = endDate - Date.now();

    if (dist <= 0 && timerId) {
      clearInterval(timerId);
      setFinalText("The End");
      return;
    }
    const tmp = dist / 1000;
    let days = Math.floor(tmp / 60 / 60 / 24);
    let hours = Math.floor((tmp / 60 / 60) % 24);
    let minutes = Math.floor((tmp / 60) % 60);
    let seconds = Math.floor(tmp % 60);

    setDaysLeft(days < 10 ? "0" + days : days);
    setHoursLeft(hours < 10 ? "0" + hours : hours);
    setMinutesLeft(minutes < 10 ? "0" + minutes : minutes);
    setSecondsLeft(seconds < 10 ? "0" + seconds : seconds);
  };

  // for calendar
  const yesterday = moment().subtract(1, "day");
  const valid = (current) => {
    return current.isAfter(yesterday);
  };
  const onCalChange = (value) => {
    setEndDate(new Date(value._d));
  };
  const onCalClose = (value) => {
    setEndDate(new Date(value._d));
  };

  const startCountdown = () => {
    if (timerId) {
      clearInterval(timerId);
    }
    setFinalText("");
    setTimerId(setInterval(countdown, 1000));
  };

  const toggleTheme = () => {
    setCurrentTheme(
      currentTheme === THEMES.DARK_THEME
        ? THEMES.LIGHT_THEME
        : THEMES.DARK_THEME
    );
  };

  return (
    <div className="main-container">
      <p className="header">Timer</p>

      <div className="theme-button">
        <button className="theme-button__toggle" onClick={toggleTheme}>
          {themeBtnName}
        </button>
      </div>

      <div className="select">
        <p className="select-text">Choose date and time for timer:</p>
        <Datetime
          onChange={onCalChange}
          onClose={onCalClose}
          isValidDate={valid}
        />
        <button type="button" className="select-btn" onClick={startCountdown}>
          Start timer
        </button>
      </div>

      <hr />

      <div className="display">
        <div className="wrap" aria-live="polite" aria-atomic="true">
          {endDate && (
            <p className="timer-info">
              Till the {endDate.toLocaleString()} left:
            </p>
          )}

          <div className="timer">
            <div className="field">
              <div className="field__label">Days</div>
              <div className="field__value">
                <span className="field__value--value">{daysLeft}</span>
              </div>
            </div>

            <div className="field">
              <div className="field__label">Hours</div>
              <div className="field__value">
                <span className="field__value--value">{hoursLeft}</span>
              </div>
            </div>

            <div className="field">
              <div className="field__label">Minutes</div>
              <div className="field__value">
                <span className="field__value--value">{minutesLeft}</span>
              </div>
            </div>

            <div className="field">
              <div className="field__label">Seconds</div>
              <div className="field__value">
                <span className="field__value--value">{secondsLeft}</span>
              </div>
            </div>
          </div>
          <p className="final">{finalText}</p>
        </div>
      </div>
    </div>
  );
}
