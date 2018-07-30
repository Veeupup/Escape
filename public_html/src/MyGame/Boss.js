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
var moveStep = 3  ;
function Boss() {
    // The camera to view the scene
    this.kHero = "assets/minion_sprite.png";
    this.kBack = "assets/back_boss.png";
    this.kPlatform = "assets/platform.png";
    this.kbullet = "assets/bullet.png";
    this.kGun = "assets/gun.png";
    this.kGun1 = "assets/Gun1.png";
    this.kTrap = "assets/trap.png";
    this.kLaser = "assets/laser.png";
    this.kBoss = "assets/boss.png";
    this.kBloodpic = "assets/blood.png";
    this.kBGM = "assets/sounds/bgm.mp3";
    this.kLight = null;
    this.mAllObjs = null;
    this.mdirection = 0;
    
    this.mCollisionInfos = [];

    this.mCamera = null;
    this.mHero = null;
    this.mMsg = null;
    this.mBack = null;
    this.mlive = 8;
    this.mblood = [];
    
    this.mGun = null;
    this.mGun1 = null;
    this.mTrap = null;
    this.mLaser = null;
    this.mBoss = null;
    this.mgunstate = false;
    this.mbullet = null;
    this.mbulletmovespeedflag = 0;
    this.mbulletflag = 0;
    this.mbulletdirection = 0;
    this.mdirection = 1;
    
    
    this.isTrapMove = false;
    this.isLaserMove = false;    //定义

    this.mRestart = false;
}
gEngine.Core.inheritPrototype(Boss, Scene);

Boss.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBack);
    gEngine.Textures.loadTexture(this.kPlatform);
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kGun);
    gEngine.Textures.loadTexture(this.kGun1);
    gEngine.Textures.loadTexture(this.kbullet);
    gEngine.Textures.loadTexture(this.kTrap);
    gEngine.Textures.loadTexture(this.kLaser);
    gEngine.Textures.loadTexture(this.kBoss);
    gEngine.Textures.loadTexture(this.kBloodpic);
    gEngine.AudioClips.loadAudio(this.kBGM);
};


Boss.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBack);
    gEngine.Textures.unloadTexture(this.kPlatform);
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kGun);
    gEngine.Textures.unloadTexture(this.kGun1);
    gEngine.Textures.unloadTexture(this.kbullet);
    gEngine.Textures.unloadTexture(this.kTrap);
    gEngine.Textures.unloadTexture(this.kLaser);
    gEngine.Textures.unloadTexture(this.kBoss);
    gEngine.Textures.unloadTexture(this.kBloodpic);
    gEngine.AudioClips.unloadAudio(this.kBGM);
    
    if(this.mRestart){
        var mygamelose = new Revive(3);
        gEngine.Core.startScene(mygamelose);
    }else{
        var mygame =  new Win();
        gEngine.Core.startScene(mygame);
    }
};

