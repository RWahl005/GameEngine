import * as jsengine from '../JSEngine/JSEngine3D.js';
import { Camera } from '../JSEngine/JSEngine3D.js';

/**
 * Lighting example for 3D environments.
 * @author Ryan
 */

const tre = new jsengine.ThreeEngine();
tre.enableLighting(true);
tre.start();

var cube = new jsengine.Cube(new jsengine.Vector3D(1, 1, 1)).setPosition(0, 1, -5);
cube.show();

var amblight = new jsengine.BackgroundLight(0xFFFFFF, 0.5);
amblight.show();

Camera.setPosition(0, 2, 0);

new jsengine.Cube(new jsengine.Vector3D(100, 1, 100), {color: 0x34ebe1}).setPosition(0, 0, 0).show();

new jsengine.Light(0x34eb65, 1, 100).setPosition(new jsengine.Vector3D(0, 2, -10)).show();
new jsengine.Light(0xeb34d0, 1, 100).setPosition(new jsengine.Vector3D(-10, 2, -30)).show();

jsengine.EventHandler.registerHandler(jsengine.UpdateEvent, e =>{
    if(jsengine.KeyHandler.isKeyDown("w")) Camera.translateBy(0, 0, -1);
    if(jsengine.KeyHandler.isKeyDown("s")) Camera.translateBy(0, 0, 1);
    if(jsengine.KeyHandler.isKeyDown("a")) Camera.translateBy(-1, 0, 0);
    if(jsengine.KeyHandler.isKeyDown("d")) Camera.translateBy(1, 0, 0);
    if(jsengine.KeyHandler.isKeyDown("ArrowLeft")) Camera.rotateBy(new jsengine.Vector3D(0, 0.2, 0));
    if(jsengine.KeyHandler.isKeyDown("ArrowRight")) Camera.rotateBy(new jsengine.Vector3D(0, -0.2, 0));
    if(jsengine.KeyHandler.isKeyDown("r")) Camera.setRotation(new jsengine.Vector3D(0, 0, 0));
});