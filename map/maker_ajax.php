<?php
function processURL($url)
{
    $ch = curl_init();
    curl_setopt_array($ch, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => 2
    ));
			 
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}
	if(isset($_GET['type'])){

        $loc = $_GET['loc'];
        $rad = $_GET['rad'];
        $ty = $_GET['type'];
        $type = '';
        if($ty=='rs'){
            $type = 'hospital';
        }else if($ty=='ms'){
            $type = 'mosque';
        }
        
        $url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='.$loc.'&radius='.$rad.'&types='.$type.'&key=AIzaSyAc_2KdYuzfhyG-kLubASMoZfjqSkjLOnA';   
        $all_result  = processURL($url);
        $result = json_decode($all_result);
        
        echo '<script type="text/javascript">';
        foreach ($result->results as $post => $v){
            $loc = $v->geometry->location->lat.','.$v->geometry->location->lng;

        ?>
            map.removeMarkers();
            setTimeout(function(){
                init_location();
            }, 10);
            setTimeout(function(){  
                map.addMarker({
                    lat: <?php echo $v->geometry->location->lat; ?>,
                    lng: <?php echo $v->geometry->location->lng; ?>,
                    title: "<?php echo htmlspecialchars($v->name); ?>",
                    animation : google.maps.Animation.DROP,
                    icon: 'assets/img/<?php echo $ty; ?>.png',
                    infoWindow: {
                        content: "<p><?php echo htmlspecialchars($v->name); ?></p>"
                    },
                    click:function(e) {
                        $("#posisiTujuan").val('<?php echo $loc; ?>');
                        $("#loc_<?php echo $post; ?>").attr('selected',true);
                    }
                });

            }, 500);
        <?php
        }
        
        echo '</script>';
    }
?>

