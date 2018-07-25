/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
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
    this.kNet = "assets/net.png";
    this.kNetTrack = "assets/track.png";
    this.kRip = "assets/rip.png";
    //music
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kfindzombie = "assets/sounds/findzombie.wav";
    
    this.kChest = "assets/chest.png";
    
    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;
    this.mShapeMsg = null;
    

    this.mAllObjs = null;
    this.mElevator = null;
    this.mAllParticles = null;
    this.mBounds = null;
    this.mCollisionInfos = [];
    
    this.mHero = null;
    //map items
    this.mBack = null;
    this.mDoor = null;
    this.mDoor1 = null;
    this.mchest = null;
    this.mNet = null;
    this.mNetTrack = null;
    this.ripNum = 0;
    this.mRip0 = null;
    this.mRip1 = null;
    this.mRip2 = null;
    this.mRip3 = null;
    
    this.mMonster = [];
    
    this.mpaper = null;
    this.mkey = null;
    
    this.mCurrentObj = 0;
    this.mTarget = null;
    
    this.moving = true;
    this.iskey = false;
    this.top = false;
    this.isChest0 = false;
    this.isNet = 0;
    this.isNetTrackSet = false;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kBackGround);
    gEngine.Textures.loadTexture(this.kDoor);
    gEngine.Textures.loadTexture(this.kKey);
    gEngine.Textures.loadTexture(this.kPaper);
    gEngine.Textures.loadTexture(this.kMinion);
    gEngine.Textures.loadTexture(this.kChest);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kfindzombie);
    gEngine.Textures.loadTexture(this.kNet);
    gEngine.Textures.loadTexture(this.kNetTrack);
    gEngine.Textures.loadTexture(this.kRip);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kBackGround);
    gEngine.Textures.unloadTexture(this.kDoor);
    gEngine.Textures.unloadTexture(this.kKey);
    gEngine.Textures.unloadTexture(this.kPaper);
    gEngine.Textures.unloadTexture(this.kMinion);
    gEngine.Textures.unloadTexture(this.kChest);
    gEngine.Textures.unloadTexture(this.kNet);
    gEngine.Textures.unloadTexture(this.kNetTrack);
    gEngine.AudioClips.unloadAudio(this.kfindzombie);
    gEngine.Textures.unloadTexture(this.kRip);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 10), // position of t                                                                                                       ``                                                                                                                                                                                                                                                                                                                                          he camera
        100,                     // width of camera
        [0, 0, 1024, 484]         // viewport (orgX, orgY, width, height)
    );
//    this.mCamera.setBackgroundColor([1, 0.8, 0.8, 0.5]);
            // sets the background to gray
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
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
    
    //other items in map
    this.mkey = new SpriteRenderable(this.kKey);
    this.mkey.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mkey.getXform().setPosition(135, 25);
    this.mkey.getXform().setSize(5, 6);
    
    this.mchest = new SpriteRenderable(this.kChest);
    this.mchest.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mchest.getXform().setPosition(-5, 4);
    this.mchest.getXform().setSize(5, 6);

    this.mNet = new SpriteRenderable(this.kNet);
    this.mNet.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mNet.getXform().setPosition(10, -50);
    this.mNet.getXform().setSize(5, 6);

    this.mNetTrack = new SpriteRenderable(this.kNetTrack);
    this.mNetTrack.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mNetTrack.getXform().setPosition(10, -50);
    this.mNetTrack.getXform().setSize(5, 5);
    
    //rips
    this.mRip3 = new SpriteRenderable(this.kRip);
    this.mRip3.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mRip3.getXform().setPosition(10, -50);
    this.mRip3.getXform().setSize(5, 5);

    this.mRip0 = new SpriteRenderable(this.kRip);
    this.mRip0.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mRip0.getXform().setPosition(10, -50);
    this.mRip0.getXform().setSize(5, 5);

    this.mRip1 = new SpriteRenderable(this.kRip);
    this.mRip1.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mRip1.getXform().setPosition(10, -50);
    this.mRip1.getXform().setSize(5, 5);

    this.mRip2 = new SpriteRenderable(this.kRip);
    this.mRip2.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mRip2.getXform().setPosition(10, -50);
    this.mRip2.getXform().setSize(5, 5);

    this.mpaper = new SpriteRenderable(this.kPaper);
    this.mpaper.setColor([0, 0.5, 1, 0]);  // No tinting
    this.mpaper.getXform().setPosition(0, -40);
    this.mpaper.getXform().setSize(40, 32);
    
    this.mHero = new Hero(this.kMinionSprite);
    this.mAllObjs = new GameObjectSet();
    this.mElevator = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
    
    this.createBounds2();
    this.createElevator();
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

    m = new Minion(this.kMinion, 120,10,110,130);
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
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    //gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    //where is the item
    this.mBack.draw(this.mCamera);
    this.mchest.draw(this.mCamera);
    this.mNet.draw(this.mCamera);
    this.mNetTrack.draw(this.mCamera);

    this.mDoor.draw(this.mCamera);
    this.mDoor1.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    this.mElevator.draw(this.mCamera);
   
    
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
    this.mkey.draw(this.mCamera);
    this.mRip.draw(this.mCamera);
    this.mRip0.draw(this.mCamera);
    this.mRip1.draw(this.mCamera);
    this.mRip2.draw(this.mCamera);

};

