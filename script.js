$(document).ready(function(){
    $("#searchButton").click(function(){
        var userinput=$("#userinput").val();
        // console.log(userinput);
    });
});

var fullURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' //+city
let appid = '&appid=36369af9d5acd7def902ad1bc5f5c968';
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
        // console.log(url);
        
    }
}


    
    function init(data) {
        //Process Api disini
        console.log(data);
        var temp = data.list[0].main.temp;
        var weather = data.list[0].weather[0].main;
        console.log(weather);


        //SEMUA YANG ADA SANGKUT PAUT SAMA THREE.JS DISINI


        var camera = initCamera(new THREE.Vector3(20, 0, 150));
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
            scene.add(sprite);
          }
        }
      
        var step = 0;
      
        function render() {
          
          trackballControls.update(clock.getDelta());
          requestAnimationFrame(render);
          webGLRenderer.render(scene, camera);
        }
      
      }
