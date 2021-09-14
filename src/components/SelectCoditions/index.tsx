import * as React from 'react';
import {ISO, WEATHER} from "../../CONSTANTS";
import "./select-condition.css";

type Props = {
  weather: string;
  iso: string;
  changeWeather: (e: React.MouseEvent<HTMLButtonElement>) => void;
  changeISO: (e: React.MouseEvent<HTMLButtonElement>) => void;
  configuringCondition: boolean;
};

function SelectConditions({weather, iso, changeWeather, changeISO, configuringCondition}: Props) {
  return (
    <div
      className={`conditions-container conditions-container--${
        configuringCondition ? "show" : "hide"
      }`}>
      <div className="conditions-container--weather">
        <p>Weather</p>
        <div className="conditions-container--weather__buttons">
          {WEATHER.map((el) =>
            <button key={el} onClick={changeWeather} className={weather === el ? "selected" : ""}>
              {el}
            </button>)}
        </div>
      </div>
      <div className="conditions-container--iso">
      <p>ISO</p>
        <div className="conditions-container--iso__buttons">
          {ISO.map((el) =>
            <button key={el} onClick={changeISO} className={iso === el ? "selected" : ""}>
              {el}
            </button>)}
        </div>
      </div>
    </div>
  );
}

export default SelectConditions;
