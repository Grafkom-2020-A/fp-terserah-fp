$(document).ready(function () {
    $("form").submit(function (e) {
        e.preventDefault();
        var userinput = $("#userInput").val();
        // console.log(userinput);
    });
});

var curweatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?q='; //+city
let appid = '&units=metric&appid=36369af9d5acd7def902ad1bc5f5c968';
let userInput;
let url;
let iterator = -1;

var scene;
var renderer;
var mesh, mesh2, mesh3, mesh4;
var pivot, pivot2, pivot3;

function setup() {
    userInput = select('#userInput');
    searchbutton = select('#searchButton');
    searchbutton.mousePressed(searchbycity);

    nextbutton = select('#nextButton');
    nextbutton.mousePressed(forecastWeatherNext);

    nextbutton = select('#beforeButton');
    nextbutton.mousePressed(forecastWeatherBefore);


}

function searchbycity() {
    let term = userInput.value();
    var id = appid;

    // Load JSON data
    url = curweatherURL + term + id;
    window.value = url;
    loadJSON(url, init, 'json');
    // loadJSON(url, init, 'json');
    console.log(url);
}

function disposeNode (node)
{
    if (node instanceof THREE.Mesh)
    {
        if (node.geometry)
        {
            node.geometry.dispose ();
        }

        if (node.material)
        {
            if (node.material instanceof THREE.MeshFaceMaterial)
            {
                $.each (node.material.materials, function (idx, mtrl)
                {
                    if (mtrl.map)               mtrl.map.dispose ();
                    if (mtrl.lightMap)          mtrl.lightMap.dispose ();
                    if (mtrl.bumpMap)           mtrl.bumpMap.dispose ();
                    if (mtrl.normalMap)         mtrl.normalMap.dispose ();
                    if (mtrl.specularMap)       mtrl.specularMap.dispose ();
                    if (mtrl.envMap)            mtrl.envMap.dispose ();
                    if (mtrl.alphaMap)          mtrl.alphaMap.dispose();
                    if (mtrl.aoMap)             mtrl.aoMap.dispose();
                    if (mtrl.displacementMap)   mtrl.displacementMap.dispose();
                    if (mtrl.emissiveMap)       mtrl.emissiveMap.dispose();
                    if (mtrl.gradientMap)       mtrl.gradientMap.dispose();
                    if (mtrl.metalnessMap)      mtrl.metalnessMap.dispose();
                    if (mtrl.roughnessMap)      mtrl.roughnessMap.dispose();

                    mtrl.dispose ();    // disposes any programs associated with the material
                });
            }
            else
            {
                if (node.material.map)              node.material.map.dispose ();
                if (node.material.lightMap)         node.material.lightMap.dispose ();
                if (node.material.bumpMap)          node.material.bumpMap.dispose ();
                if (node.material.normalMap)        node.material.normalMap.dispose ();
                if (node.material.specularMap)      node.material.specularMap.dispose ();
                if (node.material.envMap)           node.material.envMap.dispose ();
                if (node.material.alphaMap)         node.material.alphaMap.dispose();
                if (node.material.aoMap)            node.material.aoMap.dispose();
                if (node.material.displacementMap)  node.material.displacementMap.dispose();
                if (node.material.emissiveMap)      node.material.emissiveMap.dispose();
                if (node.material.gradientMap)      node.material.gradientMap.dispose();
                if (node.material.metalnessMap)     node.material.metalnessMap.dispose();
                if (node.material.roughnessMap)     node.material.roughnessMap.dispose();

                node.material.dispose ();   // disposes any programs associated with the material
            }
        }
    }
}

function disposeHierarchy (node, callback)
{
    for (var i = node.children.length - 1; i >= 0; i--)
    {
        var child = node.children[i];
        disposeHierarchy (child, callback);
        callback (child);
    }
}

