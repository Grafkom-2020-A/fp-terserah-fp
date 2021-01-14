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
    var mesh3;
    var pivot3;

    var cloud;
    createPointCloud(3, true, 1, true,
        0xffffff);
    render();

    function createPointCloud(size, transparent, opacity, sizeAttenuation, color) {


        var texture = new THREE.TextureLoader().load("../particles/snowflake2_t.png");
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

        var ambientLight = new THREE.AmbientLight("#ffffff");
        scene.add(ambientLight);

        // weather = 'Sun';


        var loader = new THREE.GLTFLoader();
        loader.load('../gLTF/scene.gltf', function (result) {
            // correctly position the scene
            result.scene.position.set(0, -50, 0);
            result.scene.scale.set(0.05, 0.05, 0.05);
            var model = result.scene;
            model.traverse((o) => {
                if (o.isMesh) {
                    var textureg = new THREE.TextureLoader().load("../particles/g.png");
                    // ketutup salju
                    o.material.emissiveMap = textureg;
                    o.material.emissiveIntensity = 0.4;
                    //kena hujan
                    // o.material.emissiveMap = texturewat;
                    // o.material.emissiveIntensity = 0.2;
                    // o.material.roughness = 0.4;
                    // o.material.metalness = 1;
                }
            });
            scene.add(result.scene);
        });

        loader.load('../gLTF/air.gltf', function (result) {
            // correctly position the scene
            mesh3 = result.scene;
            mesh3.position.set(50, -5, 10);
            //20
            mesh3.scale.set(3, 3, 3);
            mesh3.rotateY(-0.8 * Math.PI);
            mesh3.castShadow = true;
            mesh3.receiveShadow = false;
            scene.add(mesh3);

            pivot3 = new THREE.Group();
            scene.add(pivot3);
            pivot3.add(mesh3);
        });


        // initDefaultLighting(scene);
        var loader1 = new THREE.GLTFLoader();

        light2 = new THREE.PointLight(0xc4c4c4, 10);
        light2.position.set(500, 100, 0);
        light2.castShadow = true;
        light2.intensity = 10;
        scene.add(light2);
        light3 = new THREE.PointLight(0xc4c4c4, 10);
        light3.position.set(0, 100, -500);
        light3.castShadow = true;
        light3.intensity = 10;
        scene.add(light3);
        light4 = new THREE.PointLight(0xc4c4c4, 10);
        light4.position.set(-500, 300, 500);
        light4.castShadow = true;
        light4.intensity = 10;
        scene.add(light4);

        loader1.load('../gLTF/clouds.gltf', function (result) {
            // correctly position the scene
            result.scene.position.set(-5, 20, 0);
            // result.scene.scale.set(10, 10, 10);
            result.scene.scale.set(4, 4, 4);
            scene.add(result.scene);
        });

        loader1.load('../gLTF/clouds.gltf', function (result) {
            // correctly position the scene
            result.scene.position.set(-30, 20, 0);
            // result.scene.scale.set(10, 10, 10);
            result.scene.scale.set(4, 4, 4);
            scene.add(result.scene);
        });

        loader1.load('../gLTF/clouds.gltf', function (result) {
            // correctly position the scene
            result.scene.position.set(20, 20, 0);
            // result.scene.scale.set(10, 10, 10);
            result.scene.scale.set(4, 4, 4);
            scene.add(result.scene);
        });

            loader1.load('../gLTF/clouds.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(-5, 20, 0);
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 4, 4);
                scene.add(result.scene);
            });

            loader1.load('../gLTF/clouds.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(-30, 20, 0);
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 4, 4);
                scene.add(result.scene);
            });

            loader1.load('../gLTF/clouds.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(20, 20, 0);
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 4, 4);
                scene.add(result.scene);
            });

            loader1.load('../gLTF/clouds.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(-5, 20, 0);
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 4, 4);
                scene.add(result.scene);
            });

            loader1.load('../gLTF/clouds.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(-30, 20, 0);
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 4, 4);
                scene.add(result.scene);
            });

            loader1.load('../gLTF/clouds.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(20, 20, 0);
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 4, 4);
                scene.add(result.scene);
            });

            var range = 40;
            for (var i = 0; i < 750; i++) {
                if (i % 5 == 0) {
                    var particle = new THREE.Vector3(
                        Math.random() * range - range / 2,
                        0.3 * range * 1.5,
                        //Math.random() * range - range / 2
                        -6 + (i / 100)
                    )
                    particle.velocityY = 0.1 + Math.random() / 5;
                    particle.velocityX = (Math.random() - 0.5) / 3;
                    geom.vertices.push(particle);
                    geom.colors.push(
                        new THREE.Color(Math.random() * 0xffffff)
                    );
                }
            }

            range = 40;
            for (var i = 0; i < 750; i++) {
                if (i % 5 == 0) {
                    var particle = new THREE.Vector3(
                        7 + Math.random() * range - range / 2,
                        0.3 * range * 1.5,
                        // Math.random() * range - range / 2
                        -13 + (i / 100)
                    )
                    particle.velocityY = 0.1 + Math.random() / 5;
                    particle.velocityX = (Math.random() - 0.5) / 3;
                    geom.vertices.push(particle);
                    geom.colors.push(
                        new THREE.Color(Math.random() * 0xffffff)
                    );
                }
            }

            range = 40;
            for (var i = 0; i < 750; i++) {
                if (i % 5 == 0) {
                    var particle = new THREE.Vector3(-17 + Math.random() * range - range / 2,
                        0.3 * range * 1.5,
                        // Math.random() * range - range / 2
                        -6 + (i / 100)
                    )
                    particle.velocityY = 0.1 + Math.random() / 5;
                    particle.velocityX = (Math.random() - 0.5) / 3;
                    geom.vertices.push(particle);
                    geom.colors.push(
                        new THREE.Color(Math.random() * 0xffffff)
                    );
                }
            }

            range = 40;
            for (var i = 0; i < 750; i++) {
                if (i % 5 == 0) {

                    var particle = new THREE.Vector3(-10 + Math.random() * range - range / 2,
                        0.3 * range * 1.5,
                        // Math.random() * range - range / 2
                        -13 + (i / 100)
                    )
                    particle.velocityY = 0.1 + Math.random() / 5;
                    particle.velocityX = (Math.random() - 0.5) / 3;
                    geom.vertices.push(particle);
                    geom.colors.push(
                        new THREE.Color(Math.random() * 0xffffff)
                    );
                }
            }

            range = 40;
            for (var i = 0; i < 750; i++) {
                if (i % 5 == 0) {
                    var particle = new THREE.Vector3(
                        21 + Math.random() * range - range / 2,
                        0.3 * range * 1.5,
                        // Math.random() * range - range / 4
                        -6 + (i / 100)
                    )
                    particle.velocityY = 0.1 + Math.random() / 5;
                    particle.velocityX = (Math.random() - 0.5) / 3;
                    geom.vertices.push(particle);
                    geom.colors.push(
                        new THREE.Color(Math.random() * 0xffffff)
                    );
                }
            }

            range = 40;
            for (var i = 0; i < 750; i++) {
                if (i % 5 == 0) {
                    var particle = new THREE.Vector3(
                        28 + Math.random() * range - range / 2,
                        0.3 * range * 1.5,
                        // Math.random() * range - range / 4
                        -13 + (i / 100)
                    )
                    particle.velocityY = 0.1 + Math.random() / 5;
                    particle.velocityX = (Math.random() - 0.5) / 3;
                    geom.vertices.push(particle);
                    geom.colors.push(
                        new THREE.Color(Math.random() * 0xffffff)
                    );
                }
            }
        cloud = new THREE.Points(geom, material);
        cloud.sortParticles = true;
        cloud.name = "particles1"

        scene.add(cloud);
    }

    function render() {

        // stats.update();
        var delta = clock.getDelta();
        orbitControls.update(delta);
        // trackballControls.update(clock.getDelta());
        var vertices = cloud.geometry.vertices;
        vertices.forEach(function (v) {
            v.y = v.y - (v.velocityY);
            v.x = v.x - (v.velocityX);

            if (v.y <= -45) v.y = 15;
            if (v.x <= -40 || v.x >= 40) v.velocityX = v.velocityX * -1;
        });
        cloud.geometry.verticesNeedUpdate = true;

        if (mesh3){
            pivot3.rotation.y -= 0.0125 / 5;
        }

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

}