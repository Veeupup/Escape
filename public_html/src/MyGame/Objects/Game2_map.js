//这个文件用来初始化第一关卡地图资源的位置及属性的初始化
"use strict";
//初始化
MyGame2.prototype._initialAll = function(){
    this.mBack = this._initialItem( this.kBackGround, 50, 40, 200, 100, this.kLight);
    this.mDoor = this._initialItem( this.kDoor, 140, 7, 8, 10, this.kLight);
    this.mDoor1 = this._initialItem( this.kDoor, -30, 67, 8, 10, this.kLight);

    //key的初始化
    switch(this.keyrandom){
        case 0 :
            this.mkey = this._initialItem( this.kKey, 135, 25, 5, 6, this.kLight);
            break;
        case 1 :
            this.mkey = this._initialItem( this.kKey, 20, 45, 5, 6, this.kLight);
            break;
        case 2 :
            this.mkey = this._initialItem( this.kKey, 100, 45, 5, 6, this.kLight);
            break;
    };
    //两个宝箱的定义
    this.mchest = this._initialItem( this.kChest, -5, 65, 5, 6, this.kLight);

    var xchest1 = this.chestPosition[this.chestrandom][0];
    var ychest1 = this.chestPosition[this.chestrandom][1];
    this.mchest1 = this._initialItem( this.kChest, xchest1, ychest1, 5, 6, this.kLight);

    //游戏道具
    this.mGun = this._initialItem( this.kGun, 10, -50, 5, 6, this.kLight);
    this.mNet = this._initialItem( this.kNet, 10, -50, 5, 6, this.kLight);
    this.mbullet = this._initialItem( this.kbullet, 20, -50, 3, 3, this.kLight);
    this.mNetTrack = this._initialItem( this.kNetTrack, 10, -50, 5, 5, this.kLight);
    this.mpaper = this._initialItem( this.kPaper, 0, -40, 80, 15, this.kLight);

};

MyGame2.prototype._initialItem = function( texture, x, y, width, height, light){
    var item = new LightRenderable(texture);

    item.getXform().setPosition( x , y);
    item.getXform().setSize( width, height);
    item.addLight(light);
    return item;
};

MyGame2.prototype._initialMinion = function(){
    //minons initialize
    var m = null;
    m = new Minion(this.kMinion, -35,10,-40,-32,this.kLight);
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 120,10,110,130,this.kLight);
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, -10,40,-15,5,this.kLight );
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 80,40,70,90,this.kLight );
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 125,50,122,128 ,this.kLight);
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 100,70,95,105,this.kLight );
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 50,70,40,60,this.kLight );
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);

    m = new Minion(this.kMinion, 120,70,115,125 ,this.kLight);
    this.mAllObjs.addToSet(m);
    this.mMonster.push(m);
};

