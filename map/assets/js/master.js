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
          	zoom: 14
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
	
	function setMapOnAll(map) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}

	function fail(){
		  
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