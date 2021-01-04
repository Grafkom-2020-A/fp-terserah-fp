function init() {

  // use the defaults
  var stats = initStats();
  var renderer = initRenderer();
  var camera = initCamera();
  var clock = new THREE.Clock();
  var trackballControls = initTrackballControls(camera, renderer);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 150;

  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  createPoints();
  render();

  function createPoints() {

    var geom = new THREE.Geometry();
    var material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      color: 0xffffff
      // Mematikan Bold Size
      // ,sizeAttenuation: false
      // randomize warna tidak akan work dimaterial
      // color: Math.random() * 0xffffff
      //tes rotasi gangaruh
      // ,rotation: Math.PI/3
      //tes opacity salah satu contoh properti turunan dari material
      // ,opacity: 0.1
    });

    for (var x = -300; x < 30; x++) {
      for (var y = -200; y < 20; y++) {
        var particle = new THREE.Vector3(x * 4, y * 4, 0);
        geom.vertices.push(particle);
        geom.colors.push(
          new THREE.Color(Math.random() * 0xffffff)
          );
      }
    }

    var cloud = new THREE.Points(geom, material);
    scene.add(cloud);
  }


  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}