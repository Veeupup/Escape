//这个文件用来初始化第一关卡的各种功能
"use strict";

MyGame.prototype.CrashIntoMonster = function(){
    var xhero = this.mHero.getXform().getXPos();
    var yhero = this.mHero.getXform().getYPos();
    var i;
    for(i=0;i<7;i++){
        if((xhero - this.mMonster[i].getXform().getXPos())>=-5&&
                (xhero - this.mMonster[i].getXform().getXPos())<=5&&
                (yhero - this.mMonster[i].getXform().getYPos())>=-8&&
                (yhero - this.mMonster[i].getXform().getYPos())<=8&&(this.isMoving=== true)){
            var myGame = new MyGame();
            gEngine.Core.initializeEngineCore('GLCanvas', myGame);
            console.log("死掉");  
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
    var ele1 = this.mAllObjs.mSet[n+73];
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
    var i = 0;
    var ripName = "";
    for(i=0;i<7;i++){
        if((xTrack - this.mMonster[i].getXform().getXPos())>=-5&&
                (xTrack - this.mMonster[i].getXform().getXPos())<=5&&
                (yTrack - this.mMonster[i].getXform().getYPos())>=-8&&
                (yTrack - this.mMonster[i].getXform().getYPos())<=8){
            this.mMonster[i].mRenderComponent.mXform.mPosition[0] = -100;
            this.mMonster[i].mRenderComponent.mXform.mPosition[1] = -100;
            this.mNetTrack.mXform.mPosition[0] = -100;
            this.mNetTrack.mXform.mPosition[1] = -100;
            this.ripSet[this.ripNum].mXform.mPosition[0] = xTrack;
            this.ripSet[this.ripNum++].mXform.mPosition[1] = yTrack-1;
            return true;
        }
    }
    return false;
};

MyGame.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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
MyGame.prototype.bulletmove = function() {
            if(this.mbulletflag === 0){
            this.mbulletdirection = this.mdirection;
            var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
            var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
            this.mbullet.mXform.mPosition[0] = xHero;
            this.mbullet.mXform.mPosition[1] = yHero;
            this.mbulletflag = 1;
            }
};
MyGame.prototype.BulletCrashInto = function(){
    var xbullet = this.mbullet.mXform.mPosition[0];
    var ybullet = this.mbullet.mXform.mPosition[1];
     for(var i=0;i<7;i++){
        if((xbullet - this.mMonster[i].getXform().getXPos())>=-5&&
                (xbullet - this.mMonster[i].getXform().getXPos())<=5&&
                (ybullet - this.mMonster[i].getXform().getYPos())>=-8&&
                (ybullet - this.mMonster[i].getXform().getYPos())<=8){
            
            this.ripSet[this.ripNum].mXform.mPosition[0] = xbullet;
            this.ripSet[this.ripNum++].mXform.mPosition[1] = ybullet-1;
            this.mMonster[i].mRenderComponent.mXform.mPosition[0] = -50;
            this.mMonster[i].mRenderComponent.mXform.mPosition[1] = -1000;
            this.mNetTrack.mXform.mPosition[0] = -50;
            this.mNetTrack.mXform.mPosition[1] = -50;
            
            
            this.mgunstate = false;
            this.mbullet.mXform.mPosition[1] = -50;
            this.mbullet.mXform.mPosition[0] = 20;
            this.mbulletflag = 0;
            return true;
        }
    }
    if(xbullet>300||xbullet<-50){
        this.mgunstate = false;
            this.mbullet.mXform.mPosition[1] = -50;
            this.mbullet.mXform.mPosition[0] = 20;
            this.mbulletflag = 0;
    }
};
MyGame.prototype.bulletjudge = function(){
    if(this.mgunstate === true)
    {
        if(this.mbulletmovespeedflag!==0)
        {
            this.mbulletmovespeedflag++;
            if(this.mbulletmovespeedflag === 5)
            {
                this.mbulletmovespeedflag=0;
            }
        }
        else if(this.mbulletflag === 1)
        {
            if(this.mbulletdirection === 1){
                this.mbullet.mXform.mPosition[0] += 5;
                this.mbulletmovespeedflag++;
            }
            else if(this.mbulletdirection === -1){
                this.mbullet.mXform.mPosition[0] -= 5;
                this.mbulletmovespeedflag++;
            }
        }
        this.BulletCrashInto(); 
    }
};