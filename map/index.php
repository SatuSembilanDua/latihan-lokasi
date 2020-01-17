
<!DOCTYPE html>
<html>
<head>
    
    <link rel="icon" href="assets/img/logo.png">
    <title>Delok ae cok!</title>
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
	<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/style.css">
	<script src="assets/js/jquery-2.2.3.min.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAc_2KdYuzfhyG-kLubASMoZfjqSkjLOnA&libraries=geometrysensor=true"></script>
	<script type="text/javascript" src="assets/js/gmaps.js"></script>
	
</head>
<body>
	<div class="container-fluid">
		<div class="page-header">
		  	<h1>Location <small>tracker</small></h1>
		</div>
		<div class="row">
			<div class="col-xs-4 list-box">
				<div class="list-group">
				  	<a href="#" class="list-group-item">
				  		<strong>Chorme, Windows 8.1</strong><br>
				  		Jumat, 17-1-2020 15:18
				  	</a>
				</div>
			</div>
			<div class="col-xs-8 map-box">
				<div class="peta">
					<div id="map"></div>
				</div>
			</div>
		</div>
	</div>
  	<script type="text/javascript">
		var map = new GMaps({
		  	div: '#map',
			lat: -7.311405,
			lng: 112.782218,
		  	zoom:17
		});
		//init_location();
	
		function init_location(lat, longi){
			GMaps.geolocate({
			  	success: function(position) {
			    	/*map.setCenter(position.coords.latitude, position.coords.longitude);
			    	my_lat : position.coords.latitude;
			    	my_lon : position.coords.longitude;*/
			    	map.setCenter(lat, longi);
			    	my_lat : lat;
			    	my_lon : longi;

			    	$("#posisiAwal1").val(lat+','+longi);
			    	map.addMarker({
					  lat: lat,
					  lng: longi,
					  title: 'My Position',
					  animation : google.maps.Animation.BOUNCE,
					  icon: 'assets/img/man.png',
					  infoWindow: {
						  	content: '<p>My Position</p>'
						}
					});
					GMaps.geocode({
					  	address: $('#posisiAwal1').val(),
					  	callback: function(results, status) {
					    	if (status == 'OK') {
					    		$("#posisiAwal").val(results[0].formatted_address);
					    	}
					  	}
					});
			  	},
			  	error: function(error) {
					$('#posisiAwal1').val('-7.3116182,112.7824666');
					map.addMarker({

						  lat: -7.311405,
						  lng: 112.782218,
						  title: 'My Position',
						  animation : google.maps.Animation.BOUNCE,
						  icon: 'assets/img/man.png',
						  infoWindow: {
							  	content: '<p>My Position</p>'
							}
						});
						GMaps.geocode({
						  	address: $('#posisiAwal1').val(),
						  	callback: function(results, status) {
						    	if (status == 'OK') {
						    		$("#posisiAwal").val(results[0].formatted_address);
						    	}
						  	}
						});
				
			  	},
			  	not_supported: function() {
			    	alert("Your browser does not support geolocation");
			  	},
			  	always: function() {
			  	}
			});
		}
	</script>
	<div class="load_script"></div>

	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
 	<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"></script>
    <script src="../fbase.js"></script>
    <script>
    	LokasiRef.on('value' , dataBerhasil , dataGagal);
    	function dataBerhasil(data) {
    		var lst = "";
	        var nomor = 1;
	        //console.log(data.val());
	        var dda = [];
	        data.forEach(function(konten) {
	            /*console.log(nomor);
	            console.log(konten.val().battery);
	            console.log(konten.val().device);
	            console.log(konten.val().date);
	            console.log(konten.val().location);*/
	            /*lst += '<a href="'+konten.key+'" class="list-group-item">';
			  		lst += '<strong>'+konten.val().device.browser+', '+konten.val().device.os+'</strong><br>';
			  		lst += konten.val().date;
			  	lst += '</a>';*/
			  	var obj = {key: konten.key, device:konten.val().device, battery:konten.val().battery, date:konten.val().date, location:konten.val().location }
	        	dda.unshift(obj);
	        });

	        dda.forEach(function(konten){
	        	lst += '<a onclick="show_loc(\''+konten.key+'\')" class="list-group-item">';
			  		lst += '<strong>'+konten.device.browser+', '+konten.device.os+'</strong><br>';
			  		lst += konten.date;
			  		lst += '<input type="hidden" id="battery-'+konten.key+'" value="'+konten.battery.level+'|'+konten.battery.charging+'">';
			  		lst += '<input type="hidden" id="location-'+konten.key+'" value="'+konten.location.latitude+'|'+konten.location.longitude+'">';
			  	lst += '</a>';
	        });

	        $(".list-group").html(lst);
	    }

	    function show_loc(key){
	    	console.log(key);
	    	var bat = $("#battery-"+key).val();
	    	var loc = $("#location-"+key).val();
	    	console.log(bat);
	    	console.log(loc);
	    	var aloc = loc.split("|");
	    	init_location(aloc[0], aloc[1]);
	    }
    </script>
</body>
</html>