/*
 * @Author: dgflash
 * @Date: 2021-11-11 17:45:23
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-01 13:49:37
 */
import { ecs } from "../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { AccountModelComp } from "./model/AccountModelComp";

/** 账号模块 */
@ecs.register('Account')
export class Account extends ecs.Entity {
    AccountModel!: AccountModelComp;

    protected init() {
        this.addComponents<ecs.Comp>(AccountModelComp);
    }
}