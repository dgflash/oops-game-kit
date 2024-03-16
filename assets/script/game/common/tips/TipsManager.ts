/*
 * @Author: dgflash
 * @Date: 2021-07-03 16:13:17
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-05 10:13:47
 */
import { Node, tween, Vec3 } from "cc";
import { UICallbacks } from "../../../../../extensions/oops-plugin-framework/assets/core/gui/layer/Defines";
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { UIID } from "../config/GameUIConfig";

/** 提示窗口管理 */
class TipsManager {
    /**
     * 提示弹出窗口
     * @param content   提示内容文本或多语言关键字
     * @param onOk      确认回调
     * @param title     窗口标题文本或多语言关键字
     * @param okWord    确认按钮文本或多语言关键字
     */
    alert(content: string, onOk?: Function, title?: string, okWord?: string) {
        let operate: any = {
            title: title ? title : 'common_prompt_title',
            content: content,
            okWord: okWord ? okWord : 'common_prompt_ok',
            okFunc: onOk,
            needCancel: false
        };
        oops.gui.open(UIID.Alert, operate, tips.getPopCommonEffect());
    }

    /**
     * 确认弹出窗口
     * @param content   提示内容文本或多语言关键字
     * @param onOk      确认回调
     * @param onCancel  取消回调
     * @param title     窗口标题文本或多语言关键字
     * @param okWord    确认按钮文本或多语言关键字
     */
    confirm(content: string, onOk?: Function, onCancel?: Function, title?: string, okWord?: string) {
        let operate: any = {
            title: title ? title : 'common_prompt_title',
            content: content,
            okWord: okWord ? okWord : 'common_prompt_ok',
            cancelWord: 'common_prompt_cancal',
            okFunc: onOk,
            cancelFunc: onCancel,
            needCancel: true
        };
        oops.gui.open(UIID.Confirm, operate, tips.getPopCommonEffect());
    }

    /** 自定义弹窗动画 */
    private getPopCommonEffect(callbacks?: UICallbacks) {
        let newCallbacks: UICallbacks = {
            // 节点添加动画
            onAdded: (node, params) => {
                node.setScale(0.1, 0.1, 0.1);

                tween(node)
                    .to(0.2, { scale: new Vec3(1, 1, 1) })
                    .start();
            },
            // 节点删除动画
            onBeforeRemove: (node, next) => {
                tween(node)
                    .to(0.2, { scale: new Vec3(0.1, 0.1, 0.1) })
                    .call(next)
                    .start();
            },
        }

        if (callbacks) {
            if (callbacks && callbacks.onAdded) {
                let onAdded = callbacks.onAdded;
                callbacks.onAdded = (node: Node, params: any) => {
                    onAdded(node, params);

                    // @ts-ignore
                    newCallbacks.onAdded(node, params);
                };
            }

            if (callbacks && callbacks.onBeforeRemove) {
                let onBeforeRemove = callbacks.onBeforeRemove;
                callbacks.onBeforeRemove = (node, params) => {
                    onBeforeRemove(node, params);

                    // @ts-ignore
                    newCallbacks.onBeforeRemove(node, params);
                };
            }
            return callbacks;
        }
        return newCallbacks;
    }
}

export var tips = new TipsManager();