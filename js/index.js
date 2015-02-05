/*showAlarmPopup - no parameters
Use jQuery to select the mask div and removes the hide class.
Use jQuery to select the popup div and removes the hide class.
Set the onclick property to showAlarmPopup() in the index.html file for the Add Alarm button. */

function showAlarmPopup() {
  $('#mask').removeClass("hide");
  $('#popup').removeClass("hide");
  console.log$('#popup'));
}

/*hideAlarmPopup - no parameters
Use jQuery to select the mask div and adds the hide class.
Use jQuery to select the popup div and adds the hide class.
Set the onclick property to hideAlarmPopup() in the index.html file for the Cancel button.*/

function hideAlarmPopup() {
  $("#mask").addClass("hide");
  $("#popup").addClass("hide");
}

/*insertAlarm - 4 parameters: hours, mins, ampm, and alarmName.
Use jQuery to create a new blank div, $("<div>").
Add the class flexable to the new blank div.
Use the jQuery append() method to add 2 more div elements within the new flexable div.
Set the class to name and html to the alarmName variable.
Set the class to time and html to the concatenation of hours, colon, mins, ampm variables. 
Use the append()method to add the blank div to $("#alarms").*/

function insertAlarm(hours, mins, ampm, alarmName) {
  function newDiv (className, html) {
    var div = $("<div>").addClass(className);
    div.html(html);
    return div;
  }

  $("#alarms").append(
    $("<div>").addClass("flexable").html(
      newDiv("name", alarmName).append(
      newDiv("time", hours + ":" + mins + ampm))
    )
  ); 
}

/*addAlarm - no parameters
Create 4 local variables (hours, mins, ampm, and alarmName) to capture the Alarm values from the popup.
$("#hours option:selected").text(); will get the hour value.
Call insertAlarm(hours, mins, ampm, alarmName);
Call hideAlarmPopup();
Set the onclick property to addAlarm() in the index.html file for the Set Alarm button.*/

function addAlarm() {
  var hours = $("#hours option:selected").text(),
      mins = $("#mins option:selected").text(),
      ampm = $("#ampm option:selected").text(),
      alarmName = $("#alarmName option:selected").text();

  insertAlarm(hours, mins, ampm, alarmName);
  hideAlarmPopup();
}