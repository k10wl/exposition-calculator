export function calcAperture(weatherIndex: number): string {
  let calcAperture;
  if (weatherIndex === 0) {
    calcAperture = "16";
  } else if (weatherIndex === 1) {
    calcAperture = "11";
  } else if (weatherIndex === 2 || weatherIndex === 4) {
    calcAperture = "5.6";
  } else if (weatherIndex === 3) {
    calcAperture = "8.0";
  } else {
    calcAperture = "4.0";
  }
  return calcAperture;
}

export function calcExpo(isoIndex: number): string {
  let calcExpo;
  if (isoIndex === 0) {
    calcExpo = "1/125";
  } else if (isoIndex === 1) {
    calcExpo = "1/250";
  } else if (isoIndex === 2 ) {
    calcExpo = "1/500";
  } else if (isoIndex === 3) {
    calcExpo = "1/1000";
  } else {
    calcExpo = "1/2000";
  }
  return calcExpo;
}
