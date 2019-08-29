/**

    Runs off three.js

*/

var oldTime;

class ThreeEngine {
    constructor() {}

    static scene;
    static renderer;
    static camera;
    static ui;
    static alive = true;

    start() {
        ThreeEngine.scene = new THREE.Scene();
        ThreeEngine.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        ThreeEngine.renderer = new THREE.WebGLRenderer();
        var renderer = ThreeEngine.renderer;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false;
        document.body.appendChild(renderer.domElement);
        ThreeEngine.alive = true;
        requestAnimationFrame(animate);
        ThreeEngine.ui = new UI();
        ThreeEngine.renderer.render(ThreeEngine.scene, ThreeEngine.camera);
        ThreeEngine.renderer.render(ThreeEngine.getUI().scene, ThreeEngine.getUI().camera);
        GameEngine.canvas = ThreeEngine.ui.canvas.getContext('2d');
        window.addEventListener("keydown", function (e) {
            if (!KeyHandler.keysDown.includes(e.key))
                KeyHandler.keysDown.push(e.key);
        });
        window.addEventListener("keyup", function (e) {
            KeyHandler.keysDown.splice(KeyHandler.keysDown.indexOf(e.key), 1);
        });
    }

    stop(){
        ThreeEngine.alive = false;
    }

    static getUI(){
        return ThreeEngine.ui;
    }
}

class Vector3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getZ() {
        return this.z;
    }
    add(vec, y = 0, z = 0){
        if(vec instanceof Vector3D){
            this.x = vec.x;
            this.y = vec.y;
            this.z = vec.z;
        }else{
            this.x += vec;
            this.y += y;
            this.z += z;
        }
        return this;
    }
}

class Camera {
    static setPosition(vec) {
        ThreeEngine.camera.position.x = vec.getX();
        ThreeEngine.camera.position.y = vec.getY();
        ThreeEngine.camera.position.z = vec.getZ();
    }
    static translateBy(vec) {
        ThreeEngine.camera.position.x += vec.getX();
        ThreeEngine.camera.position.y += vec.getY();
        ThreeEngine.camera.position.z += vec.getZ();
    }
    static getPosition() {
        return new Vector3D(ThreeEngine.camera.position.x, ThreeEngine.camera.position.y, ThreeEngine.camera.position.z);
    }

    static setRotation(vec) {
        ThreeEngine.camera.rotation.x = vec.getX();
        ThreeEngine.camera.rotation.y = vec.getY();
        ThreeEngine.camera.rotation.z = vec.getZ();
    }
    static rotateBy(vec) {
        ThreeEngine.camera.rotation.x += vec.getX();
        ThreeEngine.camera.rotation.y += vec.getY();
        ThreeEngine.camera.rotation.z += vec.getZ();
    }
    static getRotation(){
        return new Vector3D(ThreeEngine.camera.rotation.x, ThreeEngine.camera.rotation.y, ThreeEngine.camera.rotation.z);
    }
}

class Collider3D {
    static isColliding(obj1, obj2) {
        for (var vertexIndex = 0; vertexIndex < obj1.getMesh().geometry.vertices.length; vertexIndex++) {
            var localVertex = obj1.getMesh().geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4( obj1.getMesh().matrix );
            var directionVector = globalVertex.sub(obj1.getMesh().position);

            var ray = new THREE.Raycaster(obj1.getMesh().position, directionVector.clone().normalize());
            var collisionResults = ray.intersectObjects([obj2.getMesh()]);
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                return true;
            }
        }
    }

    /**
     * If collding with a list of objects.
     * @param {Object} obj1 
     * @param {Array} list 
     */
    static isCollidingList(obj1, list){
        for (var vertexIndex = 0; vertexIndex < obj1.getMesh().geometry.vertices.length; vertexIndex++) {
            var localVertex = obj1.getMesh().geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4( obj1.getMesh().matrix );
            var directionVector = globalVertex.sub(obj1.getMesh().position);

            var ray = new THREE.Raycaster(obj1.getMesh().position, directionVector.clone().normalize());
            var collisionResults = ray.intersectObjects(Utils3D.convertGObjecttoMeshList(list));
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                return true;
            }
        }
    }
}

class UI{
    constructor(){
        var canvas = document.createElement('canvas');
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        GameEngine.canvas = this.canvas.getContext('2d');
        this.canvas.getContext('2d').fillStyle = "rgba(245,245,245,0.75)";
        this.canvas.getContext('2d').fillText('Initializing...', width / 2, height / 2);

        var hudTexture = new THREE.Texture(this.canvas);
        hudTexture.needsUpdate = true;
        this.hudTexture = hudTexture;
        this.hudTexture.minFilter = THREE.LinearFilter;

        var material = new THREE.MeshBasicMaterial( {map: this.hudTexture} );
        material.transparent = true;

        var width = window.innerWidth;
        var height = window.innerHeight;

        var sceneHUD = new THREE.Scene();
        var cameraHud = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0, 30 );
        this.scene = sceneHUD;
        this.camera = cameraHud;

        this.material = material;
        var planeGeometry = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight );
        var plane = new THREE.Mesh( planeGeometry, this.material );
        this.scene.add( plane );
    }
    draw(){
        
    }
}

