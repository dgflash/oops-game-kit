/*
 * @Author: dgflash
 * @Date: 2022-07-22 17:06:22
 * @LastEditors: dgflash
 * @LastEditTime: 2023-07-25 17:53:47
 */
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { AsyncQueue, NextFunction } from "../../../../../extensions/oops-plugin-framework/assets/libs/collection/AsyncQueue";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { UIID } from "../../common/config/GameUIConfig";
import { Initialize } from "../Initialize";
import { LoadingViewComp } from "../view/LoadingViewComp";

/** 初始化游戏公共资源 */
@ecs.register('InitRes')
export class InitResComp extends ecs.Comp {
    reset() { }
}

export class InitResSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(InitResComp);
    }

    entityEnter(e: Initialize): void {
        var queue: AsyncQueue = new AsyncQueue();

        /** 加载远程资源配置 */
        this.loadBundle(queue);
        // 加载自定义资源
        this.loadCustom(queue);
        // 加载多语言包加载多语言包
        this.loadLanguage(queue);
        // 加载公共资源
        this.loadCommon(queue);
        // 加载游戏内容加载进度提示界面
        this.onComplete(queue, e);

        queue.play();
    }

    /** 加载远程资源配置 */
    private loadBundle(queue: AsyncQueue) {
        queue.push(async (next: NextFunction, params: any, args: any) => {
            // 设置默认加载的外部资源包名
            oops.res.defaultBundleName = oops.config.game.bundleName;

            // 加载外部资源包
            if (oops.config.game.bundleEnable) {
                console.log("启用远程资源运行游戏");
                await oops.res.loadBundle(oops.config.game.bundleServer, oops.config.game.bundleVersion);
            }
            else {
                await oops.res.loadBundle(oops.config.game.bundleName);
            }
            next();
        });
    }

    /** 加载自定义内容（可选） */
    private loadCustom(queue: AsyncQueue) {
        queue.push(async (next: NextFunction, params: any, args: any) => {
            // 加载多语言对应字体
            oops.res.load("language/font/" + oops.language.current, next);
        });
    }

    /** 加载化语言包（可选） */
    private loadLanguage(queue: AsyncQueue) {
        queue.push((next: NextFunction, params: any, args: any) => {
            // 设置默认语言
            let lan = oops.storage.get("language");
            if (lan == null) {
                lan = "zh";
                oops.storage.set("language", lan);
            }

            // 加载语言包资源
            oops.language.setLanguage(lan, next);
        });
    }

    /** 加载公共资源（必备） */
    private loadCommon(queue: AsyncQueue) {
        queue.push((next: NextFunction, params: any, args: any) => {
            oops.res.loadDir("common", next);
        });
    }

    /** 加载完成进入游戏内容加载界面 */
    private onComplete(queue: AsyncQueue, e: Initialize) {
        queue.complete = async () => {
            var node = await oops.gui.openAsync(UIID.Loading);
            if (node) e.add(node.getComponent(LoadingViewComp) as ecs.Comp);
            e.remove(InitResComp);
        };
    }
}