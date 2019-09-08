# JSEngine
A 2D and 3D Javascript Game Engine. **Notice: A server is required for import to work properly**

## Modes
There are two modes, 2D mode and 3D mode.

To select a mode you just import a different file.

## Using JSEngine
You use the import key word to import either the 2D or 3D Mode.
```javascript
import * as jsgame from '../JSEngine/JSEngine2D.js';

import * as jsgame from '../JSEngine/JSEngine3D.js';
```
That will give you access to all of the classes you need.

# 2D Engine
## Starting the game.
You need a canvas with the id of `game` in order for it to work.  
Then you initialize the game by doing
```javascript
jsgame.GameEngine.initialize();
```

## Adding objects to the render
In order for objects to show up you need to add them to the render.  
You do that by doing:
```javascript
jsgame.GameObjects.add(...);
```
To create a rectangle you can use
```javascript
let rect = new jsgame.Rectangle();
```
To set the rectangle's properties you use setter methods. The setter methods can be chained togeather.
```javascript
rect.setPosition(0, 0).setScale(100, 100).setColor("red");
```
## Moving Objects
Moving objects is very simple using the #translateBy method.
```javascript
rect.translateBy(10, 0);
```
## Getting position, scale, and rotation from objects
In 2D mode when you get the position, scale, and rotation it returns a Vector (not to be confused with Vector3D) value.
```javascript
var rectPosition = rect.getPosition();
rectPosition.getX() // get the x position
rectPosition.getY() // get the y position.
rectPosition.add(2, 5) // vector math can be done
```

## Using Scene objects to render objects
It is a possibilty to render 'scenes' (like game levels) by using the Scene class.  
Here is the intended use of the scene class:  
```javascript
class Level1 extends jsgame.Scene{
    constructor(){
        super(); // Will not work without this.
        var rect1 = new jsgame.Rectangle().setPosition(0, 45).setScale(30, 30).setColor("blue");
        var rect2 = new jsgame.Rectangle().setPosition(50, 50).setScale(20, 20);
        this.add(rect1);
        this.add(rect2);
    }
}
```
Then to load a scene do:
```javascript
jsgame.GameEngine.setScene(new Level1());
```
To get the current loaded scene use:
```javascript
jsgame.GameEngine.getCurrentScene();
```