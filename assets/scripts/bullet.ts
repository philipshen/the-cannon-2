// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import Game from './game'

@ccclass
export default class Bullet extends cc.Component {

    game: Game

    timeToLive: number = 5000
    lifeTime: number = 0 

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.game = cc.find('/game').getComponent('game')
    }

    update(dt) {
        if (!cc.isValid(this.node)) return
        
        this.lifeTime += dt * 1000;
        if (this.lifeTime >= this.timeToLive) {
            this.node.destroy()
        }
    }

    // Collider callbacks
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name === "meteor") {
            selfCollider.node.destroy()
            otherCollider.node.destroy()

            this.game.createExplosion(otherCollider.node.position)
        }
    }

}
