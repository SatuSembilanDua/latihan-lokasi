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
        $type = $_GET['type'];
        if($type=='rs'){
            $type = 'hospital';
        }else if($type=='ms'){
            $type = 'mosque';
        }
        $url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='.$loc.'&radius='.$rad.'&types='.$type.'&key=AIzaSyAc_2KdYuzfhyG-kLubASMoZfjqSkjLOnA&language=id';
               
        $all_result  = processURL($url);
        $result = json_decode($all_result);

        echo '<select class="form-control" id="tempat">';
        foreach ($result->results as $post => $v){
            $loc = $v->geometry->location->lat.', '.$v->geometry->location->lng;
            echo '<option id="loc_'.$post.'" value="'.$loc.'">'.$v->name.'</option>';
        }
        echo '</select>';
    }
?>

