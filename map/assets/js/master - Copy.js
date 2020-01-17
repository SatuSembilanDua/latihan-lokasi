var markers = [];
var markers1 = [];
var watchId = null;
var im = 'assets/img/man.png';	
var sma = 'assets/img/rs.png';
var map = null;
var geocoder = null;
var myLatLng = null;
var directionsService = null;
var directionsDisplay = null;
var infowindow1 = [];

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
         	center: {lat: -7.275, lng: 112.641},
          	zoom: 11
        });
	    var infoWindow = new google.maps.InfoWindow({map: map});
	    if (navigator.geolocation) {
          	navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              	lat: position.coords.latitude,
              	lng: position.coords.longitude
            };
			awal = position.coords.latitude+','+position.coords.longitude;
			showsma(pos);
			$("#posisiAwal1").val(awal);
			infoWindow.setPosition(pos);
            map.setCenter(pos);
			infoWindow.close();
			
			var optn = {
				enableHightAccuracy	:true,
				timeout				:Infinity,
				maximumAge			:0
			}
			var watchId = navigator.geolocation.watchPosition(initialize,fail,optn);
	      	}, function() {
            	handleLocationError(true, infoWindow, map.getCenter());
          	});
        } 
		petasaya();
	}
	
	function rad(){
		var end  = $("#posisiSMA").val("");
		var end  = $("#posisiSMA1").val("");
		var radius = parseInt($("#radius").val());
		try {
			directionsDisplay.setMap(null);
		}
		catch(err) {
			
		}
		var tempat = $("#posisiAwal1").val();
		var res = tempat.split(",");
		var m = parseFloat(res[0]);
		var n = parseFloat(res[1]);
		var pos1 = {
			lat:m,
			lng:n
		};
		radius_circle.setMap(null);
		setMapOnAll1(null);
		if(radius == 0){
			map.setZoom(12);
			showsma(pos1);
		}else{
			showsmaradius(pos1,radius);
		}
		
		function showsmaradius(pos,radius){
		
		var kecil;
		if(radius == 1000){
			var kecil = 15;
		}else if(radius == 2000){
			var kecil = 14.8;
		}else if(radius == 3000){
			var kecil = 13.8;
		}else if(radius == 4000){
			var kecil = 13.2;
		}else if(radius == 5000){
			var kecil = 13;
		}

		var kecil1 = parseInt(kecil);
		var marker, i;
		map.setZoom(kecil1);
		geocoder = new google.maps.Geocoder;
			if (geocoder) {
			var latlng = pos;
			geocoder.geocode({'location': latlng}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
						var address_lat_lng = results[0].geometry.location;
						var nama = results[0].formatted_address;
						$("#posisiAwal").val(nama);
						radius_circle = new google.maps.Circle({
							center: address_lat_lng,
							radius: radius,
							clickable: false,
							map: map
						});
						var datax =[];
						var distance =[];
						var distance2 =[];
					
						for (i = 0; i < locations.length; i++) {  
							var marker_lat_lng = new google.maps.LatLng(locations[i][1], locations[i][2]);
							var distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(address_lat_lng, marker_lat_lng);
							
							if(distance_from_location <= radius){
							
							datax[i] = marker_lat_lng;
							distance[i] = distance_from_location;
							distance2[i] = (distance[i]/1000).toFixed(2);
							
							marker = new google.maps.Marker({
								position: new google.maps.LatLng(locations[i][1], locations[i][2]),
								animation: google.maps.Animation.DROP,
								map: map,
								icon: sma
							  });
							   markers1.push(marker);
							   google.maps.event.addListener(marker, 'click', (function(marker, i) {
								return function() {
									var end = new google.maps.LatLng(locations[i][1], locations[i][2]);
									$("#posisiSMA1").val(locations[i][1]+","+locations[i][2]);
									$("#posisiSMA").val(locations[i][0]);
								}
							  })
							  (marker, i));	
							google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
								return function() {
								infowindow = new google.maps.InfoWindow({ 
								content: '<div class="transparant">'+locations[i][0] +'<br />' + " <b>" + distance2[i] + "</b> KM dari lokasi</div>",
								size: new google.maps.Size(150,50),
								pixelOffset: new google.maps.Size(0, -30), 
								position: datax[i], 
								map: map
								});
								infowindow1.push(infowindow);	
								}
							  })
							  (marker, i));
							  google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
								return function() {
									setMapOnAll2(null);
								}
							  })
							  (marker, i));
						
								
						
						
							}
						}	
						
						var bb = ""+distance2+"";
						var resa = bb.split(",");
							var nil=null;
							var kk = [];
							var ii = 0;
						for (var io=0; io<resa.length; io++)
						{
							nil=parseFloat(resa[io], 10) 
							if(isNaN(nil)){
										
							}else{
								kk[ii] = nil;
								ii++;
							}
						}

						
						kk.sort(function(a, b){
							return a - b;
						})

						var jarakdekat1 = kk[0];
						
						var paramnama1=null;
						for(var ao=0;ao<distance2.length;ao++){
							if(distance2[ao] == jarakdekat1){
								paramnama1 = ao;
							}
						}
					
						$("#posisiSMA1").val(locations[paramnama1][1]+","+locations[paramnama1][2]);
						$("#posisiSMA").val(locations[paramnama1][0]);		
						
						
						} else {
						//alert("No results found while geocoding!");
						}
					} else {
					//alert("Geocode was not successful: " + status);
				}
			});
		}
		}
	}

	function showsma(pos){
		geocoder = new google.maps.Geocoder;
		if (geocoder) {
		var latlng = pos;
		geocoder.geocode({'location': latlng}, function (results, status) {
  			if (status == google.maps.GeocoderStatus.OK) {
  				if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
  					var address_lat_lng = results[0].geometry.location;
					var nama = results[0].formatted_address;
					$("#posisiAwal").val(nama);
  					radius_circle = new google.maps.Circle({
  						center: address_lat_lng,
  						radius: 0,
						strokeOpacity:0,
						clickable: false,
						map: map
  					});
					var datax =[];
					var distance =[];
					var distance1 =[];
					for (i = 0; i < locations.length; i++) {  
						var marker_lat_lng = new google.maps.LatLng(locations[i][1], locations[i][2]);						
						var distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(address_lat_lng, marker_lat_lng);
						datax[i] = marker_lat_lng;
						distance[i] = distance_from_location;
						distance1[i] = (distance[i]/1000).toFixed(2);
					
						marker = new google.maps.Marker({
							position: new google.maps.LatLng(locations[i][1], locations[i][2]),
							animation: google.maps.Animation.DROP,
							map: map,
							icon: sma
						  });
						   markers1.push(marker);
						   google.maps.event.addListener(marker, 'click', (function(marker, i) {
							return function() {
								var end = new google.maps.LatLng(locations[i][1], locations[i][2]);
								$("#posisiSMA1").val(locations[i][1]+","+locations[i][2]);
								$("#posisiSMA").val(locations[i][0]);
							}
						  })
						  (marker, i));	
						google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
							return function() {
							infowindow = new google.maps.InfoWindow({ 
							content: '<div class="transparant">'+locations[i][0] +'<br />' + " <b>" + distance1[i] + "</b> KM dari lokasi</div>",
							size: new google.maps.Size(150,50),
							pixelOffset: new google.maps.Size(0, -30), 
							position: datax[i], 
							map: map
							});
							infowindow1.push(infowindow);	
							}
						  })
						  (marker, i));
						  google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
							return function() {
								setMapOnAll2(null);
							}
						  })
						  (marker, i));
						}	
						
						
						var b = ""+distance1+"";
						
						
						var a = b;
