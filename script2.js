$(document).ready(function() {
    $("form").submit(function(e) {
        e.preventDefault();
        var userinput = $("#userInput").val();
        // console.log(userinput);
    });
});

var curweatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?q='; //+city
let appid = '&units=metric&appid=36369af9d5acd7def902ad1bc5f5c968';
let userInput;
let url;
let iterator=0;

function setup() {
    userInput = select('#userInput');
    searchbutton = select('#searchButton');
    searchbutton.mousePressed(searchbycity);

    function searchbycity() {
        let term = userInput.value();
        var id = appid;

        // Load JSON data
        url = curweatherURL + term + id;
        window.value = url;
        loadJSON(url, init, 'json');
        // loadJSON(url, init, 'json');
        console.log(url);

        nextbutton = select('#nextButton');
        nextbutton.mousePressed(forecastWeather);

    }
}

function forecastWeather() {
    userInput = select('#userInput');
    let term = userInput.value();
    var id = appid;
    // Load JSON data
    url = forecastURL + term + id;
    window.value = url;
    loadJSON(url, init, 'json');
    // loadJSON(url, init, 'json');
    console.log(url);

}

function clearstat() {
    $('.Temp').empty();
    $('.Feels_like').empty();
    $('.Temp_min').empty();
    $('.Temp_max').empty();
    $('.City').empty();
    $('.Date').empty();

    // Append data ke HTML Element (Stat Weather Bawah)
    $('.Pressure').empty();
    $('.Humidity').empty();
    $('.Visibility').empty();
    $('.Weather').empty();
}


