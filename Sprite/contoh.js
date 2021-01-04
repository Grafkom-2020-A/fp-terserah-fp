function init() {

  var stats = initStats();
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
      // color: Math.random() * 0xffffff,
      //rotasi 90
      // rotation: Math.PI/2
    });

    var range = 500;
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
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
  }

}