"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver() {
    // The camera to view the scene
    this.kBack = "assets/start.png";
    this.mCamera = null;
    this.mMsg = null;
    this.mBack = null;
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        300,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
        2
    );

    this.mBack = new SpriteRenderable(this.kBack);
    this.mBack.setColor([1, 1, 1, 0]);  // No tinting
    this.mBack.getXform().setPosition(-5, 20);
    this.mBack.getXform().setSize(290, 120);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameOver.prototype.draw = function () {
    // Step A: clear the canvas
    this.mCamera.setupViewProjection();
    this.mBack.draw(this.mCamera);
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameOver.prototype.update = function () {
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        var myGame = new MyGame();
        gEngine.Core.initializeEngineCore('GLCanvas', myGame);
    }
};

GameOver.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBack);
};

GameOver.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBack);
};
