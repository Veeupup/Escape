/*
 * File: MyGame2.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame2() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatformTexture = "assets/platform.png";
    this.kWallTexture = "assets/wall.png";
    this.kTargetTexture = "assets/target.png";
    this.kParticleTexture = "assets/particle.png";
    this.kBackGround = "assets/back.png";
    this.kDoor = "assets/door.png";
    this.kladder = "assets/ladder.png";
    this.kKey = "assets/key.png";
    this.kPaper = "assets/paper.png";
    this.kMinion = "assets/minion.png";
    
    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;
    this.mShapeMsg = null;
    

    this.mAllObjs = null;
    this.mAllParticles = null;
    this.mBounds = null;
    this.mCollisionInfos = [];
    
    this.mHero = null;
    //map items
    this.mBack = null;
    this.mDoor = null;
    this.mDoor1 = null;
    this.mladder = null;
    this.mladder1 = null;
    this.mladder2 = null;
    this.mladder3 = null;
    this.mladder4 = null;
    this.mladder5 = null;
    
    this.mMonster = [];
    
    this.mpaper = null;
    this.mkey = null;
    
    this.mCurrentObj = 0;
    this.mTarget = null;
    
    this.moving = true;
    this.iskey = false;
}
gEngine.Core.inheritPrototype(MyGame2, Scene);


MyGame2.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kBackGround);
    gEngine.Textures.loadTexture(this.kDoor);
    gEngine.Textures.loadTexture(this.kladder);
    gEngine.Textures.loadTexture(this.kKey);
    gEngine.Textures.loadTexture(this.kPaper);
    gEngine.Textures.loadTexture(this.kMinion);
};

MyGame2.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kBackGround);
    gEngine.Textures.unloadTexture(this.kDoor);
    gEngine.Textures.unloadTexture(this.kladder);
    gEngine.Textures.unloadTexture(this.kKey);
    gEngine.Textures.unloadTexture(this.kPaper);
    gEngine.Textures.unloadTexture(this.kMinion);
};

MyGame2.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 10), // position of t                                                                                                       ``                                                                                                                                                                                                                                                                                                                                          he camera
        100,                     // width of camera
        [0, 0, 1024, 484]         // viewport (orgX, orgY, width, height)
    );
//    this.mCamera.setBackgroundColor([1, 0.8, 0.8, 0.5]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mBack = new SpriteRenderable(this.kBackGround);
    this.mBack.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mBack.getXform().setPosition(50, 40);
    this.mBack.getXform().setSize(200, 100);
//      door--entrance
    
    this.mDoor = new SpriteRenderable(this.kDoor);
    this.mDoor.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mDoor.getXform().setPosition(-32, 7);
    this.mDoor.getXform().setSize(8, 10);
//      door--escape
    this.mDoor1 = new SpriteRenderable(this.kDoor);
    this.mDoor1.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mDoor1.getXform().setPosition(-30, 67);
    this.mDoor1.getXform().setSize(8, 10);
//      floor1--ladder
    this.mladder = new SpriteRenderable(this.kladder);
    this.mladder.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mladder.getXform().setPosition(55, 12);
    this.mladder.getXform().setSize(10, 20);
//      floor2--ladder
    this.mladder1 = new SpriteRenderable(this.kladder);
    this.mladder1.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mladder1.getXform().setPosition(-15, 32);
    this.mladder1.getXform().setSize(10, 20);
    
    this.mladder2 = new SpriteRenderable(this.kladder);
    this.mladder2.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mladder2.getXform().setPosition(115, 32);
    this.mladder2.getXform().setSize(10, 20);
    
    this.mladder3 = new SpriteRenderable(this.kladder);
    this.mladder3.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mladder3.getXform().setPosition(75, 52);
    this.mladder3.getXform().setSize(10, 20);
    //this is the half ladder
    this.mladder4 = new SpriteRenderable(this.kladder);
    this.mladder4.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mladder4.getXform().setPosition(20, 45);
    this.mladder4.getXform().setSize(10, 12);
    
    //other items in map
    this.mkey = new SpriteRenderable(this.kKey);
    this.mkey.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mkey.getXform().setPosition(-5, 5);
    this.mkey.getXform().setSize(5, 6);
    
    this.mpaper = new SpriteRenderable(this.kPaper);
    this.mpaper.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mpaper.getXform().setPosition(0, -40);
    this.mpaper.getXform().setSize(40, 32);
    
    this.mHero = new Hero(this.kMinionSprite);
    this.mAllObjs = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
    
    this.createBounds();
    this.mFirstObject = this.mAllObjs.size();
    this.mCurrentObj = this.mFirstObject;
    
    this.mAllObjs.addToSet(this.mHero);

    this.mMsg = new FontRenderable("                        ");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(-12, -40);
    this.mMsg.setTextHeight(2);
    
    this.mShapeMsg = new FontRenderable("Shape");
    this.mShapeMsg.setColor([0, 0, 0, 1]);
    this.mShapeMsg.getXform().setPosition(5, 73);
    this.mShapeMsg.setTextHeight(2.5);
    
    //minons initialize
    var m = null;
    m = new Minion(this.kMinion, 90,10,80,100 );
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 120,40,110,130);
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 10,40,0,20 );
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 80,50,70,90 );
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 10,50,0,20 );
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 100,70,95,105 );
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 114,70,110,119 );
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 120,70,125,130 );
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame2.prototype.draw = function () {
    // Step A: clear the canvas
    //gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    //where is the item
    this.mBack.draw(this.mCamera);
    
    
    
    this.mDoor.draw(this.mCamera);
    this.mDoor1.draw(this.mCamera);
    this.mladder.draw(this.mCamera);
    this.mladder1.draw(this.mCamera);
    this.mladder2.draw(this.mCamera);
    this.mladder3.draw(this.mCamera);
    //this.mladder4.draw(this.mCamera);
    
    
    this.mkey.draw(this.mCamera);
    
    this.mAllObjs.draw(this.mCamera);
    
    // for now draw these ...
    /*for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera); */
    this.mCollisionInfos = []; 
    

    this.mTarget.draw(this.mCamera);
      // only draw status in the main camera
    this.mShapeMsg.draw(this.mCamera);
    this.mAllParticles.draw(this.mCamera);
    
    this.mpaper.draw(this.mCamera);
    this.mMsg.draw(this.mCamera); 
};