function forecastWeatherNext() {
    disposeHierarchy (mesh4, disposeNode);
    disposeHierarchy (mesh3, disposeNode);
    disposeHierarchy (mesh2, disposeNode);
    disposeHierarchy (mesh, disposeNode);
    disposeHierarchy (pivot3, disposeNode);
    disposeHierarchy (pivot2, disposeNode);
    disposeHierarchy (pivot, disposeNode);
    disposeHierarchy (scene, disposeNode);
    renderer.dispose();
    renderer.forceContextLoss(); 
    renderer.context=undefined;
    renderer.domElement=undefined;
    userInput = select('#userInput');
    let term = userInput.value();
    var id = appid;
    // Load JSON data
    url = forecastURL + term + id;
    window.value = url;
    loadJSON(url, init, 'json');
    // loadJSON(url, init, 'json');
    console.log(url);
    iterator += 1;

}

function forecastWeatherBefore() {
    if (iterator > 0) {
        disposeHierarchy (mesh4, disposeNode);
        disposeHierarchy (mesh3, disposeNode);
        disposeHierarchy (mesh2, disposeNode);
        disposeHierarchy (mesh, disposeNode);
        disposeHierarchy (pivot3, disposeNode);
        disposeHierarchy (pivot2, disposeNode);
        disposeHierarchy (pivot, disposeNode);
        disposeHierarchy (scene, disposeNode);
        renderer.dispose();
        renderer.forceContextLoss(); 
        renderer.context=undefined;
        renderer.domElement=undefined;
        userInput = select('#userInput');
        let term = userInput.value();
        var id = appid;
        // Load JSON data
        url = forecastURL + term + id;
        window.value = url;
        loadJSON(url, init, 'json');
        // loadJSON(url, init, 'json');
        console.log(url);
        iterator -= 1;
    } else {
        searchbycity();
    }


}

function clearstat() {
    $('.Temp').empty();
    $('.Feels_like').empty();
    $('.Temp_min').empty();
    $('.Temp_max').empty();
    $('.City').empty();
    $('.Date').empty();

    // Append data ke HTML Element (Stat Weather Bawah)
    $('.Pressure').empty();
    $('.Humidity').empty();
    $('.Visibility').empty();
    $('.Weather').empty();
}


