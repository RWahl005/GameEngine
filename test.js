"use strict";

new ThreeEngine().start();
var cube = new Cube(new Vector3D(1, 1, 1));
cube.setPosition(new Vector3D(0, -1, 0));

// new Text3("Test");
new Sphere();

var magicube = new Cube(new Vector3D(1, 1, 1));
magicube.setPosition(new Vector3D(-2, 3, -10));

var secondCube = new Cube(new Vector3D(1, 1, 1), {color: 0xa903fc});
secondCube.setPosition(new Vector3D(2, 3, -10));

var ground = new Cube(new Vector3D(5, 1, 100), {color: 0x00FFFF});
console.log("called");
var test = new GText();
test.setColor("white");
GameObjects.add(test);

EventHandler.registerHandler(UpdateEvent, e => {
    ground.setPosition(new Vector3D(0, -2, 0));
    magicube.rotateBy(new Vector3D(0, 0.1, 0));
    secondCube.rotateBy(new Vector3D(0, 0.1, -0.1));
    // Camera.rotateBy(new Vector3D(0, 0.1, 0));
    // cube.rotateBy(new Vector3D(0.01, 0.01, 0));
    if(Collider3D.isColliding(cube, ground)){
        cube.translateBy(new Vector3D(0, 0.07, 0));
        Camera.setPosition(cube.getPosition().add(0, 2, 5));
        return;
    }
    if(KeyHandler.isKeyDown("o"))
        cube.translateBy(new Vector3D(0, 1 * (GameEngine.deltaTime / 60), 0));
    if(KeyHandler.isKeyDown("l"))
        cube.translateBy(new Vector3D(0, -1 * (GameEngine.deltaTime / 60), 0));
    if(KeyHandler.isKeyDown("w"))
        cube.translateBy(new Vector3D(0, 0, -1 * (GameEngine.deltaTime / 60)));
    if(KeyHandler.isKeyDown("s"))
        cube.translateBy(new Vector3D(0, 0, 1 * (GameEngine.deltaTime / 60)));
    if(KeyHandler.isKeyDown("a"))
        cube.translateBy(new Vector3D(-1 * (GameEngine.deltaTime / 60), 0, 0));
    if(KeyHandler.isKeyDown("d"))
        cube.translateBy(new Vector3D(1 * (GameEngine.deltaTime / 60), 0, 0));
    Camera.setPosition(cube.getPosition().add(0, 2, 5));
});