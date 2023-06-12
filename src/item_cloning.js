"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCloning = void 0;
class ItemCloning {
    constructor(logger, tables, modConfig, jsonUtil) {
        this.logger = logger;
        this.tables = tables;
        this.modConfig = modConfig;
        this.jsonUtil = jsonUtil;
        this.itemDB = this.tables.templates.items;
    }
    cloneItem(itemtoClone, newitemID) {
        this.itemDB[newitemID] = this.jsonUtil.clone(this.itemDB[itemtoClone]);
        this.itemDB[newitemID]._id = newitemID;
        if (this.modConfig.logEverything == true) {
            this.logger.info(this.itemDB[itemtoClone]._name + " cloned");
        }
    }
}
exports.ItemCloning = ItemCloning;
