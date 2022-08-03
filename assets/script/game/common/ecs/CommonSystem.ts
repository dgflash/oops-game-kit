/*
 * @Author: dgflash
 * @Date: 2021-07-03 16:13:17
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-03 10:19:49
 */
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { EcsInitializeSystem } from "../../initialize/Initialize";

/** 多模块系统组件注册 */
export class CommonSystem extends ecs.System {
    constructor() {
        super();

        // 添加自定义游戏模块
        this.add(new EcsInitializeSystem());
    }
}