var res = a.split(",");
for (var i=0; i<res.length; i++)
{
    res[i] = parseFloat(res[i], 10);
}

res.sort(function(a, b){
  return a - b;
})
						
						var jarakdekat = res[0];
						
						var paramnama=null;
						for(var o=0;o<distance1.length;o++){
							if(distance1[o] == jarakdekat){
								paramnama = o;
							}
						}
					
						$("#posisiSMA1").val(locations[paramnama][1]+","+locations[paramnama][2]);
						$("#posisiSMA").val(locations[paramnama][0]);		
					//	document.getElementById("demo").innerHTML = jarakdekat+" "+locations[paramnama][0];
					} else {
  					//alert("No results found while geocoding!");
					}
				} else {
  				//alert("Geocode was not successful: " + status);
  			}
  		});
		}
	}	
		
	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
	}

	function initialize(position){
		var pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
		setMapOnAll(null);
		var marker;
		marker = new google.maps.Marker({
			map: map,
			draggable: false,
			position: pos,
			zIndex: google.maps.Marker.MAX_ZINDEX + 3,
			icon: im
		});
		markers.push(marker); 
		awal = position.coords.latitude+','+position.coords.longitude;
		$("#posisiAwal1").val(awal);
		geocoder = new google.maps.Geocoder;
		if (geocoder) {
			var latlng = pos;
			geocoder.geocode({'location': latlng}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
						var address_lat_lng = results[0].geometry.location;
						var nama = results[0].formatted_address;
							$("#posisiAwal").val(nama);	
						} else {
						//	alert("No results found while geocoding!");
						}
					} else {
					//alert("Geocode was not successful: " + status);
				}
			});
		}
	}
	
	function setMapOnAll(map) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}
	
	function setMapOnAll1(map) {
		for (var j = 0; j < markers1.length; j++) {
			markers1[j].setMap(map);
		}	
		
		 for (var k = 0; k < infowindow1.length; k++) {
			infowindow1[k].close();;
		}
	}
	
	function setMapOnAll2(map) {
		for (var k = 0; k < infowindow1.length; k++) {
			infowindow1[k].close();;
		}
	}
	
	function fail(){
		  
	}
	
	function calculateAndDisplayRoute() {
		var tempat = $("#posisiAwal1").val();
		var res = tempat.split(",");
		var m = parseFloat(res[0]);
		var n = parseFloat(res[1]);
		var pos1 = {
			lat:m,
			lng:n
		};
		directionsService = new google.maps.DirectionsService;
		directionsDisplay = new google.maps.DirectionsRenderer;
		directionsDisplay.setMap(null);
		var end  = $("#posisiSMA1").val();
		if(end == 0){
			alert("Klik Rumah sakit");
		}else{
			directionsDisplay.setMap(null);
			var myLatLng = pos1;
			radius_circle.setMap(null);
			directionsDisplay.setMap(map);
			setMapOnAll1(null);
			directionsService.route({
				origin: myLatLng,
				destination: end,
				travelMode: google.maps.TravelMode.DRIVING
			  }, function(response, status) {
			if (status === google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			} else {
				alert('Directions request failed due to ' + status);
			}
		});
		}
	}
	
	function petasaya(){
		if (navigator.geolocation) {
			var optn = {
				enableHightAccuracy	:true,
				timeout				:Infinity,
				maximumAge			:0
		}
			var watchId = navigator.geolocation.watchPosition(initialize,fail,optn);
		}
	}

function toggleBounce() {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	}else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}



    <?php
		$query="SELECT * FROM table_rs";
		$tampil=mysqli_query($link,$query);
		while($row=mysqli_fetch_array($tampil)){
			$data = '{"0":"'.$row['RS_NAMA'].'","nama":"'.$row['RS_NAMA'].'","1":"'.$row['RS_LAT'].'","lat":"'.$row['RS_LAT'].'","2":"'.$row['RS_LON'].'","lng":"'.$row['RS_LON'].'"},';
		}
	?>
	<script>var locations = ['<?php echo $data; ?>']</script>
	<script type="text/javascript" src="assets/js/master.js"></script>