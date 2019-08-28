const tre = new ThreeEngine();
tre.start();

var player =  new Sphere(0.5, 10, 10);
// var player = new Cube(new Vector3D(1, 1, 1));
player.setPosition(new Vector3D(0, -1, 0));
var ground = new Cube(new Vector3D(10, 1, 500), {color: 0x00FFFF});
ground.setPosition(new Vector3D(0, -2, -250));

var wall = new Cube(new Vector3D(1, 2, 500));
wall.setPosition(new Vector3D(-5, -1, -250));

var wall2 = new Cube(new Vector3D(1, 2, 500));
wall2.setPosition(new Vector3D(5, -1, -250));

var barrier = new Cube(new Vector3D(3, 2, 1));
barrier.setPosition(new Vector3D(0, -1, -40));

var barriers = [barrier];

var dead = false;

var test = new GText("Test Game");
test.setPosition(100, 100);
test.setColor("red");
GameObjects.add(test);

EventHandler.registerHandler(UpdateEvent, e => {
    if(Collider3D.isColliding(player, barrier)){ 
        console.log("works");
        dead = true;
    }
    else {dead = false;}
    // console.log(player.getPosition());
    // console.log(dead);
    // player.translateBy(new Vector3D(0, 0, -1));
    Camera.setPosition(player.getPosition().add(0, 2, 5));
    if(Collider3D.isColliding(player, ground)){
        player.translateBy(new Vector3D(0, 0.07, 0));
        Camera.setPosition(player.getPosition().add(0, 2, 5));
        return;
    }
    if(KeyHandler.isKeyDown("w")){
        if(dead) return;
        player.translateBy(new Vector3D(0, 0, -1));
    }
    if(KeyHandler.isKeyDown("s")){
        if(dead) return;
        player.translateBy(new Vector3D(0, 0, 1));
    }
    if(KeyHandler.isKeyDown("a")){
        if(Collider3D.isColliding(player, wall)){
            Camera.setPosition(player.getPosition().add(0, 2, 5));
            return;
        }
        player.translateBy(new Vector3D(-1 * (GameEngine.deltaTime / 60), 0, 0));
    }
    if(KeyHandler.isKeyDown("d")){
        if(Collider3D.isColliding(player, wall2)){
            console.log("it is");
            Camera.setPosition(player.getPosition().add(0, 2, 5));
            return;
        }
        player.translateBy(new Vector3D(1 * (GameEngine.deltaTime / 60), 0, 0));
    }
    
});
