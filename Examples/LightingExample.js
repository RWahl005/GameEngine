import * as jsgame from '../JSEngine/JSEngine2D.js';

/**
 * This example shows off the lighting engine of the JSGameEngine.
 * @author Ryan
 */

jsgame.GameEngine.initialize();

jsgame.LightEngine.enable(0.7);

var coloredLight = new jsgame.Light(200, 200, 40, [[0.3, 'rgba(245, 63, 57, 0.5)'], [0.5, 'rgba(190, 190, 80, 0.5)'], [0.9, 'rgba(114, 114, 12, 0.2)']]);
jsgame.LightObjects.add(coloredLight);

var light2 = new jsgame.Light(500, 200, 40, jsgame.LightColor.red);
jsgame.LightObjects.add(light2);

var light3 = new jsgame.Light(500, 250, 60, jsgame.LightColor.blue);
jsgame.LightObjects.add(light3);

var followLight = new jsgame.Light(0, 0, 100);
jsgame.LightObjects.add(followLight);

jsgame.GameObjects.add(new jsgame.Rectangle().setPosition(100, 100).setScale(20, 20).setColor("green"));

jsgame.EventHandler.registerHandler(jsgame.MouseMoveEvent, e => {
    let pos = e.getPosition();
    followLight.setPosition(pos.getX(), pos.getY());
});