/*
 * @Date: 2021-08-12 09:33:37
 * @LastEditors: dgflash
 * @LastEditTime: 2023-02-15 09:38:36
 */
import { LayerType, UIConfig } from "../../../../../extensions/oops-plugin-framework/assets/core/gui/layer/LayerManager";

/** 界面唯一标识（方便服务器通过编号数据触发界面打开） */
export enum UIID {
    /** 资源加载界面 */
    Loading = 1,
    /** 提示弹出窗口 */
    Alert,
    /** 确认弹出窗口 */
    Confirm,
    /** 加载与延时提示界面 */
    Netinstable,
    /** DEMO */
    Demo
}

/** 打开界面方式的配置数据 */
export var UIConfigData: { [key: number]: UIConfig } = {
    [UIID.Loading]: { layer: LayerType.UI, prefab: "gui/loading/loading" },
    [UIID.Netinstable]: { layer: LayerType.PopUp, prefab: "common/prefab/netinstable" },
    [UIID.Alert]: { layer: LayerType.Dialog, prefab: "common/prefab/alert" },
    [UIID.Confirm]: { layer: LayerType.Dialog, prefab: "common/prefab/confirm" },
    [UIID.Demo]: { layer: LayerType.UI, prefab: "gui/demo/demo" },
}