MyGame2.prototype.increasShapeSize = function(obj, delta) {
    var s = obj.getRigidBody();
    var r = s.incShapeSizeBy(delta);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame2.kBoundDelta = 0.1;
MyGame2.prototype.tipInfoOn = function(){
    this.mMsg.mXform.mPosition[1]=12;
    this.mpaper.mXform.mPosition[1]=12;
};

MyGame2.prototype.tipInfoOff = function(){
    this.mMsg.mXform.mPosition[1]=-40;
    this.mpaper.mXform.mPosition[1]=-40;
};

MyGame2.prototype.updateState = function(){
    var xHero = this.mHero.mDye.mXform.mPosition[0];
    var yHero = this.mHero.mDye.mXform.mPosition[1];
    this.mpaper.mXform.mPosition[0] = xHero;
    this.mMsg.mXform.mPosition[0] = xHero;
    this.mCamera.mCameraState.mCenter.mCurrentValue[0] = xHero;
    this.mCamera.mCameraState.mCenter.mCurrentValue[1] = yHero;
    if(!this.moving){
        this.mMsg.mXform.mPosition[0] = xHero-15;
        this.mpaper.mXform.mPosition[1] = yHero;
        this.mMsg.mXform.mPosition[1] = yHero;
    }
};

MyGame2.prototype.update = function () {
    var msg = "";   
    var that = this;
    //moving
    this.updateState();
    this.CrashIntoMonster();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
//        xCamera.incYPosBy(0.2);
        if(this.moving){
            this.mHero.mDye.mXform.mPosition[1]+=0.8;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
//        xCamera.incYPosBy(-kWASDDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
//        xCamera.incXPosBy(-kWASDDelta);
        if(this.moving){
            this.mHero.mDye.mXform.mPosition[0]-=0.3;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
//        xCamera.incXPosBy(kWASDDelta);
        if(this.moving){
           this.mHero.mDye.mXform.mPosition[0]+=0.3; 
        }
        
    }
    // to interact with the item
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        var hero = this.mAllObjs.mSet[68];
        var floor = hero.floor;
        var xNow = hero.mDye.mXform.mPosition[0];
        
        switch(floor)
        {
            case 0:
                console.log(xNow);
                if(this.moving){
                    if((xNow>-7)&&(xNow<-3)){
                        this.tipInfoOn();
                        this.mMsg.mText = "You have gotten the kay";
                        this.moving = !this.moving;
                        this.iskey=true;
                    }
                }else{
                    this.tipInfoOff();
                    this.moving = !this.moving;
                }
                break;
            case 1:
                if(this.moving && this.iskey===true){
                    if((xNow>-34)&&(xNow<-26)){
                        this.tipInfoOn();
                        this.mMsg.mText = "You have passed this part!";
                        this.moving = !this.moving;
                        this.iskey=true;
                    }
                }else{
                    this.tipInfoOff();
                    this.moving = !this.moving;
                }
                break;
            case 2:
                console.log(xNow);
                break;
            case 3:
                if(this.moving && this.iskey===true){
                    if((xNow>-34)&&(xNow<-26)){
                        this.tipInfoOn();
                        this.mMsg.mText = "You have passed this part!";
                        this.moving = !this.moving;
                        this.iskey=true;
                    }
                }else{
                    this.tipInfoOff();
                    this.moving = !this.moving;
                }
                break;    
        }
    }
    
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
        if (this.mCamera.isMouseInViewport()) {
            var p = this.createParticle(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
            this.mAllParticles.addToSet(p);
        }
    }
    gEngine.ParticleSystem.update(this.mAllParticles);
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        gEngine.Physics.togglePositionalCorrection();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        gEngine.Physics.toggleHasMotion();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        this.radomizeVelocity();
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
        this.mCurrentObj -= 1;
        if (this.mCurrentObj < this.mFirstObject)
            this.mCurrentObj = this.mAllObjs.size() - 1;
    }            
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        this.mCurrentObj += 1;
        if (this.mCurrentObj >= this.mAllObjs.size())
            this.mCurrentObj = this.mFirstObject;
    }

    var obj = this.mAllObjs.getObjectAt(this.mCurrentObj);
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y)) {
        this.increasShapeSize(obj, MyGame2.kBoundDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.U)) {
        this.increasShapeSize(obj, -MyGame2.kBoundDelta);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
        var x = 20 + Math.random() * 60;
        var y = 75;
        var t = Math.random() > 0.5;
        var m = new Minion(this.kMinionSprite, x, y, t);
        this.mAllObjs.addToSet(m);
    }
        
    
    obj.getRigidBody().userSetsState();
    
    this.mAllObjs.update(this.mCamera);
    
    gEngine.Physics.processCollision(this.mAllObjs, this.mCollisionInfos);
    gEngine.ParticleSystem.collideWithRigidSet(this.mAllObjs, this.mAllParticles);

    this.mShapeMsg.setText(obj.getRigidBody().getCurrentState());
};

MyGame2.prototype.createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getParticle().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};
MyGame2.prototype.CrashIntoMonster = function(){
    var xhero = this.mHero.getXform().getXPos();
    var yhero = this.mHero.getXform().getYPos();
    var i;
    for(i=0;i<7;i++){
        if((xhero - this.mMonster[i].getXform().getXPos())>=-5&&
                (xhero - this.mMonster[i].getXform().getXPos())<=5&&
                (yhero - this.mMonster[i].getXform().getYPos())>=-5&&
                (yhero - this.mMonster[i].getXform().getYPos())<=5){
            this.tipInfoOn();
            this.mMsg.mText = " You Fail!                ";
            this.moving = !this.moving;
        }
    }
};
