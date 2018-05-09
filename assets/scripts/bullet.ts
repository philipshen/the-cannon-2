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

const { PI, acos, sqrt } = Math
const deg = rad => rad * (180/PI)

@ccclass
export default class NewClass extends cc.Component {

    body: cc.RigidBody
    timeToLive: number = 10000
    lifeTime: number = 0 

    // LIFE-CYCLE CALLBACKS:
    update(dt) {
        if (!cc.isValid(this.node) || !this.body) return

        const { linearVelocity: { x, y } } = this.body;
        
        this.lifeTime += dt * 1000;

        this.node.rotation = deg(acos(y / (sqrt(x*x + y*y))))

        if (this.lifeTime >= this.timeToLive) {
            this.node.destroy()
        }
    }

    // Control
    setBody(body) {
        this.body = body
    }

}
