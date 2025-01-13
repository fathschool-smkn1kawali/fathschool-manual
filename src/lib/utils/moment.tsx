import moment from "moment";
import "moment/locale/id"; 

/**
 * * Return a greeting message based on the current time of day.
 *
 * @returns A greeting message in the form of a string.
 */
function SayHello(): string {
  const currentTime = moment();
  const hour = currentTime.hour();

  if (hour >= 4 && hour < 12) {
    return "Hello, Selamat Pagi";
  } else if (hour >= 12 && hour < 15) {
    return "Hello, Selamat Siang";
  } else if (hour >= 15 && hour < 18) {
    return "Hello, Selamat Sore";
  } else {
    return "Hello, Selamat Malam";
  }
}

function GetTime(): string {
  moment.locale("id");
  return moment().format("dddd: D MMMM, HH:mm");
}

export {
  GetTime,
  SayHello
}