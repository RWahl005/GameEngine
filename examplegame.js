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

var barrier = new Cube(new Vector3D(3, 2, 2), {color: 0xFF0000}).setPosition(new Vector3D(0, -1, -50));

var barriers = [barrier, new Cube(new Vector3D(2, 2, 2), {color: 0xFF0000}).setPosition(new Vector3D(-3.5, -1, -90)),
    new Cube(new Vector3D(2, 2, 2), {color: 0xFF0000}).setPosition(new Vector3D(3.5, -1, -90)),
    new Cube(new Vector3D(5, 2, 2), {color: 0xFF0000}).setPosition(new Vector3D(0, -1, -110))];

var dead = false;

var test = new GText("Test Game");
test.setPosition(100, 100);
test.setColor("red");
GameObjects.add(test);

var frames = 0;

EventHandler.registerHandler(UpdateEvent, e => {
    
    if(frames < 20) frames++;
    else{
        if(Collider3D.isCollidingList(player, barriers)){ 
        
            test.setText("Game Over"); 
            tre.stop();
            return;
        }
    }
    player.translateBy(new Vector3D(0, 0, -1));
    Camera.setPosition(player.getPosition().add(0, 2, 5));
    if(Collider3D.isColliding(player, ground)){
        player.translateBy(new Vector3D(0, 0.07, 0));
        Camera.setPosition(player.getPosition().add(0, 2, 5));
        return;
    }
    
    if(KeyHandler.isKeyDown("w")){
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

function isThisCollidingList(obj, list){
    var ifTrue = false;
    for(var i in list){
        if(Collider3D.isColliding(obj, list[i])){
            ifTrue = true;
            break;
        }
    }
    return ifTrue;
}

var time = 0;

var colors = [0x00FFFF, 0xFF0000];

EventHandler.registerHandler(UpdateEvent, e => {
    // console.log(e.getDeltaTime() / 60);
    // console.log(e.getDeltaTime());
    time += (1 * (e.getDeltaTime() / 60));
    console.log(time);
    if(time > 2){
        for(let i in barriers){
            barriers[i].setMaterial({color : colors[Math.floor(Math.random() * 2)]});
        }
        time = 0;
    }
});