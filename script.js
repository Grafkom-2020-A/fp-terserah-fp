$(document).ready(function(){
    $("#searchButton").click(function(){
        var userinput=$("#userinput").val();
        // console.log(userinput);
    });
});

var fullURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' //+city
let appid = '&units=metric&appid=36369af9d5acd7def902ad1bc5f5c968';
let userInput;

function setup() {
    userInput = select('#userinput');  
    searchbutton = select ('#searchButton');
    searchbutton.mousePressed(searchbycity);

    function searchbycity() {
        let term = userInput.value ();
        var url = fullURL;
        var id = appid;

        // Load JSON data
        var url = fullURL + term + id;
        window.value =url; 
        loadJSON(url, init, 'json');
        console.log(url);
        
    }
}


    
    function init(data) {
        //Process Api disini
        console.log(data);

        // Assign data dari API ke variabel 
        var temp = data.list[0].main.temp;
        var feels_like = data.list[0].main.feels_like;
        var temp_min  = data.list[0].main.temp_min;
        var temp_max = data.list[0].main.temp_max;
        var pressure = data.list[0].main.pressure;
        var sea_level = data.list[0].main.sea_level;
        var humidity = data.list[0].main.humidity;
        var visibility = data.list[0].visibility;
        var weather = data.list[0].weather[0].main;
        var city = data.city.name;
        var date = data.list[0].dt_txt;


        // Append data ke HTML Element (Stat Weather Atas)
        $('.Temp').append("Suhu: " + temp + " °C");
        $('.Feels_like').append("Terasa Seperti: " + feels_like + " °C");
        $('.Temp_min').append("Suhu Minimum: " + temp_min + " °C");
        $('.Temp_max').append("Suhu Maksimum: " + temp_max + " °C");
        $('.City').append(city);
        $('.Date').append(date);

        // Append data ke HTML Element (Stat Weather Bawah)
        $('.Pressure').append("Tekanan Udara: " + pressure +" hPa");
        $('.Sea_level').append("Tekanan Udara di Permukaan Laut: "+ sea_level + " hPa");
        $('.Humidity').append("Kelembapan: " + humidity + " %");
        $('.Visibility').append("Visibilitas: " + visibility + " m");
      
        console.log(weather);


        //SEMUA YANG ADA SANGKUT PAUT SAMA THREE.JS DISINI


        var camera = initCamera(new THREE.Vector3(0, 0, 150));
        var scene = new THREE.Scene();
        var webGLRenderer = initRenderer();
        var trackballControls = initTrackballControls(camera, webGLRenderer);
        var clock = new THREE.Clock();
      
        createSprites();
        render();
      
        function createSprites() {
          var material = new THREE.SpriteMaterial({
            //tes map load texture dengan canvas dari util.js
            map: createGhostTexture(),
            //tes warna diatas texture
            color: Math.random() * 0xffffff,
            //rotasi 90
            // rotation: Math.PI/2
          });
      
          var range = 5;
          // Testing If Else Dari data cuaca
          if (weather == 'Rain') {
              range=500;
          }
          for (var i = 0; i < 50000; i++) {
            var sprite = new THREE.Sprite(material);
            sprite.position.set(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() *
              range - range / 2);
            sprite.scale.set(5, 5, 5);
            // scene.add(sprite);
          }

          hlight = new THREE.AmbientLight (0x404040,100);
          scene.add(hlight);
          directionalLight = new THREE.DirectionalLight(0xffffff,100);
          directionalLight.position.set(0,1,0);
          directionalLight.castShadow = true;
          scene.add(directionalLight);
          light = new THREE.PointLight(0xc4c4c4,10);
          light.position.set(0,300,500);
          scene.add(light);
          light2 = new THREE.PointLight(0xc4c4c4,10);
          light2.position.set(500,100,0);
          scene.add(light2);
          light3 = new THREE.PointLight(0xc4c4c4,10);
          light3.position.set(0,100,-500);
          scene.add(light3);
          light4 = new THREE.PointLight(0xc4c4c4,10);
          light4.position.set(-500,300,500);
          scene.add(light4);

          var loader = new THREE.GLTFLoader();
          loader.load('../gLTF/scene.gltf', function (result) {
            // correctly position the scene
            result.scene.position.set(0,-50,0)
            result.scene.scale.set(0.05, 0.05, 0.05);
            scene.add(result.scene)
          });

          // initDefaultLighting(scene);
          var loader = new THREE.GLTFLoader();
          loader.load('../gLTF/clouds.gltf', function (result) {
            // correctly position the scene
            result.scene.position.set(0,20,0)
            // result.scene.scale.set(10, 10, 10);
            result.scene.scale.set(3, 3, 3);
            scene.add(result.scene)
          });
          
        }
      
        var step = 0;
      
        function render() {
          
          trackballControls.update(clock.getDelta());
          requestAnimationFrame(render);
          webGLRenderer.render(scene, camera);
        }
      
      }
