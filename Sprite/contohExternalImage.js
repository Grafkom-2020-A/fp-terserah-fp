function init() {

  // use the defaults
  var stats = initStats();
  var webGLRenderer = initRenderer();
  var scene = new THREE.Scene();
  var camera = initCamera(new THREE.Vector3(20, 0, 150));
  camera.lookAt(new THREE.Vector3(20, 30, 0));
  var trackballControls = initTrackballControls(camera, webGLRenderer);
  var clock = new THREE.Clock();
  var scene = new THREE.Scene();

  createSprites();
  render();

  var group;

  function getTexture() {
    var texture = new THREE.TextureLoader().load("../particles/ss.png");
    return texture;
  }

  function getTexture2() {
    var texture = new THREE.TextureLoader().load("../particles/snowflake3_t.png");
    return texture;
  }

  function createSprites() {
    group = new THREE.Object3D();
    var range = 200;
    for (var i = 0; i < 500; i++) {
      group.add(createSprite(10, false, 0.6, 0xffffff, i % 5, range));
    }
    scene.add(group);
  }

  function createSprite(size, transparent, opacity, color, spriteNumber, range) {

    var spriteMaterial = new THREE.SpriteMaterial({
      // color: Math.random() * 0xffffff,
      //untransparent
      // transparent: false,
      map: getTexture(),
    });

    var spriteMaterial2 = new THREE.SpriteMaterial({
      blending: THREE.AdditiveBlending,
      map: getTexture2(),
    });

    spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0);
    spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1);
    spriteMaterial.depthTest = false;

    //Buat randomize objek
    // var w = Math.floor(Math.random() * 10);
    // if(w % 2){
    //   var sprite = new THREE.Sprite(spriteMaterial);
    // }
    // else{
    //   var sprite = new THREE.Sprite(spriteMaterial2);
    // }
    //Ntar ini dikomen gantian sm yg diatas
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size, size);
    sprite.position.set(
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
      Math.random() * range - range / 2);

    return sprite;
  }



  function render() {

    stats.update();
    trackballControls.update(clock.getDelta());
    group.rotation.x +=0.00;

    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
  }
}