MyGame.prototype.increasShapeSize = function(obj, delta) {
    var s = obj.getRigidBody();
    var r = s.incShapeSizeBy(delta);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.kBoundDelta = 0.1;

MyGame.prototype.updateState = function(){
    var xHero = this.mHero.mDye.mXform.mPosition[0];
    var yHero = this.mHero.mDye.mXform.mPosition[1];
    this.mpaper.mXform.mPosition[0] = xHero;
//    this.mMsg.mXform.mPosition[0] = xHero;
   
    this.mCamera.mCameraState.mCenter.mCurrentValue[0] = xHero;
    this.mCamera.mCameraState.mCenter.mCurrentValue[1] = yHero;
    if(!this.moving){
        this.mMsg.mXform.mPosition[0] = xHero-15;
        this.mpaper.mXform.mPosition[1] = yHero;
        this.mMsg.mXform.mPosition[1] = yHero;
        this.mCamera.mCameraState.mCenter.mCurrentValue[1] = yHero;
    }else{
         this.mpaper.mXform.mPosition[1] = -100;
        this.mMsg.mXform.mPosition[1] = -100;
    }
    //update the item's position
    if(this.iskey){
        this.mkey.mXform.mPosition[0] = xHero + 40;
        this.mkey.mXform.mPosition[1] = yHero + 20;
    }
    if(this.isChest0){
        this.mNet.mXform.mPosition[0] = xHero + 30;
        this.mNet.mXform.mPosition[1] = yHero + 20;
    }
    
};

MyGame.prototype.update = function () {
    var msg = "";   
    var that = this;
    var moveStep = 0.3;
   
    //detect the netTrack
    if(this.isNetTrackSet){
        var kill = this.NetTrack();
        if(kill) this.isNetTrackSet = false;
    }
   
    //moving th elevator
    this.elevatoraction(0,2,22);
    this.elevatoraction(1,22,42);
    this.elevatoraction(2,22,42);
    this.elevatoraction(3,42,62);
    
    // movving
    this.updateState();
    this.CrashIntoMonster();
    this.chase();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
//        xCamera.incYPosBy(0.2);
        if(this.moving){
            this.mHero.mDye.mXform.incYPosBy(0.15);
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        console.log(this.isNet);
        if(this.isNet){
            var xHero = this.mHero.mDye.mXform.mPosition[0];
            var yHero = this.mHero.mDye.mXform.mPosition[1];
            this.mNetTrack.mXform.mPosition[0] = xHero;
            this.mNetTrack.mXform.mPosition[1] = yHero;
            this.isNet -= 1;
            if(this.isNet==0){
                this.mNet.mXform.mPosition[0] = -40;
                this.mNet.mXform.mPosition[1] = -40;
                this.isChest0 = false;
            }
            
            this.isNetTrackSet = true;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
//        xCamera.incXPosBy(-kWASDDelta);
        if(this.moving){
            this.mHero.mDye.mXform.mPosition[0]-=moveStep;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
//        xCamera.incXPosBy(kWASDDelta);
        if(this.moving){
           this.mHero.mDye.mXform.mPosition[0]+=moveStep; 
        }
        
    }
    // to interact with the item
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        var hero = this.mAllObjs.mSet[72];
        var floor = hero.floor;
        var xNow = hero.mDye.mXform.mPosition[0];
        
        switch(floor)
        {
            case 0:
            if(this.moving){
                if((xNow>-7)&&(xNow<-1)&&this.isChest0===false){
                    var xHero = this.mHero.mDye.mXform.mPosition[0];
                    var yHero = this.mHero.mDye.mXform.mPosition[1];
                    this.mNet.mXform.mPosition[0] = xHero + 20;
                    this.mNet.mXform.mPosition[1] = yHero + 20;
                    this.mNet.mXform.mScale[0] = 4;
                    this.mNet.mXform.mScale[1] = 4;
                    this.mMsg.mText = "You have gotten the chest";
                    this.moving = !this.moving;
                    this.isChest0 = true;
                    this.isNet = 3;
                }
            }else{
//                    this.tipInfoOff();
                this.moving = !this.moving;
            }
                break;
            case 1:
                if(this.moving){
                    if((xNow>132)&&(xNow<138)&&this.iskey===false){
                        console.log(this.mkey);
                        var xHero = this.mHero.mDye.mXform.mPosition[0];
                        var yHero = this.mHero.mDye.mXform.mPosition[1];
                        this.mkey.mXform.mPosition[0] = xHero + 20;
                        this.mkey.mXform.mPosition[1] = yHero + 20;
                        this.mkey.mXform.mScale[0] = 2.5;
                        this.mkey.mXform.mScale[1] = 3;
                        this.mMsg.mText = "You have gotten the kay";
                        this.moving = !this.moving;
                        this.iskey=true;
                    }
                }else{
                    this.moving = !this.moving;
                }
                break;
            case 2:
                console.log(xNow);
                break;
            case 3:
                console.log(xNow);
                if(this.moving && this.iskey===true){
                    if((xNow>-34)&&(xNow<-26)){

                        this.mMsg.mText = "You have passed this part!";
                        this.iskey=true;
                        
                        var myGame2 = new MyGame2();
                        gEngine.Core.initializeEngineCore('GLCanvas', myGame2);
                    }
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
        this.increasShapeSize(obj, MyGame.kBoundDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.U)) {
        this.increasShapeSize(obj, -MyGame.kBoundDelta);
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

MyGame.prototype.createParticle = function(atX, atY) {
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
MyGame.prototype.CrashIntoMonster = function(){
    var xhero = this.mHero.getXform().getXPos();
    var yhero = this.mHero.getXform().getYPos();
    var i;
    for(i=0;i<7;i++){
        if((xhero - this.mMonster[i].getXform().getXPos())>=-5&&
                (xhero - this.mMonster[i].getXform().getXPos())<=5&&
                (yhero - this.mMonster[i].getXform().getYPos())>=-8&&
                (yhero - this.mMonster[i].getXform().getYPos())<=8){
            //this.tipInfoOn();
            this.mMsg.mText = "                You Fail!";
            this.moving = false;
            var myGame = new MyGame();
            gEngine.Core.initializeEngineCore('GLCanvas', myGame);
        }
    }
};

MyGame.prototype.chase=function(){
    var xhero = this.mHero.getXform().getXPos();
    var yhero = this.mHero.getXform().getYPos();
    var i;
    for(i=0;i<7;i++){
        if((xhero - this.mMonster[i].getXform().getXPos())>=-20&&
                (xhero - this.mMonster[i].getXform().getXPos())<-5&&
                (yhero - this.mMonster[i].getXform().getYPos())>=-5&&
                (yhero - this.mMonster[i].getXform().getYPos())<=5){
            this.mMonster[i].flag=-1;
            gEngine.AudioClips.playACue(this.kfindzombie);
            
        }
        else if((xhero - this.mMonster[i].getXform().getXPos())>5&&
                (xhero - this.mMonster[i].getXform().getXPos())<=20&&
                (yhero - this.mMonster[i].getXform().getYPos())>=-5&&
                (yhero - this.mMonster[i].getXform().getYPos())<=5){
            gEngine.AudioClips.playACue(this.kfindzombie);
            this.mMonster[i].flag=1;
        }
        else
            this.mMonster[i].flag=0;
    }
};
MyGame.prototype.elevatoraction = function (n,ylow,yhigh) {
    var ele1 = this.mAllObjs.mSet[n+68];
    var ele1_h = ele1.mRenderComponent.mXform.mPosition[1];
    if((ele1_h-yhigh)<0 && this.top===false){
        ele1.mRenderComponent.mXform.mPosition[1]+=0.2;
    }
    if((ele1_h-yhigh)<0.001&&(ele1_h-yhigh)>0){
        this.top = true;
    }
    if((ele1_h-ylow)>0 && this.top===true){
        ele1.mRenderComponent.mXform.mPosition[1]-=0.2;
    }
    if((ele1_h-ylow)<0.0001){
        this.top = false;
    }
};

MyGame.prototype.NetTrack = function(){
    var xTrack = this.mNetTrack.mXform.mPosition[0];
    var yTrack = this.mNetTrack.mXform.mPosition[1];
    console.log(xTrack,yTrack);
    var i = 0;
    var ripName = "";
    for(i=0;i<7;i++){
        if((xTrack - this.mMonster[i].getXform().getXPos())>=-5&&
                (xTrack - this.mMonster[i].getXform().getXPos())<=5&&
                (yTrack - this.mMonster[i].getXform().getYPos())>=-8&&
                (yTrack - this.mMonster[i].getXform().getYPos())<=8){
            this.mMonster[i].mRenderComponent.mXform.mPosition[0] = -50;
            this.mMonster[i].mRenderComponent.mXform.mPosition[1] = -50;
            this.mNetTrack.mXform.mPosition[0] = -50;
            this.mNetTrack.mXform.mPosition[1] = -50;
            
            return true;
        }
    }
    return false;
};