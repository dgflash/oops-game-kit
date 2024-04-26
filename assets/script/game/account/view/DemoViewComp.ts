import { _decorator } from "cc";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { CCComp } from "../../../../../extensions/oops-plugin-framework/assets/module/common/CCComp";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('DemoViewComp')
@ecs.register('DemoView', false)
export class DemoViewComp extends CCComp {
    start() {

    }

    reset() {
        this.node.destroy();
    }
}