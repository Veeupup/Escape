"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver( nowMission) {
    // The camera to view the scene
    this.kBack = "assets/back.png";
    this.mCamera = null;
    this.mMsg = null;
    this.mBack = null;
    this.mMsg0 = null;
    this.mMsg1 = null;
    
    this.nowMission = nowMission;
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

    this.kLight = this._createALight(
        0,          //type
        [-5,10,0],  //position
        [0,0,0],    //direction
        [1,1,1,1],  //color
        30,         //far
        5,          //near
        5,          //inner
        30,          //outer
        2,          //intensity
        1,
    );
    this.kLight.mFar = 300;
    
    this.mMsg0 = new FontRenderable("Press W to revive from current stage");
    this.mMsg0.setColor([1, 0, 0, 1]);
    this.mMsg0.getXform().setPosition(10, 20);
    this.mMsg0.setTextHeight(4);
    
    this.mMsg1 = new FontRenderable("Press Space to revive from first stage");
    this.mMsg1.setColor([1, 0, 0, 1]);
    this.mMsg1.getXform().setPosition(10, 40);
    this.mMsg1.setTextHeight(4);

    this.mBack = new LightRenderable(this.kBack);
    this.mBack.setColor([1, 1, 1, 0]);  // No tinting
    this.mBack.getXform().setPosition(-5, 20);
    this.mBack.getXform().setSize(290, 120);
    this.mBack.addLight(this.kLight);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameOver.prototype.draw = function () {
    // Step A: clear the canvas
    this.mCamera.setupViewProjection();
    this.mBack.draw(this.mCamera);
    this.mMsg0.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameOver.prototype.update = function () {
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        var myGame = new MyGame();
        gEngine.Core.initializeEngineCore('GLCanvas', myGame);
    }
    //决定从当前关卡重新开始
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)){
        if(this.nowMission===1){
            var myGame = new MyGame();
            gEngine.Core.initializeEngineCore('GLCanvas', myGame);
        }else{
            var myGame = new MyGame2();
            gEngine.Core.initializeEngineCore('GLCanvas', myGame);
        };
    }
};

GameOver.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBack);
};

GameOver.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBack);
};

GameOver.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);
    light.setLightCastShadowTo(true);

    return light;
};