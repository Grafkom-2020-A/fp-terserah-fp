$(document).ready(function () {
  $("#searchButton").click(function () {
    var userinput = $("#userinput").val();
    // console.log(userinput);
  });
});

var fullURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' //+city
let appid = '&appid=36369af9d5acd7def902ad1bc5f5c968';
let userInput;

function setup() {
  userInput = select('#userinput');
  searchbutton = select('#searchButton');
  searchbutton.mousePressed(searchbycity);

  function searchbycity() {
    let term = userInput.value();
    var url = fullURL;
    var id = appid;

    // Load JSON data
    var url = fullURL + term + id;
    window.value = url;
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


  // var stats = initStats();
  var renderer = initRenderer();
  var camera = initCamera(new THREE.Vector3(0, 0, 150));
  var trackballControls = initTrackballControls(camera, renderer);
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


    var range = 40;
    for (var i = 0; i < 1500; i++) {
      var particle = new THREE.Vector3(
        Math.random() * range - range / 2,
        Math.random() * range * 1.5,
        // Math.random() * range - range / 2
        1 + (i / 100)
      )
      particle.velocityY = 0.1 + Math.random() / 5;
      particle.velocityX = 0;
      geom.vertices.push(particle);
      geom.colors.push(
        new THREE.Color(Math.random() * 0xffffff)
      );
    }

    cloud = new THREE.Points(geom, material);
    cloud.sortParticles = true;
    cloud.name = "particles1"

    snow = new THREE.Points(geom, material2);
    snow.sortParticles = true;
    snow.name = "particles2"

    scene.add(cloud);
    // scene.add(snow);

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

  function render() {
    
    // stats.update();
    trackballControls.update(clock.getDelta());
    var vertices = cloud.geometry.vertices;
    vertices.forEach(function (v) {
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