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

import * as MathUtilities from './Utilities/MathUtilities'

@ccclass
export default class NewClass extends cc.Component {

    @property (cc.Node) // 1
    barrel: cc.Node = null
    
    @property (cc.Node)
    body: cc.Node = null

    @property angle: number = 0
    @property baseAngleSpeed: number = 0
    @property angleSpeed: number = 0
    @property leftMaxAngle: number = 0
    @property rightMaxAngle: number = 0

    onLoad () { // 1
        this.hookInput()
    }

    update(dt) {
        const { angleSpeed } = this;

        if (angleSpeed !== 0) {
            const angle = this.angle = MathUtilities.clamp(this.angle + angleSpeed * dt, 
                                                           this.leftMaxAngle * -1, 
                                                           this.rightMaxAngle);
            this.barrel.rotation = angle;
        }
    }

    hookInput() {
        const cannon = this;

        cc.eventManager.addListener({ // 2
            event: cc.EventListener.KEYBOARD, // 3
            onKeyPressed(kCode, e) { // 4
                switch (kCode) {
                    case cc.KEY.a:
                        cannon.angleSpeed = -1 * cannon.baseAngleSpeed;
                        break;
                    case cc.KEY.d:
                        cannon.angleSpeed = cannon.baseAngleSpeed;
                        break;
                }
            },
            onKeyReleased(kCode, e) {
                switch (kCode) {
                    case cc.KEY.a:
                    case cc.KEY.d:
                        cannon.angleSpeed = 0;
                        break;
                }
            }
        }, this.node);
    }
}
