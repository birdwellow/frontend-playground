var container, scene, camera, renderer, controls;

init();
animate();

function init() {

    var vertexShader =
        "    uniform vec3 viewVector;\n" +
        "    uniform float c;\n" +
        "    uniform float p;\n" +
        "    varying float intensity;\n" +
        "    void main()\n" +
        "    {\n" +
        "        vec3 vNormal = normalize( normalMatrix * normal );\n" +
        "        vec3 vNormel = normalize( normalMatrix * viewVector );\n" +
        "        intensity = pow( c - dot(vNormal, vNormel), p );\n" +
        "        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n" +
        "    }";

    var fragmentShader =
        "    uniform vec3 glowColor;\n" +
        "    varying float intensity;\n" +
        "    void main()\n" +
        "    {\n" +
        "        vec3 glow = glowColor * intensity;\n" +
        "        gl_FragColor = vec4( glow, 1.0 );\n" +
        "    }";

    // SCENE
    scene = new THREE.Scene();


    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45,
        ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
        NEAR = 0.1,
        FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0,100,400);
    camera.lookAt(scene.position);
    scene.add(camera);


    // RENDERER
    renderer = new THREE.WebGLRenderer( {antialias:true} );
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.getElementById( 'ThreeJS' );
    container.appendChild( renderer.domElement );


    // EVENTS
    // CONTROLS
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );


    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,250,0);
    scene.add(light);


    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 10, 10 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -100.5;
    floor.rotation.x = Math.PI / 2;


    // SKYBOX/FOG
    var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
    var materialArray = [];
    for (var i = 0; i < 6; i++) {
        materialArray.push(new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(''),
            side: THREE.BackSide
        }));
    }
    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    scene.add( skyBox );


    ////////////
    // CUSTOM //
    ////////////


    // MOON
    var sphereGeom = new THREE.SphereGeometry(100, 32, 16);

    var moonMaterial = new THREE.MeshBasicMaterial( { color: '#444' } );
    var moon = new THREE.Mesh(sphereGeom, moonMaterial);
    moon.position.set(150,0,-150);
    scene.add(moon);


    // Glow parameters

    var side = THREE.FrontSide;
    // var side = THREE.BackSide;

    // var blending = THREE.NormalBlending;
    var blending = THREE.AdditiveBlending;

    var c = 1.0;
    var p = 1.4;
    var glowColor = 0xffff00;

    // create custom material from the shader code above
    //   that is within specially labeled script tags
    var customMaterial = new THREE.ShaderMaterial({
        uniforms: {
            "c": {
                type: "f",
                value: 0.1
            },
            "p": {
                type: "f",
                value: 1.8
            },
            glowColor: {
                type: "c",
                value: new THREE.Color(glowColor)
            },
            viewVector: {
                type: "v3",
                value: camera.position
            }
        },
        vertexShader:   vertexShader,
        fragmentShader: fragmentShader,
        side: side,
        blending: blending,
        transparent: true
    });

    var moonGlowGeometry = sphereGeom.clone();
    var modifier = new THREE.SubdivisionModifier( 2 );
    modifier.modify( moonGlowGeometry );
    moonGlow = new THREE.Mesh(moonGlowGeometry, customMaterial.clone());
    moonGlow.position = moon.position;
    moonGlow.scale.multiplyScalar(1.2);
    scene.add( moonGlow );


    var cubeGeom = new THREE.CubeGeometry(150,150,150,2,2,2);
    var crateMaterial = new THREE.MeshBasicMaterial( { color: '#222' } );
    var crate = new THREE.Mesh(cubeGeom, crateMaterial);
    crate.position.set(-150,0,-150);
    scene.add(crate);

    var smoothCubeGeom = cubeGeom.clone();
    // var modifier = new THREE.SubdivisionModifier( 2 );
    modifier.modify( smoothCubeGeom );

    crateGlow = new THREE.Mesh( smoothCubeGeom, customMaterial.clone() );
    crateGlow.position = crate.position;
    crateGlow.scale.multiplyScalar(1.5);
    scene.add( crateGlow );

}

function animate() {
    requestAnimationFrame( animate );
    render();
    update();
}

function update() {
    controls.update();
    moonGlow.material.uniforms.viewVector.value =
        new THREE.Vector3().subVectors( camera.position, moonGlow.position );
    crateGlow.material.uniforms.viewVector.value =
        new THREE.Vector3().subVectors( camera.position, crateGlow.position );
}

function render() {
    renderer.render( scene, camera );
}
