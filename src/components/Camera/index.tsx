import * as React from 'react';
import "./aperture.css";
import "./camera.css";

type Props = {
  aperture: string;
  exposition: string;
  configuringCondition: boolean
};

function Camera({ aperture, exposition, configuringCondition }: Props) {
  const CSSAperture = aperture?.replace(".", "_")
  const CSSExposure = exposition?.replace("/", "_");
  return (
    <div className={`camera camera--move-${configuringCondition ? "bot" : "top"}`}>
      <div className="camera--center" />
      <div className="camera--knob" />
      <div className="camera--holder" />
      <div className="camera--exposure-radio">
        <div className="camera--exposure-marks">
          <div className={`camera--exposure-marks__${CSSExposure}`} />
        </div>
      </div>
      <div className="camera--flash" />
      <div className="camera--viewfinder" />
      <div className="aperture-wrapper">
        <div className={`aperture-handle aperture-handle--at-${CSSAperture}`} />
        <div className="aperture-container">
          <div className={`aperture-lens aperture-lens--glare-at-${CSSAperture}`} />
          <div className="triangle-container">
            <div className={`triangle-item ap-${CSSAperture}`} />
            <div className={`triangle-item ap-${CSSAperture}`} />
            <div className={`triangle-item ap-${CSSAperture}`} />
            <div className={`triangle-item ap-${CSSAperture}`} />
            <div className={`triangle-item ap-${CSSAperture}`} />
            <div className={`triangle-item ap-${CSSAperture}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Camera;
