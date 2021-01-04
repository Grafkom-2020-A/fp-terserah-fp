function init() {

  // use the defaults
  var stats = initStats();
  var renderer = initRenderer();
  var camera = initCamera();
  var clock = new THREE.Clock();
  var trackballControls = initTrackballControls(camera, renderer);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();

  // position and point the camera to the center of the scene
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 150;

  camera.lookAt(new THREE.Vector3(0, 0, 0))

  createSprites();
  render();

  function createSprites() {


    for (var x = -300; x < 30; x++) {
      for (var y = -200; y < 20; y++) {
        var material = new THREE.SpriteMaterial({
          color: Math.random() * 0xffffff
          //tes rotasi 135
          // ,rotation: Math.PI/3
          //tes opacity salah satu contoh properti turunan dari material
          // ,opacity: 0.1
        });

        var sprite = new THREE.Sprite(material);
        //tes constructor kosong
        // var sprite = new THREE.Sprite();
        
        sprite.position.set(x * 4, y * 4, 0);
        scene.add(sprite);
      }
    }
  }

  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}