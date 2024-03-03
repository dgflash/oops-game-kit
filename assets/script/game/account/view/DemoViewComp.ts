import { EventKeyboard, EventTouch, _decorator } from "cc";
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { CCComp } from "../../../../../extensions/oops-plugin-framework/assets/module/common/CCComp";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('DemoViewComp')
@ecs.register('DemoView', false)
export class DemoViewComp extends CCComp {
    /** 视图层逻辑代码分离演示 */
    start() {
        this.setButton("onBtnTopLeft", "onBtnTopRight", "onBtnGlobalEvent");
        this.setEvent("onGlobal");
        this.setKeyboard(true);
        this.setGameShow();
        this.setGameHide();
        this.setGameResize();
    }

    private onBtnTopLeft(event: EventTouch) {
        oops.gui.toast("点击左上按钮");
    }

    private onBtnTopRight(event: EventTouch) {
        oops.gui.toast("点击右上按钮");
    }

    private onBtnGlobalEvent(event: EventTouch) {
        this.dispatchEvent("onGlobal", "收到全局事件");
    }

    private onGlobal(event: string, args: any) {
        oops.gui.toast(args);
    };

    protected onKeyDown(event: EventKeyboard): void {
        oops.gui.toast(`按键事件的按键码为：${event.keyCode}`);
    }

    protected onGameShow(): void {
        console.log("监听游戏从后台进入事件");
    }

    protected onGameHide(): void {
        console.log("监听游戏切到后台事件");
    }

    protected onGameResize() {
        console.log("游戏尺寸变化");
    }

    /** 视图对象通过 ecs.Entity.remove(ModuleViewComp) 删除组件是触发组件处理自定义释放逻辑 */
    reset() {
        this.node.destroy();
    }
}