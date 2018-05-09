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

// Utility
const clamp = (val, min, max) => val < min ? min : val > max ? max : val;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    barrel: cc.Node = null;

    @property (cc.Node)
    tank: cc.Node = null;

    // Barrel
    @property angle: number = 0;
    @property baseAngleSpeed: number = 0;
    @property angleSpeed: number = 0;
    @property leftMaxAngle: number = 0;
    @property rightMaxAngle: number = 0;

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        // Set up event listeners and stuff
        this.initKeyboardHook();
    }

    update(dt) {
        const { angleSpeed } = this;

        if (angleSpeed !== 0) {
            const angle = this.angle = clamp(this.angle + angleSpeed * dt, -1 * this.leftMaxAngle, this.rightMaxAngle);
            this.barrel.rotation = angle;
        }
    }

    initKeyboardHook() {
        const cannon = this;

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed(kCode, e) {
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
