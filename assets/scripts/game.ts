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

// Utiity
const { cos, sin, PI } = Math;
const rad = deg => deg * PI / 180;
const cosd = deg => cos(rad(deg));
const sind = deg => sin(rad(deg));

@ccclass
export default class NewClass extends cc.Component {

    @property
    gravity: number = 0;
    
    @property(cc.Prefab)
    bullet: cc.Prefab = null;

    @property(cc.RigidBody)
    floor: cc.RigidBody = null;

    // LIFE-CYCLE CALLBACKS
    onLoad() {
        // Create physics space
        let physicsManager = cc.director.getPhysicsManager()
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(0, this.gravity);

    }

    start() {
        this.createBullet(0, 0, 200, 90)
    }

    // UTILITIES
    private createBullet(x, y, velocity, angle) {
        const newBullet = cc.instantiate(this.bullet)
        const pos = cc.v2(x, y)
        newBullet.setPosition(pos)
        newBullet.rotation = angle

        // Physics, rigid body
        const body = newBullet.addComponent(cc.RigidBody)
        body.linearVelocity = cc.v2(sind(angle + 90) * velocity, cosd(angle + 90) * velocity)
        body.type = cc.RigidBodyType.Kinematic

        newBullet.addComponent('bullet').setBody(body)
    
        this.node.addChild(newBullet)
    }

}
