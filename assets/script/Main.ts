/*
 * @Author: dgflash
 * @Date: 2021-07-03 16:13:17
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-03 10:18:56
 */
import { profiler, _decorator } from 'cc';
import { DEBUG } from 'cc/env';
import { ecs } from '../../extensions/oops-plugin-framework/assets/libs/ecs/ECS';
import { CommonEnter } from './game/common/ecs/CommonEnter';
import { smc } from './game/common/ecs/SingletonModuleComp';
import { Initialize } from './game/initialize/Initialize';

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends CommonEnter {
    start() {
        if (DEBUG) profiler.showStats();
    }

    protected async run() {
        smc.initialize = ecs.getEntity<Initialize>(Initialize);
    }
}
