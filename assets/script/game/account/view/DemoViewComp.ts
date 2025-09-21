import { _decorator } from "cc";
import { gui } from "db://oops-framework/core/gui/Gui";
import { LayerType } from "db://oops-framework/core/gui/layer/LayerEnum";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCView } from "db://oops-framework/module/common/CCView";
import { Account } from "../Account";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('DemoViewComp')
@ecs.register('DemoView', false)
@gui.register('DemoView', { layer: LayerType.UI, prefab: "gui/demo/demo" })
export class DemoViewComp extends CCView<Account> {
    start() {

    }

    reset() {
        this.node.destroy();
    }
}