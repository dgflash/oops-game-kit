/*
 * @Author: dgflash
 * @Date: 2021-11-18 14:20:46
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-08 09:55:52
 */

import { ecs } from "../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { Initialize } from "../initialize/Initialize";

/** 游戏模块 */
@ecs.register('SingletonModule')
export class SingletonModuleComp extends ecs.Comp {
    /** 游戏初始化模块 */
    initialize: Initialize = null!;

    reset() { }
}

export var smc: SingletonModuleComp = ecs.getSingleton(SingletonModuleComp);