function init(data) {
    //Process Api disini
    console.log(url);
    clearstat();

    var temp;
    var feels_like;
    var temp_min;
    var temp_max;
    var pressure;
    var humidity;
    var visibility;
    var weather;
    var city;
    var date;

    function isForecast(str2) {
        var str1 = forecastURL; //Length of str1 is 30
        var n = str2.indexOf(str1);
        console.log(n);
        return n;
    }

    if (isForecast(url) != -1) {
        // Assign data dari API ke variabel (forecast) 
        temp = data.list[iterator].main.temp;
        feels_like = data.list[iterator].main.feels_like;
        temp_min = data.list[iterator].main.temp_min;
        temp_max = data.list[iterator].main.temp_max;
        pressure = data.list[iterator].main.pressure;
        humidity = data.list[iterator].main.humidity;
        visibility = data.list[iterator].visibility;
        weather = data.list[iterator].weather[0].main;
        city = data.city.name;
        date = data.list[iterator].dt_txt;

    } else {

        //Assign Data dari Current weather API ke variable
        temp = data.main.temp;
        feels_like = data.main.feels_like;
        temp_min = data.main.temp_min;
        temp_max = data.main.temp_max;
        pressure = data.main.pressure;
        humidity = data.main.humidity;
        visibility = data.visibility;
        weather = data.weather[0].main;
        city = data.name;
        // datevar = new Date();
        // date = datevar.toLocaleString();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var hours = today.toLocaleTimeString();
        today = dd + '/' + mm + '/' + yyyy + ' ' + hours;
        date = today.toLocaleString();
        var x = hours.split(':'); 
        var hours_only = parseInt(x[0]);
    }


    // // Assign data dari API ke variabel (forecast) 
    // var temp = data.list[0].main.temp;
    // var feels_like = data.list[0].main.feels_like;
    // var temp_min = data.list[0].main.temp_min;
    // var temp_max = data.list[0].main.temp_max;
    // var pressure = data.list[0].main.pressure;
    // var sea_level = data.list[0].main.sea_level;
    // var humidity = data.list[0].main.humidity;
    // var visibility = data.list[0].visibility;
    // var weather = data.list[0].weather[0].main;
    // var city = data.city.name;
    // var date = data.list[0].dt_txt;


    // Append data ke HTML Element (Stat Weather Atas)
    $('.Temp').append(temp + "°C");
    $('.Feels_like').append("Terasa Seperti: " + feels_like + "°C");
    $('.Temp_min').append("Min: " + temp_min + "°C");
    $('.Temp_max').append("Maks: " + temp_max + "°C");
    $('.City').append(city);
    $('.Date').append(date);

    // Append data ke HTML Element (Stat Weather Bawah)
    $('.Pressure').append("Tekanan Udara: " + pressure + " hPa");
    $('.Humidity').append("Kelembapan: " + humidity + "%");
    $('.Visibility').append("Visibilitas: " + visibility + " m");
    // $('.Weather').append(weather);

    console.log(weather);


    //SEMUA YANG ADA SANGKUT PAUT SAMA THREE.JS DISINI


    // var stats = initStats();
    renderer = initRenderer();
    renderer.physicallyCorrectLights = true;
    // renderer.gammaOutput = true;
    // renderer.gammaFactor = 2.2;
    var camera = initCamera(new THREE.Vector3(0, 0, 100));
    var orbitControls = initOrbitControls(camera, renderer);
    var clock = new THREE.Clock();
    scene = new THREE.Scene();
    var mixers = [];
    var mixers2 = [];
    mesh = new THREE.Mesh();
    mesh2 = new THREE.Mesh();
    mesh3 = new THREE.Mesh();
    mesh4 = new THREE.Mesh();
    pivot = new THREE.Object3D();
    pivot2 = new THREE.Object3D();
    pivot3 = new THREE.Object3D();

    var cloud;
    createPointCloud(3, true, 1, true,
        0xffffff);
    render();

    function createPointCloud(size, transparent, opacity, sizeAttenuation, color) {


        var texture = new THREE.TextureLoader().load("../particles/raindrop-3.png");
        var texture2 = new THREE.TextureLoader().load("../particles/snowflake2_t.png");
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
                    if (weather == 'Snow') {
                        var textureg = new THREE.TextureLoader().load("../particles/g.png");
                        // ketutup salju
                        o.material.emissiveMap = textureg;
                        o.material.emissiveIntensity = 0.4;
                    }
                    if (weather == 'Rain' || weather == 'Thunderstorm') {
                        var texturewat = new THREE.TextureLoader().load("../particles/wat.png");
                        // ketutup salju
                        o.material.emissiveMap = texturewat;
                        o.material.emissiveIntensity = 0.15;
                    }
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
        if (weather == 'Clouds') {
            $('.Weather').append("Berawan");
            var pointColor = "#ccffcc";
            var pointLight = new THREE.PointLight(pointColor);
            pointLight.position.set(-5, 35, 0);
            pointLight.intensity = 4;
            pointLight.decay = 2;

            pointLight.castShadow = true;

            scene.add(pointLight);
            light2 = new THREE.PointLight(0xc4c4c4, 10);
            light2.position.set(500, 100, 0);
            light2.castShadow = true;
            light2.intensity = 3;
            scene.add(light2);
            light3 = new THREE.PointLight(0xc4c4c4, 10);
            light3.position.set(0, 100, -500);
            light3.castShadow = true;
            light3.intensity = 3;
            scene.add(light3);
            light4 = new THREE.PointLight(0xc4c4c4, 10);
            light4.position.set(-500, 300, 500);
            light4.castShadow = true;
            light4.intensity = 3;
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
             if (hours_only>5 && hours_only<18) {
                //matahari
                loader1.load('../gLTF/new/scene.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(-5, 35, 0);
                //20
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 6, 4);
                scene.add(result.scene);
                });
            } else {
                loader1.load('../gLTF/moon/scene.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(-5, 35, 0);
                //20
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 6, 4);
                scene.add(result.scene);
                });
            }
            // loader1.load('../gLTF/new/scene.gltf', function (result) {
            //     // correctly position the scene
            //     result.scene.position.set(-5, 35, 0);
            //     //20
            //     // result.scene.scale.set(10, 10, 10);
            //     result.scene.scale.set(4, 4, 4);
            //     scene.add(result.scene);
            // });

            loader1.load('../gLTF/clouds.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(-5, 20, 0);
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(3, 3, 3);
                scene.add(result.scene);
            });

            loader1.load('../gLTF/clouds.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(-40, 20, 0);
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(3, 3, 3);
                scene.add(result.scene);
            });

            loader1.load('../gLTF/clouds.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(30, 20, 0);
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(3, 3, 3);
                scene.add(result.scene);
            });
        } else if (weather == 'Rain' || weather == 'Drizzle' || weather == 'Thunderstorm') {
            $('.Weather').append("Hujan");
            light2 = new THREE.PointLight(0xc4c4c4, 10);
            light2.position.set(500, 100, 0);
            light2.castShadow = true;
            light2.intensity = 4;
            scene.add(light2);
            light3 = new THREE.PointLight(0xc4c4c4, 10);
            light3.position.set(0, 100, -500);
            light3.castShadow = true;
            light3.intensity = 4;
            scene.add(light3);
            light4 = new THREE.PointLight(0xc4c4c4, 10);
            light4.position.set(-500, 300, 500);
            light4.castShadow = true;
            light4.intensity = 4;
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

            var range = 40;
            for (var i = 0; i < 750; i++) {
                var particle = new THREE.Vector3(
                    Math.random() * range - range / 2,
                    0.3 * range * 1.5,
                    //Math.random() * range - range / 2
                    -6 + (i / 100)
                )
                particle.velocityY = 0.1 + Math.random() / 5;
                particle.velocityX = 0;
                geom.vertices.push(particle);
                geom.colors.push(
                    new THREE.Color(Math.random() * 0xffffff)
                );
            }

            range = 40;
            for (var i = 0; i < 750; i++) {
                var particle = new THREE.Vector3(
                    7 + Math.random() * range - range / 2,
                    0.3 * range * 1.5,
                    // Math.random() * range - range / 2
                    -13 + (i / 100)
                )
                particle.velocityY = 0.1 + Math.random() / 5;
                particle.velocityX = 0;
                geom.vertices.push(particle);
                geom.colors.push(
                    new THREE.Color(Math.random() * 0xffffff)
                );
            }

            range = 40;
            for (var i = 0; i < 750; i++) {
                var particle = new THREE.Vector3(-17 + Math.random() * range - range / 2,
                    0.3 * range * 1.5,
                    // Math.random() * range - range / 2
                    -6 + (i / 100)
                )
                particle.velocityY = 0.1 + Math.random() / 5;
                particle.velocityX = 0;
                geom.vertices.push(particle);
                geom.colors.push(
                    new THREE.Color(Math.random() * 0xffffff)
                );
            }

            range = 40;
            for (var i = 0; i < 750; i++) {
                var particle = new THREE.Vector3(-10 + Math.random() * range - range / 2,
                    0.3 * range * 1.5,
                    // Math.random() * range - range / 2
                    -13 + (i / 100)
                )
                particle.velocityY = 0.1 + Math.random() / 5;
                particle.velocityX = 0;
                geom.vertices.push(particle);
                geom.colors.push(
                    new THREE.Color(Math.random() * 0xffffff)
                );
            }

            range = 40;
            for (var i = 0; i < 750; i++) {
                var particle = new THREE.Vector3(
                    21 + Math.random() * range - range / 2,
                    0.3 * range * 1.5,
                    // Math.random() * range - range / 4
                    -6 + (i / 100)
                )
                particle.velocityY = 0.1 + Math.random() / 5;
                particle.velocityX = 0;
                geom.vertices.push(particle);
                geom.colors.push(
                    new THREE.Color(Math.random() * 0xffffff)
                );
            }

            range = 40;
            for (var i = 0; i < 750; i++) {
                var particle = new THREE.Vector3(
                    28 + Math.random() * range - range / 2,
                    0.3 * range * 1.5,
                    // Math.random() * range - range / 4
                    -13 + (i / 100)
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

            scene.add(cloud);

        } else if (weather == 'Snow') {
            $('.Weather').append("Salju");
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
            cloud = new THREE.Points(geom, material2);
            cloud.sortParticles = true;
            cloud.name = "particles2"

            scene.add(cloud);
        } else {
            $('.Weather').append("Cerah");

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

            loader.load('../gLTF/air2.glb', function (result) {
                // correctly position the scene
                mesh4 = result.scene;
                mesh4.position.set(200, 18, 0);
                //20
                // result.scene.scale.set(10, 10, 10);
                mesh4.scale.set(0.25, 0.25, 0.25);
                mesh4.rotateY(0.5 * Math.PI);
                mesh4.castShadow = true;
                mesh4.receiveShadow = true;
                scene.add(mesh4);
            });

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

            if (hours_only>5 && hours_only<18) {
                //matahari
                loader1.load('../gLTF/new/scene.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(-5, 35, 0);
                //20
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 6, 4);
                scene.add(result.scene);
                });
            } else {
                loader1.load('../gLTF/moon/scene.gltf', function (result) {
                // correctly position the scene
                result.scene.position.set(-5, 35, 0);
                //20
                // result.scene.scale.set(10, 10, 10);
                result.scene.scale.set(4, 6, 4);
                scene.add(result.scene);
                });
            }
        }

        // var helper = new THREE.PointLightHelper(pointLight);
        // scene.add(helper);

        // var shadowHelper = new THREE.CameraHelper(pointLight.shadow.camera)
        // scene.add(shadowHelper);

        // var helper = new THREE.PointLightHelper(light4);
        // scene.add(helper);

        // var shadowHelper = new THREE.CameraHelper(light4.shadow.camera)
        // scene.add(shadowHelper);

        // var helper = new THREE.PointLightHelper(light2);
        // scene.add(helper);

        // var shadowHelper = new THREE.CameraHelper(light2.shadow.camera)
        // scene.add(shadowHelper);

        // var helper = new THREE.PointLightHelper(light3);
        // scene.add(helper);

        // var shadowHelper = new THREE.CameraHelper(light3.shadow.camera)
        // scene.add(shadowHelper);
    }

    function render() {

        // stats.update();
        var delta = clock.getDelta();
        orbitControls.update(delta);
        // trackballControls.update(clock.getDelta());
        if (weather == 'Rain' || weather == 'Snow' || weather == 'Drizzle' || weather == 'Thunderstorm') {
            var vertices = cloud.geometry.vertices;
            vertices.forEach(function (v) {
                v.y = v.y - (v.velocityY);
                v.x = v.x - (v.velocityX);

                if (v.y <= -45) v.y = 15;
                if (v.x <= -40 || v.x >= 40) v.velocityX = v.velocityX * -1;
            });
            cloud.geometry.verticesNeedUpdate = true;
        }

        if (mesh) {
            pivot.rotation.y -= 0.0125 / 2;
            pivot2.rotation.y += 0.0125 / 1.5;
        }

            if (mesh3){
                pivot3.rotation.y -= 0.0125 / 5;
            }
        
        if (mesh4) {
            if (mesh4.position.x <= -200) mesh4.position.x = 200;
            mesh4.position.x -= 0.5;
        }

        requestAnimationFrame(render);
        renderer.render(scene, camera);
        for (let i = 0; i < mixers.length; i++) {
            mixers2[i].update(delta);
            mixers[i].update(delta);
        }

    }

}