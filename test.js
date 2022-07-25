"use strict";

var fs = require("fs");
const hts221 = require("hts221-sensor");

hts221
  .open()
  .then((sensor) =>
    setInterval(
      (_) =>
        sensor
          .read()
          .then((reading) => {
            update(reading.celsius, reading.humidity);
          })
          .catch(console.log),
      1000
    )
  )
  .catch(console.log);

function update(temp, hum) {
  let sen = temp+0.348*(hum/100*6.105*Math.exp(17.27*temp/(237.7+temp)))-4.25;
  let cpu = parseInt(fs.readFileSync("/sys/class/thermal/thermal_zone0/temp")) / 1000;
  console.log("Temp: " + temp.toFixed(2) + "\nHumidity: " + hum.toFixed(2) + "\nThermal sensation: " + sen.toFixed(2) + "\nCPU Temp: " + cpu + "\n\n");
}
