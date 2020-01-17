 // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyB57fnfOlo5qwT6tK_6C6eyf-o9Ip2FrQg",
        authDomain: "latihan-lokasi.firebaseapp.com",
        databaseURL: "https://latihan-lokasi.firebaseio.com",
        projectId: "latihan-lokasi",
        storageBucket: "latihan-lokasi.appspot.com",
        messagingSenderId: "834125803315",
        appId: "1:834125803315:web:a59c0ce8129148f59b1846"
    };


    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var db, LokasiRef;

    db = firebase.database();
    LokasiRef = db.ref('tlokasi');

    //LokasiRef.on('value' , dataBerhasil , dataGagal);
    //-Lymx2RLlia1kaZhiufw
    //LokasiRef.child("-Lymx2RLlia1kaZhiufw").remove();
   
    function dataGagal(err) {
        console.log(err);
    }

    function make_data(loc){

        navigator.getBattery().then(function(battery) {
            batteryIsCharging = battery.charging;

            //console.log(new Date().getTime());
            var a = {
                device:get_browser(),
                battery:{level: Math.ceil(battery.level*100), charging:battery.charging},
                date:get_date(),
                location:loc,
            };
            console.log(a);
            LokasiRef.push(a);
            LokasiRef.on('child_changed' , dataBerubah , dataGagal);
        });
    }

    function dataBerubah(){
        console.log("Data Berhasil disimpan!");
    }