function init(data) {
    //Process Api disini
    console.log(url);
    clearstat();

    var temp;
    var feels_like;
    var temp_min;
    var temp_max;
    var pressure;
    var humidity;
    var visibility;
    var weather;
    var city;
    var date;

    function isForecast(str2) {
        var str1 = forecastURL; //Length of str1 is 30
        var n = str2.indexOf(str1);
        console.log(n);
        return n;
    }

    if (isForecast(url) != -1) {
        // Assign data dari API ke variabel (forecast) 
        temp = data.list[iterator].main.temp;
        feels_like = data.list[iterator].main.feels_like;
        temp_min = data.list[iterator].main.temp_min;
        temp_max = data.list[iterator].main.temp_max;
        pressure = data.list[iterator].main.pressure;
        humidity = data.list[iterator].main.humidity;
        visibility = data.list[iterator].visibility;
        weather = data.list[iterator].weather[0].main;
        city = data.city.name;
        date = data.list[iterator].dt_txt;
        iterator = iterator + 1;
    } else {

        //Assign Data dari Current weather API ke variable
        temp = data.main.temp;
        feels_like = data.main.feels_like;
        temp_min = data.main.temp_min;
        temp_max = data.main.temp_max;
        pressure = data.main.pressure;
        humidity = data.main.humidity;
        visibility = data.visibility;
        weather = data.weather[0].main;
        city = data.name;
        datevar = new Date();
        date = datevar.toLocaleString();
    }


    // // Assign data dari API ke variabel (forecast) 
    // var temp = data.list[0].main.temp;
    // var feels_like = data.list[0].main.feels_like;
    // var temp_min = data.list[0].main.temp_min;
    // var temp_max = data.list[0].main.temp_max;
    // var pressure = data.list[0].main.pressure;
    // var sea_level = data.list[0].main.sea_level;
    // var humidity = data.list[0].main.humidity;
    // var visibility = data.list[0].visibility;
    // var weather = data.list[0].weather[0].main;
    // var city = data.city.name;
    // var date = data.list[0].dt_txt;


    // Append data ke HTML Element (Stat Weather Atas)
    $('.Temp').append("Suhu: " + temp + "°C");
    $('.Feels_like').append("Terasa Seperti: " + feels_like + "°C");
    $('.Temp_min').append("Suhu Minimum: " + temp_min + "°C");
    $('.Temp_max').append("Suhu Maksimum: " + temp_max + "°C");
    $('.City').append(city);
    $('.Date').append(date);

    // Append data ke HTML Element (Stat Weather Bawah)
    $('.Pressure').append("Tekanan Udara: " + pressure + " hPa");
    $('.Humidity').append("Kelembapan: " + humidity + "%");
    $('.Visibility').append("Visibilitas: " + visibility + " m");
    $('.Weather').append(weather);

    console.log(weather);


    //SEMUA YANG ADA SANGKUT PAUT SAMA THREE.JS DISINI


    // var stats = initStats();
    var renderer = initRenderer();
    renderer.physicallyCorrectLights = true;
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    var camera = initCamera(new THREE.Vector3(0, 0, 100));
    // var trackballControls = initTrackballControls(camera, renderer);
    var orbitControls = initOrbitControls(camera, renderer);
    var clock = new THREE.Clock();
    var scene = new THREE.Scene();

    var cloud;
    createPointCloud(3, true, 1, true,
        0xffffff);
    render();

    function createPointCloud(size, transparent, opacity, sizeAttenuation, color) {


        var texture = new THREE.TextureLoader().load("../particles/raindrop-3.png");
        var texture2 = new THREE.TextureLoader().load("../particles/snowflake3_t.png");

        var geom = new THREE.Geometry();

        var material = new THREE.PointsMaterial({
            size: size,
            transparent: transparent,
            opacity: opacity,
            map: texture,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: sizeAttenuation,
            color: color
        });

        var material2 = new THREE.PointsMaterial({
            size: size + 2,
            transparent: transparent,
            opacity: opacity,
            map: texture2,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: sizeAttenuation,
            color: color
        });

        // hlight = new THREE.AmbientLight(0x404040, 100);
        // // scene.add(hlight);
        // directionalLight = new THREE.DirectionalLight(0xffffff, 100);
        // directionalLight.position.set(0, 1, 0);
        // directionalLight.castShadow = true;
        // // scene.add(directionalLight);
        // light = new THREE.PointLight(0xc4c4c4, 10);
        // light.position.set(0, 300, 500);
        // // scene.add(light);
        light2 = new THREE.PointLight(0xc4c4c4, 10);
        light2.position.set(500, 100, 0);
        light2.intensity = 0.5;
        scene.add(light2);
        // light3 = new THREE.PointLight(0xc4c4c4, 10);
        // light3.position.set(0, 100, -500);
        // // scene.add(light3);
        light4 = new THREE.PointLight(0xc4c4c4, 10);
        light4.position.set(-500, 300, 500);
        light4.intensity = 0.5;
        scene.add(light4);

        var ambientLight = new THREE.AmbientLight("#111111");
        scene.add(ambientLight);
      
        // the point light where working with
        var pointColor = "#ccffcc";
        var pointLight = new THREE.PointLight(pointColor);
        pointLight.position.set(-5, 35, 0);
        pointLight.intensity = 5;
        pointLight.decay = 2;
      
        pointLight.castShadow = true;
      
        scene.add(pointLight);
      
        var helper = new THREE.PointLightHelper(pointLight);
        scene.add(helper);
      
        var shadowHelper = new THREE.CameraHelper(pointLight.shadow.camera)
        scene.add(shadowHelper);

        var helper = new THREE.PointLightHelper(light4);
        scene.add(helper);
      
        var shadowHelper = new THREE.CameraHelper(light4.shadow.camera)
        scene.add(shadowHelper);

        var helper = new THREE.PointLightHelper(light2);
        scene.add(helper);
      
        var shadowHelper = new THREE.CameraHelper(light2.shadow.camera)
        scene.add(shadowHelper);
    
        var loader = new THREE.GLTFLoader();
        loader.load('../gLTF/scene.gltf', function(result) {
            // correctly position the scene
            result.scene.position.set(0, -50, 0);
            result.scene.scale.set(0.05, 0.05, 0.05);
            scene.add(result.scene);
        });

        loader.load('../gLTF/sun.gltf', function(result) {
            // correctly position the scene
            result.scene.position.set(-5, 35, 0);
            // result.scene.scale.set(10, 10, 10);
            result.scene.scale.set(4, 4, 4);
            scene.add(result.scene);
        });

        // initDefaultLighting(scene);
        var loader1 = new THREE.GLTFLoader();
        if (weather == 'Sun') {
            loader1.load('../gLTF/sun.gltf', function(result) {
                // correctly position the scene
                result.scene.position.set(-5, 20, 0);
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 4, 4);
                scene.add(result.scene);
            });

        } else if (weather == 'Rain') {

            loader1.load('../gLTF/clouds.gltf', function(result) {
                // correctly position the scene
                result.scene.position.set(-5, 20, 0);
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 4, 4);
                scene.add(result.scene);
            });

            var range = 40;
            for (var i = 0; i < 1500; i++) {
                var particle = new THREE.Vector3(
                    2 + Math.random() * range - range / 2,
                    0.3 * range * 1.5,
                    // Math.random() * range - range / 2
                    -7 + (i / 100)
                )
                particle.velocityY = 0.1 + Math.random() / 5;
                particle.velocityX = 0;
                geom.vertices.push(particle);
                geom.colors.push(
                    new THREE.Color(Math.random() * 0xffffff)
                );
            }

            var range = 20;
            for (var i = 0; i < 1500; i++) {
                var particle = new THREE.Vector3(
                    9 + Math.random() * range - range / 2,
                    0.3 * range * 1.5,
                    // Math.random() * range - range / 2
                    -19 + (i / 100)
                )
                particle.velocityY = 0.1 + Math.random() / 5;
                particle.velocityX = 0;
                geom.vertices.push(particle);
                geom.colors.push(
                    new THREE.Color(Math.random() * 0xffffff)
                );
            }
        }

        cloud = new THREE.Points(geom, material);
        cloud.sortParticles = true;
        cloud.name = "particles1"

        snow = new THREE.Points(geom, material2);
        snow.sortParticles = true;
        snow.name = "particles2"

        scene.add(cloud);
        // scene.add(snow);
    }

    function render() {

        // stats.update();
        orbitControls.update(clock.getDelta());
        // trackballControls.update(clock.getDelta());
        var vertices = cloud.geometry.vertices;
        vertices.forEach(function(v) {
            v.y = v.y - (v.velocityY);
            v.x = v.x - (v.velocityX);

            if (v.y <= -45) v.y = 15;
            if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
        });
        cloud.geometry.verticesNeedUpdate = true;

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

}