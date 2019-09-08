import * as je from '../JSEngine/JSEngine3D.js';

/**
    Demonstrates the possiblity of scenes in a 3-Dimensonal space.
    @author Ryan
*/

/**
 * The first level.
 */
class Level1 extends je.Scene {
    constructor() {
        super();
        this.player = new je.Cube(new je.Vector3D(1, 1, 1), { color: 0x0FF000 }).setPosition(0, 0, 5);
        this.add(this.player);
        this.add(new je.Cube(new je.Vector3D(2, 2, 2)).setPosition(3, 0, -6));
        this.add(new je.Cube(new je.Vector3D(100, 1, 100), { color: 0x3283a8 }).setPosition(0, -1, 0));
    }

    getPlayer() {
        return this.player;
    }
}

/**
 * The second level.
 */
class Level2 extends je.Scene {
    constructor() {
        super();
        this.player = new je.Cube(new je.Vector3D(1, 1, 1), { color: 0x0FF000 }).setPosition(0, 0, 5);
        this.add(this.player);
        this.add(new je.Cube(new je.Vector3D(4, 4, 2), { color: 0xde3412 }).setPosition(3, 0, -6));
        this.add(new je.Cube(new je.Vector3D(4, 4, 2), { color: 0x5d12de }).setPosition(-20, 0, -9));
        this.add(new je.Cube(new je.Vector3D(100, 1, 100), { color: 0x3283a8 }).setPosition(0, -1, 0));
    }

    getPlayer() {
        return this.player;
    }
}

/*
 *  Code that is used to demonstrate the code.
 */

var scenes = [new Level1(), new Level2()];
var currentIndex = 0;

const tre = new je.ThreeEngine();
tre.start();

tre.setScene(new Level1());

je.Camera.setPosition(0, 5, 10);

je.GameObjects.add(new je.GText("Press n for next scene", 400, 100).setColor("white"));
var cooldown = 5;

je.EventHandler.registerHandler(je.UpdateEvent, e => {
    cooldown += e.getDeltaTime() / 1000;
    if (je.KeyHandler.isKeyDown("w")) tre.getCurrentScene().getPlayer().translateBy(new je.Vector3D(0, 0, -1));
    if (je.KeyHandler.isKeyDown("s")) tre.getCurrentScene().getPlayer().translateBy(new je.Vector3D(0, 0, 1));
    if (je.KeyHandler.isKeyDown("a")) tre.getCurrentScene().getPlayer().translateBy(new je.Vector3D(-1, 0, 0));
    if (je.KeyHandler.isKeyDown("d")) tre.getCurrentScene().getPlayer().translateBy(new je.Vector3D(1, 0, 0));
    if (je.KeyHandler.isKeyDown("n")) {
        if (!(cooldown > 1)) return;
        nextScene();
        cooldown = 0;
    }
    je.Camera.setPosition(tre.getCurrentScene().getPlayer().getPosition().add(0, 2, 5));
});

function nextScene() {
    currentIndex = scenes.length >= currentIndex ? currentIndex + 1 : 0;
    tre.setScene(scenes[currentIndex]);
}