class Utils3D{
    /**
     * Convert a list of gameobjects to a list of meshes.
     * @param {*} list 
     */
    static convertGObjecttoMeshList(list){
        var output = [];
        for(var l in list){
            output.push(list[l].getMesh());
        }
        return output;
    }
}

class Cube {
    constructor(vSize, material = {
        color: 0x00ff00
    }) {
        this.geom = new THREE.BoxGeometry(vSize.getX(), vSize.getY(), vSize.getZ());
        this.material = new THREE.MeshBasicMaterial(material);
        this.cube = new THREE.Mesh(this.geom, this.material);
        ThreeEngine.scene.add(this.cube);
    }

    setPosition(vec) {
        this.cube.position.x = vec.getX();
        this.cube.position.y = vec.getY();
        this.cube.position.z = vec.getZ();
        return this;
    }
    setSize(vec) {
        this.cube.scale.x = vec.getX();
        this.cube.scale.y = vec.getY();
        this.cube.scale.z = vec.getZ();
        return this;
    }
    setRotation(vec) {
        this.cube.rotation.x = vec.getX();
        this.cube.rotation.y = vec.getY();
        this.cube.rotation.z = vec.getZ();
        return this;
    }
    setMaterial(material){
        this.cube.material = new THREE.MeshBasicMaterial(material);
    }
    translateBy(vec) {
        this.cube.position.x += vec.getX();
        this.cube.position.y += vec.getY();
        this.cube.position.z += vec.getZ();
        return this;
    }
    rotateBy(vec) {
        this.cube.rotation.x += vec.getX();
        this.cube.rotation.y += vec.getY();
        this.cube.rotation.z += vec.getZ();
        return this;
    }
    getPosition() {
        return new Vector3D(this.cube.position.x, this.cube.position.y, this.cube.position.z);
    }
    getRotation() {
        return new Vector3D(this.cube.rotation.x, this.cube.rotation.y, this.cube.rotation.z);
    }
    getSize() {
        return new Vector3D(this.cube.scale.x, this.cube.scale.y, this.cube.scale.z);
    }
    getMesh(){
        return this.cube;
    }
}

class Sphere {
    constructor(radius = 1, widthSeg = 32, heightSeg = 32, material = {
        color: 0x8E40BC
    }) {
        this.geom = new THREE.SphereGeometry(radius, widthSeg, heightSeg);
        this.material = new THREE.MeshBasicMaterial(material);
        this.sphere = new THREE.Mesh(this.geom, this.material);
        ThreeEngine.scene.add(this.sphere);
    }

    setPosition(vec) {
        this.sphere.position.x = vec.getX();
        this.sphere.position.y = vec.getY();
        this.sphere.position.z = vec.getZ();
    }
    setSize(vec) {
        this.sphere.scale.x = vec.getX();
        this.sphere.scale.y = vec.getY();
        this.sphere.scale.z = vec.getZ();
    }
    setRotation(vec) {
        this.sphere.rotation.x = vec.getX();
        this.sphere.rotation.y = vec.getY();
        this.sphere.rotation.z = vec.getZ();
    }
    translateBy(vec) {
        this.sphere.position.x += vec.getX();
        this.sphere.position.y += vec.getY();
        this.sphere.position.z += vec.getZ();
    }
    rotateBy(vec) {
        this.sphere.rotation.x += vec.getX();
        this.sphere.rotation.y += vec.getY();
        this.sphere.rotation.z += vec.getZ();
    }
    getPosition() {
        return new Vector3D(this.sphere.position.x, this.sphere.position.y, this.sphere.position.z);
    }
    getRotation() {
        return new Vector3D(this.sphere.rotation.x, this.sphere.rotation.y, this.sphere.rotation.z);
    }
    getSize() {
        return new Vector3D(this.sphere.scale.x, this.sphere.scale.y, this.sphere.scale.z);
    }
    getMesh(){
        return this.sphere;
    }
}

class Text3{
    constructor(text = "Default Text", parameters = {color: 0x00FF11}, font = 'fonts/helvetiker_regular.typeface.json'){
        var loader = new THREE.FontLoader();
        var inst = this;
        loader.load( font, function ( font ) {
            inst.text = text;
            inst.parameters = parameters;
            inst.geom = new THREE.TextGeometry(inst.text, inst.parameters);
            ThreeEngine.add(inst.geom);
        });
    }
}

function animate() {
    if(ThreeEngine.alive) requestAnimationFrame(animate);
    EventHandler.fireEvent(UpdateEvent, new UpdateEvent());
    ThreeEngine.getUI().canvas.getContext('2d').clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(var i in GameObjects.getGameObjects()){
        GameObjects.getGameObjects()[i].draw();
    }

    ThreeEngine.ui.hudTexture.needsUpdate = true;

    ThreeEngine.renderer.render(ThreeEngine.scene, ThreeEngine.camera);
    ThreeEngine.renderer.render(ThreeEngine.ui.scene, ThreeEngine.ui.camera);

    var currentTime = Date.now();
    GameEngine.deltaTime = currentTime - oldTime;
    oldTime = currentTime;
}