import * as React from 'react';
import { useKeenSlider } from "keen-slider/react";
import "./carousel.css";

type Props = {
  defaultValue: string;
  availableAp: string[];
  availableEx: string[];
  fn: () => void;
  configuringCondition: boolean;
};

function WheelSliders({availableAp, availableEx, defaultValue, fn, configuringCondition}: Props) {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1.4,
    mode: "snap",
    duration: 500,
    centered: true,
    loop: true,
    initial: availableAp.findIndex((ap) => ap === defaultValue),
    slideChanged: fn,
  });
  React.useEffect(() => {
    if (slider === null) {
      return;
    }
    const moveLeft = () => slider.moveToSlide(slider.details().relativeSlide - 1, 500);
    const moveRight = () => slider.moveToSlide(slider.details().relativeSlide + 1, 500);
    const strategies: {
      [key: string]: () => void;
    } = {
      ArrowLeft: moveLeft,
      "-": moveLeft,

      ArrowRight: moveRight,
      "+": moveRight,
      "=": moveRight,
    }
    const changeSlide = (e: KeyboardEvent): void => {
      if (strategies[e.key]) {
        strategies[e.key]();
      }
    }
    if (!configuringCondition) {
      document.addEventListener("keydown", changeSlide);
    }
    return () => document.removeEventListener("keydown", changeSlide);
  }, [slider, configuringCondition])
  return (
    <div className={`carousel-container carousel-${configuringCondition ? "hide" : "show"}`}>
      <div ref={sliderRef} className="keen-slider slider-container">
        {availableAp.map((el, i) =>
          <div key={el} className="keen-slider__slide number-slide">
            <p>f<span>/{el}</span></p>
            <p><span>{availableEx[i]}</span>s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WheelSliders;
