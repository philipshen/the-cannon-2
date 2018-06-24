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
export default class Game extends cc.Component {

    @property(cc.Prefab)
    bullet: cc.Prefab = null

    @property(cc.Prefab)
    meteor: cc.Prefab = null

    @property (cc.RigidBody)
    floor: cc.RigidBody = null // 1

    @property gravity: number = 0

    @property meteorSpawnMinX = 0
    @property meteorSpawnMaxX = 0
    @property meteorSpawnMinY = 0
    @property meteorSpawnMaxY = 0
    @property meteorMinVelocity = 0
    @property meteorMaxVelocity = 0

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        let physicsManager = cc.director.getPhysicsManager() // 2
        physicsManager.enabled = true
        physicsManager.gravity = cc.v2(0, this.gravity)
    }

    start() {
        this.scheduleCreateMeteor()
    }

    // FACTORY
    createBullet(position: cc.Vec2, velocity: number, angle: number) {
        const newBullet = cc.instantiate(this.bullet) // 1
        newBullet.setPosition(position) // 2
        newBullet.rotation = angle

        const body = newBullet.getComponent(cc.RigidBody) // 3
        body.linearVelocity = cc.v2(MathUtilities.sind(angle) * velocity,
                                    MathUtilities.cosd(angle) * velocity)

        this.node.addChild(newBullet) // 4
    }

    createMeteor() {
        const x = this.randInRange(this.meteorSpawnMinX, this.meteorSpawnMaxX)
        const y = this.randInRange(this.meteorSpawnMinY, this.meteorSpawnMaxY)
        const angle = Math.random() * 360
        const velocity = this.randInRange(this.meteorMinVelocity, this.meteorMaxVelocity)

        const node = cc.instantiate(this.meteor)

        node.setPosition(cc.v2(x, y))

        const body = node.getComponent(cc.RigidBody)
        body.linearVelocity = cc.v2(MathUtilities.sind(angle) * velocity, MathUtilities.cosd(angle) * velocity)
        
        this.node.addChild(node)
    }

    scheduleCreateMeteor() {
        cc.director.getScheduler().schedule(this.createMeteor, this, 1 + Math.random() * 1, false);
    }

    // UTILITIES
    randInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

}
