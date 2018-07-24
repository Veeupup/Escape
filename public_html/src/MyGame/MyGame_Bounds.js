/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, MyGame */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var kSpeed = 40;
MyGame.prototype.radomizeVelocity = function()
{
    var i = 0;
    for (i = this.mFirstObject; i<this.mAllObjs.size(); i++) {
        var obj = this.mAllObjs.getObjectAt(i);
        var rigidShape = obj.getRigidBody();
        var x = (Math.random() - 0.5) * kSpeed;
        var y = Math.random() * kSpeed * 0.5;
        rigidShape.setVelocity(x, y);
    }
};

MyGame.prototype.createBounds = function() {
    var x = 15, w = 30, y = 0;
    for (x = -50; x < 240; x+=30) 
        this.platformAt(x, y, w, 0);
    y = 80;
    for (x = -50; x < 240; x+=30) 
        this.platformAt(x, y, w, 180);
    var i = 0;
    //first floor
    this.platformAt(-40, 20, 40, 0, 3.5);
    for(i=0;i<9;i++){
        this.platformAt(20*i, 20, 20, 0, 3.5);
    };
    //second floor
    this.platformAt(-40, 40, 80, 0, 3.5);
    for(i=1;i<7;i++){
        this.platformAt(20*i, 40, 20, 0, 3.5);
    };
    this.platformAt(120, 40, 30, 0, 3.5);
    //third floor
    this.platformAt(130, 60, 100, 0, 3.5);
    for(i=-2;i<4;i++){
        this.platformAt(20*i, 60, 20, 0, 3.5);
    };
    
    x = -48;
    w = 3;
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    x = 148;
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    
    var r = new TextureRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);
    var xf = r.getXform();
    xf.setSize(3, 3);
};

MyGame.prototype.wallAt = function (x, y, w) {
    var h = w * 4;
    var p = new TextureRenderable(this.kWallTexture);
    var xf = p.getXform();
    
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    this.mAllObjs.addToSet(g);
};

MyGame.prototype.platformAt = function (x, y, w, rot, h) {
    //var h = w / 8;
    if(h == null) h = w / 8;
    var p = new TextureRenderable(this.kPlatformTexture);
    var xf = p.getXform();
    
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    this.mAllObjs.addToSet(g);
};

MyGame.prototype.createBounds2 = function() {
    var x = 15, w = 30, y = 0;
    for (x = -50; x < 240; x+=30) 
        this.platformAt(x, y, w, 0);
    y = 80;
    for (x = -50; x < 240; x+=30) 
        this.platformAt(x, y, w, 180);
    var i = 0;
    //first floor
    this.platformAt(120, 20,100, 0, 3.5);
    this.platformAt(50, 20,20, 0, 3.5);
    for(i=-2;i<2;i++){
        this.platformAt(20*i, 20, 20, 0, 3.5);
    };
    //second floor
    this.platformAt(-40, 40, 40, 0, 3.5);
    for(i=0;i<6;i++){
        this.platformAt(20*i, 40, 20, 0, 3.5);
    };
    this.platformAt(140, 40, 40, 0, 3.5);
    //third floor
    this.platformAt(130, 60, 100, 0, 3.5);
    for(i=-2;i<4;i++){
        this.platformAt(20*i, 60, 20, 0, 3.5);
    };
    
    x = -48;
    w = 3;
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    x = 148;
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    
    var r = new TextureRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);
    var xf = r.getXform();
    xf.setSize(3, 3);
};

    