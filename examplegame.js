/**
 * Example Game programmed using GameEngine.js and ThreeEngine.js
 * Powered by THREE.js
 */

const tre = new ThreeEngine();
tre.start();

var player = new Sphere(0.5, 10, 10);;
player.setPosition(new Vector3D(0, -1, 0));
player.show();
var ground = new Cube(new Vector3D(10, 1, 500), { color: 0x00FFFF });
ground.setPosition(new Vector3D(0, -2, -250));
ground.show();
var wall = new Cube(new Vector3D(1, 2, 500));
wall.setPosition(new Vector3D(-5, -1, -250));
wall.show();
var wall2 = new Cube(new Vector3D(1, 2, 500));
wall2.setPosition(new Vector3D(5, -1, -250));
wall2.show();

var levelNum = 1;

var level1 = [new Cube(new Vector3D(3, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(0, -1, -50)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(-3.5, -1, -90)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(3.5, -1, -90)),
new Cube(new Vector3D(5, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(0, -1, -110)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(-3.5, -1, -120)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(3.5, -1, -130))];

var collectables = [new Cube(new Vector3D(0.5, 0.5, 0.5), { color: 0xffee00 }).setPosition(new Vector3D(0, -1, -20)),
new Cube(new Vector3D(0.5, 0.5, 0.5), { color: 0xffee00 }).setPosition(new Vector3D(-3.5, -1, -110))]

var levels = [[new Cube(new Vector3D(3, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(0, -1, -50)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(-3.5, -1, -90)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(3.5, -1, -90)),
new Cube(new Vector3D(5, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(0, -1, -110))]];

var scoreCount = 0;

var score = new GText("Score: 0");
score.setPosition(100, 100);
score.setColor("white");
GameObjects.add(score);

var gameover = new GText("Game Over");
gameover.setPosition(window.innerWidth / 2, window.innerHeight / 2);
gameover.setColor("red");
gameover.setSize("100px");

if (DataHandler.getData("levelNum") == null)
    DataHandler.setData("levelNum", levelNum);

levelNum = DataHandler.getData("levelNum");

var frames = 0;

/*
    Main Update Loop.
*/
loadLevel();
EventHandler.registerHandler(UpdateEvent, e => {

    if (frames < 20) frames++;
    else {
        if (Collider3D.isCollidingList(player, level1)) {

            GameObjects.add(gameover);
            tre.stop();
            return;
        }
    }

    score.setText("Score: " + scoreCount);

    player.translateBy(new Vector3D(0, 0, -1));
    Camera.setPosition(player.getPosition().add(0, 2, 5));
    if (Collider3D.isColliding(player, ground)) {
        player.translateBy(new Vector3D(0, 0.07, 0));
        Camera.setPosition(player.getPosition().add(0, 2, 5));
        return;
    }
    if (KeyHandler.isKeyDown("a")) {
        if (Collider3D.isColliding(player, wall)) {
            Camera.setPosition(player.getPosition().add(0, 2, 5));
            return;
        }
        player.translateBy(new Vector3D(-1 * (GameEngine.deltaTime / 60), 0, 0));
    }
    if (KeyHandler.isKeyDown("d")) {
        if (Collider3D.isColliding(player, wall2)) {
            console.log("it is");
            Camera.setPosition(player.getPosition().add(0, 2, 5));
            return;
        }
        player.translateBy(new Vector3D(1 * (GameEngine.deltaTime / 60), 0, 0));
    }

});

EventHandler.registerHandler(UpdateEvent, e => {
    collectables.forEach(item => item.rotateBy(new Vector3D(0, 5 * e.getDeltaTime() / 1000, 5 * e.getDeltaTime() / 1000)));

    if (frames < 20) { frames++; return; }

    if (Collider3D.isCollidingList(player, collectables)) {
        scoreCount += 1;
        Collider3D.getCollidingObjects(player, collectables)[0].hide();
    }

});


function loadLevel() {

    if (levelNum == 1) {
        level1.forEach(item => item.show());
        collectables.forEach(item => item.show());
    }


}

function isThisCollidingList(obj, list) {
    var ifTrue = false;
    for (var i in list) {
        if (Collider3D.isColliding(obj, list[i])) {
            ifTrue = true;
            break;
        }
    }
    return ifTrue;
}

var time = 0.1;

var colors = [0xcb42f5, 0xFF0000, 0xf5b942, 0x0051ff];

EventHandler.registerHandler(UpdateEvent, e => {
    // console.log(e.getDeltaTime() / 60);
    // if (frames < 20) { frames++; return; };
    console.log(e.getDeltaTime() / 1000);
    time += e.getDeltaTime() / 1000;
    console.log(time);
    if (time > 0.5) {
        for (let i in level1) {
            level1[i].setMaterial({ color: colors[Math.floor(Math.random() * 4)] });
            level1[i].getMesh().material.needsUpdate = true;
        }
        time = 0;
    }
});