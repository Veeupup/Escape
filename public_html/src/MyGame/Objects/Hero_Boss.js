// "use strict";  // Operate in Strict mode such that variables must be declared before used!
// function Hero_Boss(spriteTexture , light, x, y) {
//     this.floor = -1;
//     this.kDelta = 0.3;
//     this.xdminnow=0;
//     this.xdmaxnow=21.5;
//     this.ydminnow=32;
//     this.ydmaxnow=128-64;
//     this.xaminnow=0;
//     this.xamaxnow=21.5;
//     this.yaminnow=64;
//     this.yamaxnow=128-32;
//     this.dflag=0;
//     this.aflag=0;
//     this.mDye = null;
//     this.mDye = new LightRenderable(spriteTexture);
//     this.mDye.setColor([1, 1, 1, 0]);
//     this.mDye.getXform().setPosition(x, y);
//     this.mDye.getXform().setSize(5, 8);
//     this.mDye.setElementPixelPositions(21.5,43,128-32,128);
//     this.mDye.addLight(light);
        
//     GameObject.call(this, this.mDye);
    
//     var r = new RigidRectangle(this.getXform(), 5, 8);
//     this.setRigidBody(r);
//     this.toggleDrawRenderable();
//     this.toggleDrawRigidShape();
// }
// gEngine.Core.inheritPrototype(Hero_Boss, WASDObj);