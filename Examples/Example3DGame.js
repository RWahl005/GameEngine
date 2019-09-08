/**
 * Example Game programmed using GameEngine.js and ThreeEngine.js
 * Powered by THREE.js
 * Developed By: Ryan
 */

 import {ThreeEngine, Sphere, Cube, Camera, Collider3D, Collider, GText, KeyHandler, Vector3D} from '../JSEngine/JSEngine3D.js';
 import {DataHandler, EventHandler, GameObjects, UpdateEvent, GameEngine, Rectangle, MouseDownEvent} from '../JSEngine/JSEngine3D.js';

class OnLevelDisplay{}
class OnWin{}

// Create the instance of the ThreeEngine
const tre = new ThreeEngine();
// Start the engine.
tre.start();

// Create the global objects that will always exist.
var player = new Sphere(0.5, 10, 10);
player.setPosition(new Vector3D(0, -1, -2));
player.show();
Camera.setPosition(player.getPosition().add(0, 2, 5));
var ground = new Cube(new Vector3D(10, 1, 500), { color: 0x00FFFF });
ground.setPosition(new Vector3D(0, -2, -250));
ground.show();
var wall = new Cube(new Vector3D(1, 2, 500));
wall.setPosition(new Vector3D(-5, -1, -250));
wall.show();
var wall2 = new Cube(new Vector3D(1, 2, 500));
wall2.setPosition(new Vector3D(5, -1, -250));
wall2.show();

var youWin = new GText("You Win!");
youWin.setColor("white");
youWin.setPosition(window.innerWidth/2, window.innerHeight/2);

// Handles game states.
const gameStates = {
    Playing: "playing",
    Waiting: "waiting",
    GameOver: "gameover",
    Won: "won"
}
// The starting state is Waiting.
var gameState = gameStates.Waiting;


// Variable to store the current level number.
var levelNum = 1;

