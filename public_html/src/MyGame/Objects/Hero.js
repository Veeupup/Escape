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
    this.xdminnow=3;
    this.xdmaxnow=17;
    this.ydminnow=128-64;
    this.ydmaxnow=128-42;
    this.xaminnow=3;
    this.xamaxnow=17;
    this.yaminnow=0;
    this.yamaxnow=128-106;
    this.dflag=0;
    this.aflag=0;
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(0, 10);
    this.mDye.getXform().setSize(5, 8);
    this.mDye.setElementPixelPositions(22,38,128-98,128-72);
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
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if(this.dflag===0)
        {
            this.mDye.setElementPixelPositions(this.xdminnow,this.xdmaxnow,this.ydminnow,this.ydmaxnow);
            this.xdminnow+=22;
            this.xdmaxnow+=22;
            if(this.xdminnow>64)
            {
                this.xdminnow=3;
            }
            if(this.xdmaxnow>64)
            {
                this.xdmaxnow=17;
            }
        }
        this.dflag++;
        if(this.dflag===8){
            this.dflag=0;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if(this.aflag===0){
        this.mDye.setElementPixelPositions(this.xaminnow,this.xamaxnow,this.yaminnow,this.yamaxnow);
        this.xaminnow+=22;
        this.xamaxnow+=22;
        if(this.xaminnow>64){
            this.xaminnow=3;
        }
        if(this.xamaxnow>64){
            this.xamaxnow=17;
        }
        }
        this.aflag++;
        if(this.aflag===8){
            this.aflag=0;
        }
    }

};
