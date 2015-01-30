function getTime () {
   document.getElementById("clock").innerHTML = new Date();
   setTimeout(getTime, 1000);
}

getTime();

function getTemp() {
  var url = 'https://api.forecast.io/forecast/277e7a349fc051c5a3a8169819b178aa/35.300399,-120.662362?callback=?';

  console.log("getting it");
	$.getJSON(url, function getTempCallback(data){

    $('#forecastIcon').html('<img src="img/' + data.daily.icon + '.jpg">');
    $('#forecastLabel').html(data.daily.summary);

    $('body').addClass(function getTempClass(){
      var temp = data.daily.data[0].temperatureMax;
      
      if (temp < 60)
        return 'cold';
      else if (temp < 70)
        return 'chilly';
      else if (temp < 80)
        return 'nice';
      else if (temp < 90)
        return 'warm';
      else
        return 'hot';
    });
  });
}

getTemp();