Boss.prototype.initialize = function () {
    // Step A: set up the cameras
    
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        1024,                        // width of camera
        [0, 0, 1024, 484],         // viewport (orgX, orgY, width, height)
        2
    );

    this.kLight = this._createALight(
        0,          //type
        [-5,10,0],  //position
        [0,0,0],    //direction
        [1,1,1,0.5],  //color
        1000,         //far
        5,          //near
        5,          //inner
        30,          //outer
        2,          //intensity
        0.5,
    );
    this.kLight.mFar = 20;
    this.kLight.mNear = 10;
        // sets the background to gray
    gEngine.AudioClips.playBackgroundAudio(this.kBGM);
    gEngine.DefaultResources.setGlobalAmbientIntensity(5);
    
    this.mTrap = this._initialItem(this.kTrap,550,-170,50,20,this.kLight);
    this.mLaser = this._initialItem(this.kLaser,550,-45,100,20,this.kLight);

    this.mAllObjs = new GameObjectSet();
    this.mBoss = new BossCreature(this.kBoss, this.kLight, 400, -50, 300, 200);
    this.mAllObjs.addToSet(this.mBoss);
    
    this.mHero = new Hero(this.kHero, this.kLight, -300, -140, 35, 56);
    this.mHero.mRenderComponent.mXform.mScale[0] = 35;
    this.mHero.mRenderComponent.mXform.mScale[1] = 56;
    this.mGun = this._initialItem(this.kGun, 350, 200, 75, 90, this.kLight);
    this.mGun1 = this._initialItem(this.kGun1, -518, -518, 75, 90, this.kLight);
    this.mbullet = this._initialItem(this.kbullet, -518, -518, 36, 20, this.kLight);
    this.mAllObjs.addToSet(this.mHero);    
    this.mFirstObject = this.mAllObjs.size();
    this.mCurrentObj = this.mFirstObject;
    this.createBounds();

    for(var i = 0; i <8 ; i++){
        this.mblood[i] = this._initialItem(this.kBloodpic, 300 + i*20, 70, 54, 30, this.kLight);
    }


    
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
    this.mGun.draw(this.mCamera);
    this.mGun1.draw(this.mCamera);
    this.mbullet.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    this.mTrap.draw(this.mCamera);
    this.mLaser.draw(this.mCamera);   
    for(var i = 0; i <8 ; i++){
        this.mblood[i].draw(this.mCamera);
    }
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Boss.prototype.update = function () {
    // select which character to work with
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
    //     var myGame = new EvilComing();
    //     gEngine.Core.initializeEngineCore('GLCanvas', myGame);
    // }
    
    this.LaserintoHero();
    this.TrapintoHero();
    if(this.mHero.getXform().getYPos()>-90 && this.mHero.getXform().getYPos()<0)
       this.Laser();
    if(this.mHero.getXform().getYPos()>-180 && this.mHero.getXform().getYPos()<-90)
        this.Trap();               //update


    
    
    if(this.mgunstate === true && this.mbulletflag === 1){
        this.mGun1.mXform.mPosition[0] = 350;
        this.mGun1.mXform.mPosition[1] = 200;               
        }
    
    this.bulletjudge();
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
            if(this.mHero.mRenderComponent.mXform.getYPos()<150){
                 this.mHero.mRenderComponent.mXform.incYPosBy(2);
            }else{
                this.mHero.mRenderComponent.mXform.incYPosBy(-2);
            }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
            this.mHero.mRenderComponent.mXform.incYPosBy(-3);
    }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
            this.mHero.mRenderComponent.mXform.mPosition[0]-=moveStep;
            this.mdirection = -1;
    }
    
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
           this.mHero.mRenderComponent.mXform.mPosition[0]+=moveStep; 
           this.mdirection = 1;
        
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
            if(this.mgunstate === false){
        this.mgunstate = true;
            this.bulletmove();
            }
    }
    
        var obj = this.mAllObjs.getObjectAt(this.mCurrentObj);

    obj.getRigidBody().userSetsState();
    this.mAllObjs.update(this.mCamera);
    
    gEngine.Physics.processCollision(this.mAllObjs, this.mCollisionInfos);
};



Boss.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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


var trapFun = function (that) {
    if(that.mTrap.getXform().getXPos()>-512){
        that.mTrap.getXform().incXPosBy(-30);
    }else{
        that.mTrap.getXform().setXPos(550);
    }

};

var laserFun = function(that) {
    if(that.mLaser.getXform().getXPos()>-512){
        that.mLaser.getXform().incXPosBy(-30);
    }else{
        that.mLaser.getXform().setXPos(550);
    }
};

Boss.prototype.Trap = function(){
    var that = this;
    if(!this.isTrapMove){
        this.isTrapMove = true;
        var trap = setInterval(function () {
            trapFun(that);
            this.isTrapMove = false;
        },100)
    }
};

Boss.prototype.Laser = function () {
    var that = this;
    if(!this.isLaserMove){
        this.isLaserMove = true;
        var laser = setInterval(function () {
            laserFun(that);
            this.isLaserMove= false;
        },100)
    }
};
