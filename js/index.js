/*showAlarmPopup - no parameters
Use jQuery to select the mask div and removes the hide class.
Use jQuery to select the popup div and removes the hide class.
Set the onclick property to showAlarmPopup() in the index.html file for the Add Alarm button. */

function showAlarmPopup() {
  $('#mask').removeClass("hide");
  $('#popup').removeClass("hide");
}

/*hideAlarmPopup - no parameters
Use jQuery to select the mask div and adds the hide class.
Use jQuery to select the popup div and adds the hide class.
Set the onclick property to hideAlarmPopup() in the index.html file for the Cancel button.*/

function hideAlarmPopup() {
  $("#mask").addClass("hide");
  $("#popup").addClass("hide");
}

function insertAlarm(time, alarmName, objectId) {
  function newDiv (className, html) {
    var div = $("<div>").addClass(className);
    div.html(html);
    return div;
  }

  function delButton(objectId) {
    var button = $("<button>");
    button.html("click here to delete this alarm");
    button.bind("click", { "objectId" : objectId }, function deleteAlarm(event) {
      var id = event.data.objectId;
      console.log("deleting: " + id);
      var alarm = Parse.Object.extend("Alarm");
      var query = new Parse.Query(alarm);
      query.get(id, {
        success: function(alarm) {
          // The object was retrieved successfully.
          alarm.destroy({});
          $('#' + id).remove();
          ga('send', 'event', 'Alarm', 'Delete');
          console.log('successfully deleted');
        },
        error: function(object, error) {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and description.
          console.log(error);
        }
      });
    });
    return button;
  }

  $("#alarms").append(
    $("<div>").attr('id', objectId).addClass("flexable").html(
     newDiv("name", alarmName).append(
     newDiv("time", time).append(delButton(objectId))))
  ); 
}

/*addAlarm - no parameters
Create 4 local variables (hours, mins, ampm, and alarmName) to capture the Alarm values from the popup.
$("#hours option:selected").text(); will get the hour value.
Call insertAlarm(hours, mins, ampm, alarmName);
Call hideAlarmPopup();
Set the onclick property to addAlarm() in the index.html file for the Set Alarm button.*/

function addAlarm(username) {
  var hours = $("#hours option:selected").text(),
      mins = $("#mins option:selected").text(),
      ampm = $("#ampm option:selected").text(),
      alarmName = $("#alarmName").val();

  var time = hours + ":" + mins + ampm;

  var AlarmObject = Parse.Object.extend("Alarm");
  var alarmObject = new AlarmObject();
  var toSave = {"time" : time, "alarmName": alarmName, "username" : username};
  alarmObject.save(toSave, {
    success: function(object) {
      ga('send', 'event', 'Alarm', 'Add');
      insertAlarm(time, alarmName, object.id);
      hideAlarmPopup();
    }
  });

}

function deleteAllAlarms() {
  $("#alarms").html('');
}

function getAllAlarms(username) {
  Parse.initialize("fs4RNotawuzHNFsKN0WEaPgJrfJ23wvJu0tsBnMj", "EnETys9VkCKgF2gu4LYNObf4JqCZRiTi2PiuKbwF");
  var AlarmObject = Parse.Object.extend("Alarm");
  var query = new Parse.Query(AlarmObject);
  query.equalTo("username", username);
  query.find({
    success: function(results) {
      for (var i = 0; i < results.length; i++) { 
        insertAlarm(results[i].get("time"), results[i].get("alarmName"), results[i].id);
      }
    }
  });
}





































function showLoggedInView(username) {
  $('#authDiv').show();
  $('#unAuthDiv').hide();
  $('#username').html('Currently logged in as ' + username);
  $('#saveAlarmButton').bind('click', function () {
    addAlarm(username);
  });
  getAllAlarms(username);
}

function showLoggedOut() {
  $('#authDiv').hide();
  $('#unAuthDiv').show();
  $('#saveAlarmButton').unbind('click');
  deleteAllAlarms();
}

function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    gapi.client.load('plus', 'v1').then(function() { 
      req = gapi.client.plus.people.get({userId : 'me'});  
      req.execute(function(resp) {  
        showLoggedInView(resp.emails[0].value);
      });
    });
  } else {
    showLoggedOut();

    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}

