function init() {

    // var stats = initStats();
    var renderer = initRenderer();
    renderer.physicallyCorrectLights = true;
    // renderer.gammaOutput = true;
    // renderer.gammaFactor = 2.2;
    var camera = initCamera(new THREE.Vector3(0, 0, 100));
    var orbitControls = initOrbitControls(camera, renderer);
    var clock = new THREE.Clock();
    var scene = new THREE.Scene();
    var mixers = [];
    var mixers2 = [];
    var mesh, mesh2;
    var pivot, pivot2;

    createPointCloud();
    render();

    function createPointCloud() {

        var ambientLight = new THREE.AmbientLight("#ffffff");
        scene.add(ambientLight);

        // weather = 'Sun';


        var loader = new THREE.GLTFLoader();
        loader.load('../gLTF/scene.gltf', function (result) {
            // correctly position the scene
            result.scene.position.set(0, -50, 0);
            result.scene.scale.set(0.05, 0.05, 0.05);
            scene.add(result.scene);
        });

        loader.load('../gLTF/air.gltf', function (result) {
            // correctly position the scene
            result.scene.position.set(50, -5, 10);
            //20
            // result.scene.scale.set(10, 10, 10);
            result.scene.scale.set(3, 3, 3);
            result.scene.rotateY(-0.8 * Math.PI);
            result.scene.castShadow = true;
            result.scene.receiveShadow = false;
            scene.add(result.scene);
        });


        // initDefaultLighting(scene);
        var loader1 = new THREE.GLTFLoader();

        var pointColor = "#ccffcc";
            var pointLight = new THREE.PointLight(pointColor);
            pointLight.position.set(-5, 35, 0);
            pointLight.intensity = 5;
            pointLight.decay = 2;

            pointLight.castShadow = true;

            scene.add(pointLight);

            light2 = new THREE.PointLight(0xc4c4c4, 10);
            light2.position.set(500, 100, 0);
            light2.castShadow = true;
            light2.intensity = 8;
            scene.add(light2);
            light3 = new THREE.PointLight(0xc4c4c4, 10);
            light3.position.set(0, 100, -500);
            light3.castShadow = true;
            light3.intensity = 8;
            scene.add(light3);
            light4 = new THREE.PointLight(0xc4c4c4, 10);
            light4.position.set(-500, 300, 500);
            light4.castShadow = true;
            light4.intensity = 8;
            scene.add(light4);

            loader.load('../gLTF/Flamingo.glb', function (result) {
                mesh = result.scene.children[0];
                mesh.scale.set(0.025, 0.025, 0.025);
                mesh.position.set(30, 0, 0);

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                pivot = new THREE.Group();
                scene.add(pivot);
                pivot.add(mesh);

                const mixer = new THREE.AnimationMixer(mesh);
                mixer.clipAction(result.animations[0]).setDuration(1).play();
                mixers.push(mixer);
            });



            loader.load('../gLTF/Flamingo.glb', function (result) {
                mesh2 = result.scene.children[0];
                mesh2.scale.set(0.025, 0.025, 0.025);
                mesh2.position.set(-25, -15, 0);

                mesh2.castShadow = true;
                mesh2.receiveShadow = true;

                pivot2 = new THREE.Group();
                scene.add(pivot2);
                pivot2.add(mesh2);

                const mixer = new THREE.AnimationMixer(mesh2);
                mixer.clipAction(result.animations[0]).setDuration(1).play();
                mixers2.push(mixer);
            });

            loader1.load('../gLTF/sun.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(-5, 35, 0);
                //20
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 4, 4);
                scene.add(result.scene);
            });
        }

    function render() {

        // stats.update();
        var delta = clock.getDelta();
        orbitControls.update(delta);
        // trackballControls.update(clock.getDelta());

        if (mesh) {
            pivot.rotation.y -= 0.0125 / 2;
            pivot2.rotation.y += 0.0125 / 1.5;
        }

        requestAnimationFrame(render);
        renderer.render(scene, camera);
        for (let i = 0; i < mixers.length; i++) {
            mixers2[i].update(delta);
            mixers[i].update(delta);
        }
    }

}