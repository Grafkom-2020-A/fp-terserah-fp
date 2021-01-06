var scene, camera, renderer, clock;

// Used in initParticles()
var emitter, particleGroup;

// Setup the scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
    camera.position.z = 50;
    camera.lookAt( scene.position );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000);

    // stats = new Stats();
    clock = new THREE.Clock();

    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.top = '0';

    document.body.appendChild( renderer.domElement );
    // document.body.appendChild( stats.domElement );
}

// Create particle group and emitter
function initParticles() {
    var texture = THREE.ImageUtils.loadTexture('../particles/cloud.png');
    texture.magFilter = THREE.LinearMipMapLinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    particleGroup = new ShaderParticleGroup({
        texture: texture,
        maxAge: 5
    });

    emitter = new ShaderParticleEmitter({
        position: new THREE.Vector3(0, 0, 0),
        positionSpread: new THREE.Vector3(85, 30, 85),

        colorStart: new THREE.Color('white'),
        // colorSpread: new THREE.Vector3(0, 0, 0),
        colorEnd: new THREE.Color('grey'),
        size: 500,
        sizeSpread: 5,
        opacityStart: 0,
        opacityMiddle: 0.15,
        opacityEnd: 0,

        particlesPerSecond: 5,
    });

    particleGroup.addEmitter( emitter );
    scene.add( particleGroup.mesh );

    // document.querySelector('.numParticles').textContent = 
    // 	'Total particles: ' + emitter.numParticles;
}



function animate() {
    requestAnimationFrame( animate );

    // Using a fixed time-step here to avoid pauses
    render( 0.016 );
    stats.update();
}


function render( dt ) {
    particleGroup.tick( dt );
    renderer.render( scene, camera );

    camera.position.x = Math.sin( Date.now() * 0.0005 ) * 150;
    camera.position.z = Math.cos( Date.now() * 0.0005 ) * 150;
    camera.lookAt( scene.position );
}


window.addEventListener( 'resize', function() {
    var w = window.innerWidth,
        h = window.innerHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize( w, h );
}, false );



