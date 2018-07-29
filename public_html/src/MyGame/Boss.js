/*
 * File: Boss.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Boss() {
    // The camera to view the scene
    this.kBack = "assets/back_boss.png";
    this.kPlatform = "assets/platform.png";

    this.mAllObjs = null;

    this.mCamera = null;
    this.mMsg = null;
    this.mBack = null;
}
gEngine.Core.inheritPrototype(Boss, Scene);

Boss.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBack);
    gEngine.Textures.loadTexture(this.kPlatform);
};


Boss.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBack);
    gEngine.Textures.unloadTexture(this.kPlatform);
};

Boss.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        1024,                        // width of camera
        [0, 0, 1024, 484],         // viewport (orgX, orgY, width, height)
        2
    );
    
    this.mAllObjs = new GameObjectSet();
    this.mFirstObject = this.mAllObjs.size();
    this.mCurrentObj = this.mFirstObject;

    this.createBounds();
console.log(this.mAllObjs);

    this.mBack = new SpriteRenderable(this.kBack);
    this.mBack.setColor([1, 1, 1, 0]);  // No tinting
    this.mBack.getXform().setPosition(0, 0);
    this.mBack.getXform().setSize(1024, 484);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Boss.prototype.draw = function () {
    // Step A: clear the canvas
    //gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBack.draw(this.mCamera);

    this.mAllObjs.draw(this.mCamera);
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Boss.prototype.update = function () {
    // select which character to work with
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
    //     var myGame = new EvilComing();
    //     gEngine.Core.initializeEngineCore('GLCanvas', myGame);
    // }
};

