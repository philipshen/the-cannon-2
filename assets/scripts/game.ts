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

    @property gravity: number = 0;
    
    @property(cc.Prefab)
    bullet: cc.Prefab = null

    @property(cc.Prefab)
    meteor: cc.Prefab = null

    @property meteorSpawnMinX = 0 // In medium article, note that the "= 0" is necessary for it to be editable in Cocos Creator
    @property meteorSpawnMaxX = 0
    @property meteorSpawnMinY = 0
    @property meteorSpawnMaxY = 0
    @property meteorMinVelocity = 0
    @property meteorMaxVelocity = 0

    @property(cc.RigidBody)
    floor: cc.RigidBody = null

    // LIFE-CYCLE CALLBACKS
    onLoad() {
        // Create physics space
        let physicsManager = cc.director.getPhysicsManager()
        physicsManager.enabled = true
        physicsManager.gravity = cc.v2(0, this.gravity)

        this.createMeteor()
    }

    createBullet(position: cc.Vec2, velocity: number, angle: number) {
        const newBullet = cc.instantiate(this.bullet)
        newBullet.setPosition(position) 
        newBullet.rotation = angle
        newBullet.zIndex = -1

        // Physics, rigid body
        // const body = newBullet.addComponent(cc.RigidBody)
        const body = newBullet.getComponent(cc.RigidBody)
        body.linearVelocity = cc.v2(sind(angle) * velocity, cosd(angle) * velocity)
        body.type = cc.RigidBodyType.Kinematic

        newBullet.addComponent('bullet')
        
        this.node.addChild(newBullet)
    }

    createMeteor() {
        const x = this.randInRange(this.meteorSpawnMinX, this.meteorSpawnMaxX)
        const y = this.randInRange(this.meteorSpawnMinY, this.meteorSpawnMaxY)
        const angle = 115 + Math.random() * 20
        const velocity = this.randInRange(this.meteorMinVelocity, this.meteorMaxVelocity)

        const node = cc.instantiate(this.meteor)
        node.setPosition(cc.v2(x, y))

        const body = node.getComponent(cc.RigidBody)
        body.linearVelocity = cc.v2(sind(angle) * velocity, cosd(angle) * velocity)
        
        this.node.addChild(node)
    }
    
    // Utilities
    randInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

}