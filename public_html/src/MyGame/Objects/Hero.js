/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture) {
    this.kDelta = 0.3;

    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(-20, 10);
    this.mDye.getXform().setSize(8, 5);
    this.mDye.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.mDye);
    
    var r = new RigidRectangle(this.getXform(), 5, 8);
    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Hero, WASDObj);

Hero.prototype.update = function () {
    var xform=this.getXform().getXPos();
    var yform=this.getXform().getYPos();
    GameObject.prototype.update.call(this);
    
    if(yform>=6&&yform<=20){
        this.floor=0;
    }
    else if(yform>=27&&yform<=37){
        this.floor=1;
    }
    else if(yform>=40&&yform<=56){
        this.floor=2;
    }
    else if(yform>=60&&yform<=75){
        this.floor=3;
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
//        console.log(this.getXform().mPosition,this.floor);
        var floor = this.floor;
        var xNow = this.getXform().getXPos();
        switch(floor)
        {
            case 0:
                console.log(xNow);
                if((xNow>15)&&(xNow<20))
                    console.log("叮咚，你死了");
                break;
            case 1:
                console.log(xNow);
                break;
            case 2:
                console.log(xNow);
                break;
            case 3:
                console.log(xNow);
                break;    
        }
    }
    

};

