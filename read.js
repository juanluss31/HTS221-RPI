"use strict";

var fs = require("fs");
const hts221 = require("hts221-sensor");
var ThingSpeakClient = require("thingspeakclient");
var client = new ThingSpeakClient();

var channelId =  ; /*Introduce el channelId del canal*/

const key = ""; /*Introduce la write key del canal*/

client.attachChannel(channelId, { writeKey: key });

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
      60000
    )
  )
  .catch(console.log);

function update(temp, hum) {
  let sen = temp+0.348*(hum/100*6.105*Math.exp(17.27*temp/(237.7+temp)))-4.25;
  let cpu = parseInt(fs.readFileSync("/sys/class/thermal/thermal_zone0/temp")) / 1000;
  client.updateChannel(
    channelId,
    { field1: temp.toFixed(2), field2: hum.toFixed(2), field3: sen.toFixed(2), field6: cpu },
    function (err, resp) {
      if (!err && resp > 0) {
        console.log("update successfully. Entry number was: " + resp);
      }
    }
  );
}