import React from "react";
import { APERTURE, EXPOSITION, ISO, WEATHER } from "../../CONSTANTS";
import { calcAperture, calcExpo } from "./calculations";
import "./calculator.css";
import 'keen-slider/keen-slider.min.css'
import WheelSliders from "../WheelSliders";
import { TEvents } from "keen-slider";
import Camera from "../Camera";
import SelectConditions from "../SelectCoditions";

function Calculator() {
  const [showConditions, setShowConditions] = React.useState<boolean>(true);
  const [iso, setISO] = React.useState<string>("none");
  const [weather, setWeather] = React.useState<string>("none");
  const [availableEx, setAvailableEx] = React.useState<string[]>([]);
  const [availableAp, setAvailableAp] = React.useState<string[]>([]);
  const [aperture, setAperture] = React.useState<string>("none");
  const [exposition, setExposition] = React.useState<string>("none");

  const changeWeather = (e: React.MouseEvent<HTMLButtonElement>) =>
    setWeather(e.currentTarget.textContent as string);
  const changeISO = (e: React.MouseEvent<HTMLButtonElement>) =>
    setISO(e.currentTarget.textContent as string);

  React.useEffect(() => {
    if (weather === "none" || iso === "none") {
      return;
    }
    const weatherIndex = WEATHER.findIndex((el) => el === weather);
    const newAp = calcAperture(weatherIndex);
    const isoIndex = ISO.findIndex((el) => el === iso);
    const newEx = calcExpo(isoIndex);
    setExposition(newEx);
    setAperture(newAp);

    const exI = EXPOSITION.findIndex((el) => el === newEx);
    const apI = APERTURE.findIndex((el) => el === newAp);
    const exArr: string[] = [];
    const apArr: string[] = [];
    for (let i = exI; i > 0; i--) {
      if (!APERTURE[apI + (exI - i)]) {
        break;
      }
      exArr.push(EXPOSITION[i]);
      apArr.push(APERTURE[apI + (exI - i)]);
    }
    for (let i = exI + 1; i < EXPOSITION.length; i++) {
      if (!APERTURE[apI + (exI - i)]) {
        break;
      }
      exArr.push(EXPOSITION[i]);
      apArr.push(APERTURE[apI + (exI - i)]);
    }
    const sortedEx =
      exArr.sort(
        (a, b) => {
          const [, aAfter] = a.split("/");
          const [, bAfter] = b.split("/");
          return parseInt(aAfter, 10) - parseInt(bAfter, 10)
        }
      ).reverse();
    const sortedAp = apArr.sort((a, b) => Number(a) - Number(b))
    setAvailableEx(sortedEx as string[])
    setAvailableAp(sortedAp as string[])
  }, [iso, weather])

  /* The following block of code is REQUIRED. It prevents keen slider from breaking when user changes conditions */
  const [cooldown, setCooldown] = React.useState(false);
  React.useEffect(() => {
    setCooldown(true);
    setTimeout(() => setCooldown(false))
  }, [availableAp, availableEx, weather, iso])

  React.useEffect(() => {
    function toggleScrollWheel(e: WheelEvent) {
      if (e.deltaY < 0) {
        setShowConditions(true)
      }
      if (e.deltaY > 0 && (weather !== "none" && iso !== "none")) {
        setShowConditions(false)
      }
    }
    document.addEventListener("wheel", toggleScrollWheel);
    return () => document.removeEventListener("wheel", toggleScrollWheel);
  }, [weather, iso])

  React.useEffect(() => {
    function toggleConditionKey (e: KeyboardEvent) {
      if (e.key === "ArrowUp") {
        setShowConditions(true);
      }
      if (e.key === "ArrowDown" && (weather !== "none" && iso !== "none")) {
        setShowConditions(false);
      }
    }
    document.addEventListener("keydown", toggleConditionKey)
    return () => document.removeEventListener("keydown", toggleConditionKey)
  }, [weather, iso])

  function handleChange(this: TEvents) {
    this.slideChanged = (e) => {
      const slide = e.details().relativeSlide
      setAperture(
        APERTURE[APERTURE.findIndex((ap) => ap === availableAp[slide])]
      )
      setExposition(
        EXPOSITION[EXPOSITION.findIndex((ex) => ex === availableEx[slide])]
      )
    };
  }

  React.useEffect(() => {
    let ts: number;
    function logStart(e: TouchEvent){
      ts = e.targetTouches[0].clientY;
      setTimeout(() => ts = -1, 250);
    }
    document.addEventListener("touchstart", logStart)
    function logEnd(e: TouchEvent) {
      const te = e.changedTouches[0].clientY;
      if (weather === "none" && iso === "none") {
        return;
      }
      if (ts === -1) {
        return;
      }
      if (ts > te + 50) {
        setShowConditions(false);
        console.log("swipe down");
      } else if (ts < te - 50) {
        setShowConditions(true);
        console.log("swipe up");
      }
      ts = -1;
    }
    document.addEventListener("touchend", logEnd)
    return () => {
      document.removeEventListener("touchstart", logStart)
      document.removeEventListener("touchstart", logEnd)
    };
  }, [weather, iso])

  const memoSlider = React.useMemo(() =>
    <WheelSliders
      availableAp={availableAp}
      availableEx={availableEx}
      defaultValue={aperture}
      fn={handleChange}
      configuringCondition={showConditions}
    />, [weather, iso, showConditions])

  return (
    <div className={`calculator`}>
      <SelectConditions
        weather={weather}
        iso={iso}
        configuringCondition={showConditions}
        changeWeather={changeWeather}
        changeISO={changeISO}
      />
      <button
        className={`calculator--controls__${!showConditions ? "show" : "hide"}`}
        onClick={() => setShowConditions(true)}
      >
        <span className="calculator--controls__top-arrow" />
        change conditions
      </button>
      <button
        className={`calculator--controls__${
          showConditions && (weather !== "none" && iso !== "none") ? "show" : "hide"
        }`}
        onClick={() => setShowConditions(false)}
      >
        <span className="calculator--controls__bot-arrow" />
        show options
      </button>
      <Camera
        aperture={aperture}
        exposition={exposition}
        configuringCondition={showConditions}
      />
      {
        (!cooldown && (weather !== "none" && iso !== "none")) &&
        memoSlider
      }
    </div>
  );
}

export default Calculator;