//Used to develop a level easily
var level1 = [new Cube(new Vector3D(3, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(0, -1, -50)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(-3.5, -1, -90)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(3.5, -1, -90)),
new Cube(new Vector3D(5, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(0, -1, -110)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(-3.5, -1, -120)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(3.5, -1, -130))];

//Used to develop a level easily
var collectables = [new Cube(new Vector3D(0.5, 0.5, 0.5), { color: 0xffee00 }).setPosition(new Vector3D(0, -1, -20)),
new Cube(new Vector3D(0.5, 0.5, 0.5), { color: 0xffee00 }).setPosition(new Vector3D(-3.5, -1, -110))]

// Stores the data for all of the levels.
var levels = [[[new Cube(new Vector3D(3, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(0, -1, -50)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(-3.5, -1, -90)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(3.5, -1, -90)),
new Cube(new Vector3D(5, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(0, -1, -110)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(-3.5, -1, -120)),
new Cube(new Vector3D(2, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(3.5, -1, -130))],
[new Cube(new Vector3D(0.5, 0.5, 0.5), { color: 0xffee00 }).setPosition(new Vector3D(0, -1, -20)),
new Cube(new Vector3D(0.5, 0.5, 0.5), { color: 0xffee00 }).setPosition(new Vector3D(-3.5, -1, -110))]],
[
    [new Cube(new Vector3D(6, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(-2, -1, -70)),
        new Cube(new Vector3D(6, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(2, -1, -100)),
        new Cube(new Vector3D(6, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(-2, -1, -130)),
        new Cube(new Vector3D(6, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(2, -1, -160)),
        new Cube(new Vector3D(6, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(-2, -1, -200)),
        new Cube(new Vector3D(6, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(2, -1, -220)),
        new Cube(new Vector3D(6, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(2, -1, -230)),
        new Cube(new Vector3D(6, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(-2, -1, -250))],
    [new Cube(new Vector3D(0.5, 0.5, 0.5), { color: 0xffee00 }).setPosition(new Vector3D(0, -1, -50)),
        new Cube(new Vector3D(0.5, 0.5, 0.5), { color: 0xffee00 }).setPosition(new Vector3D(0, -1, -145))]
],
[
    [new Cube(new Vector3D(6, 2, 2), { color: 0xFF0000 }).setPosition(new Vector3D(-2, -1, -70))],
    [new Cube(new Vector3D(0.5, 0.5, 0.5), { color: 0xffee00 }).setPosition(new Vector3D(0, -1, -50)),
        new Cube(new Vector3D(0.5, 0.5, 0.5), { color: 0xffee00 }).setPosition(new Vector3D(0, -1, -145))]
]];

// The trigger object. This invisable object detects if the player collides with it.
var trigger = new Cube(new Vector3D(10, 10, 10), { color: 0xFF0000 }).setPosition(new Vector3D(0, -1, -200)).show();
trigger.getMesh().material.opacity = 0;
trigger.getMesh().material.transparent = true;
trigger.getMesh().material.needsUpdate = true;

// The score the player has racked up.
var scoreCount = 0;

//The Score text
var score = new GText("Score: 0");
score.setPosition(100, 100);
score.setColor("white");
GameObjects.add(score);

//Handles the high score
var highScore = new GText("High Score: 0");
highScore.setPosition(window.innerWidth - 200, 110).setColor("white");
GameObjects.add(highScore);

//The gameover text
var gameover = new GText("Game Over");
gameover.setPosition(window.innerWidth / 2, window.innerHeight / 2);
gameover.setColor("red");
gameover.setSize("100px");

// Level text.
var lvl = new GText("Level 1");
lvl.setPosition(window.innerWidth / 2, window.innerHeight / 2);
lvl.setColor("white");
lvl.setSize("100px");
GameObjects.add(lvl);

// If the levelData is not stored.
if (DataHandler.getData("levelNum") == null)
    DataHandler.setData("levelNum", levelNum);
// Loads in the last level
levelNum = parseInt(DataHandler.getData("levelNum"));

// Get the frames handler.
var frames = 0;

/*
    Main Update Loop.
*/

EventHandler.registerHandler(UpdateEvent, e => {
    if (Collider3D.isColliding(player, trigger)) {
        nextStage();
        return;
    }
});


/*
    Handles moving the player when in the waiting (level name) state.
*/
var newFrames = 0;
EventHandler.registerHandler(UpdateEvent, e => {
    if (gameState === gameStates.Waiting) {
        if (newFrames < 20) { newFrames++; return; }

        player.translateBy(new Vector3D(0, 0, -1));
        Camera.setPosition(player.getPosition().add(0, 2, 5));

    }
})

/*
    The main game code. Handles movement and gameover collision.
*/
EventHandler.registerHandler(UpdateEvent, e => {

    if (gameState != gameStates.Playing) return;
    if (frames < 20) frames++;
    else {
        if (Collider3D.isCollidingList(player, levels[levelNum - 1][0])) {
            levelNum -= 1;
            gameState = gameStates.GameOver;
            nextStage();
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
            Camera.setPosition(player.getPosition().add(0, 2, 5));
            return;
        }
        player.translateBy(new Vector3D(1 * (GameEngine.deltaTime / 60), 0, 0));
    }

});

/*
    Hnadles the collectables, collision and spinning.
*/
EventHandler.registerHandler(UpdateEvent, e => {
    if (gameState != gameStates.Playing) return;
    levels[levelNum - 1][1].forEach(item => item.rotateBy(new Vector3D(0, 5 * e.getDeltaTime() / 1000, 5 * e.getDeltaTime() / 1000)));

    if (Collider3D.isCollidingList(player, levels[levelNum - 1][1])) {
        scoreCount += 1;
        Collider3D.getCollidingObjects(player, levels[levelNum - 1][1])[0].hide();
    }

});


/**
 * Load the level.
 */
function loadLevel() {
    if (DataHandler.getData("highscore" + levelNum) == null) DataHandler.setData("highscore" + levelNum, 0);
    highScore.setText("High Score: " + DataHandler.getData("highscore" + levelNum));
    if (levelNum > 3) tre.stop();
    if (levelNum != 1) {

    }
    levels[levelNum - 1][0].forEach(item => item.show());
    levels[levelNum - 1][1].forEach(item => item.show());
    if (levelNum == 2) {
        trigger.setPosition(new Vector3D(0, 0, -400));
    }


}

/**
 * Checks if an object is colliding in a list.
 * @param {*} obj The object
 * @param {*} list The list of objects.
 */
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

// Handles time till color change
var time = 0.1;

// Valid color hex coddes
var colors = [0xcb42f5, 0xFF0000, 0xf5b942, 0x0051ff];

/**
 * Handles changing the collors.
 */
EventHandler.registerHandler(UpdateEvent, e => {
    if (gameState != gameStates.Playing) return;
    // console.log(e.getDeltaTime() / 60);
    // if (frames < 20) { frames++; return; };
    time += e.getDeltaTime() / 1000;
    if (time > 0.5) {
        for (let i in levels[levelNum - 1][0]) {
            levels[levelNum - 1][0][i].setMaterial({ color: colors[Math.floor(Math.random() * 4)] });
            levels[levelNum - 1][0][i].getMesh().material.needsUpdate = true;
        }
        time = 0;
    }
});

/*

    Handles the animation of the Level text.

*/
var levelTime = 0;
var currentIndex = 0;
var stringUsed = "Level " + levelNum;
var stringDisplayed = "";
var finishedLevel = false;
EventHandler.registerHandler(OnLevelDisplay, e => {
    levelTime = 0;
    currentIndex = 0;
    stringUsed = "Level " + levelNum;
    stringDisplayed = "";
    finishedLevel = false;
});
EventHandler.registerHandler(UpdateEvent, e => {
    if(gameState != gameStates.Waiting) return;
    levelTime += e.getDeltaTime() / 1000;
    if(stringDisplayed.length != stringUsed.length && !finishedLevel){
        if(levelTime >= 0.1){
            stringDisplayed += stringUsed[currentIndex];
            lvl.setText(stringDisplayed);
            currentIndex++;
            levelTime = 0;
            if(stringDisplayed.length == stringUsed.length){
                finishedLevel = true;
            }
        }
    }else{
        if(stringDisplayed.length == stringUsed.length && levelTime > 1.5){
            console.log(levelTime);
            stringDisplayed = stringDisplayed.slice(0, -1);
            lvl.setText(stringDisplayed);
            levelTime = 0;
        }else if(stringDisplayed.length != stringUsed.length && levelTime >= 0.1){
            stringDisplayed = stringDisplayed.slice(0, -1);
            lvl.setText(stringDisplayed);
            levelTime = 0;
        }
    }
});

/**
 * Handles switching to the next stage.
 */
function nextStage() {
    if (gameState === gameStates.Waiting) {
        scoreCount = 0;
        gameState = gameStates.Playing;
        GameObjects.remove(lvl);
        loadLevel();
    }
    else if (gameState === gameStates.Playing) {
        if (scoreCount > parseInt(DataHandler.getData("highscore" + levelNum))) {
            DataHandler.setData("highscore" + levelNum, scoreCount);
        }
        scoreCount = 0;
        levelNum += 1;
        gameState = gameStates.Waiting;
        if(levelNum > 3){
            gameState = gameStates.Won;
            EventHandler.fireEvent(OnWin, new OnWin());
            return;
        }
        lvl.setText("");
        GameObjects.add(lvl);
        levels[levelNum - 2][0].forEach(item => item.hide());
        levels[levelNum - 2][1].forEach(item => item.hide());
        frames = 0;
        newFrames = 0;
        trigger.setPosition(new Vector3D(0, 0, -200));
        EventHandler.fireEvent(OnLevelDisplay, new OnLevelDisplay());
        DataHandler.setData("levelNum", levelNum);
        
    }
    else if (gameState === gameStates.GameOver) {
        scoreCount = 0;
        levelNum += 1;
        console.log("Level " + levelNum);
        gameState = gameStates.Waiting;
        // if(levelNum > 2){
        //     gameState = gameStates.Won;
        //     EventHandler.fireEvent(OnWin, new OnWin());
        // }
        lvl.setText("");
        GameObjects.add(lvl);
        levels[levelNum - 1][0].forEach(item => item.hide());
        levels[levelNum - 1][1].forEach(item => item.hide());
        frames = 0;
        newFrames = 0;
        trigger.setPosition(new Vector3D(0, 0, -200));
        EventHandler.fireEvent(OnLevelDisplay, new OnLevelDisplay());
    }
    player.setPosition(new Vector3D(0, -1, -10));
    Camera.setPosition(player.getPosition().add(0, 2, 5));
}

/*
    Handles when the player finishes the game.
*/
EventHandler.registerHandler(OnWin, e =>{
    GameObjects.removeType(GText);
    GameObjects.removeType(GText);
    GameObjects.add(youWin);
    var resetGame = new Rectangle();
    resetGame.setColor("green").setPosition(window.innerWidth/2 - 70, 400).setScale(150, 100);
    GameObjects.add(resetGame);
    GameObjects.add(new GText("Replay Game").setColor("white").setSize("20px").setPosition(resetGame.getPosition().getX() + 65, resetGame.getPosition().getY() + 50))
    player.setPosition(new Vector3D(0, -1, -50));
    Camera.setPosition(player.getPosition().add(0, 2, -200));
    EventHandler.registerHandler(MouseDownEvent, e =>{
        if(Collider.isPointColliding(resetGame, e.getPosition())){
            DataHandler.remove("levelNum");
            location.reload();
        }
    });
});

