"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderRefresh = exports.RagCallback = exports.RandomizeTraderAssort = exports.Traders = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const arrays_1 = require("../utils/arrays");
const TraderAssortHelper_1 = require("C:/snapshot/project/obj/helpers/TraderAssortHelper");
const utils_1 = require("../utils/utils");
const enums_1 = require("../utils/enums");
const RagfairCallbacks_1 = require("C:/snapshot/project/obj/callbacks/RagfairCallbacks");
const modConfig = require("../../config/config.json");
const weapPath = modConfig.weap_preset;
const attPath = modConfig.att_preset;
const gearPath = modConfig.gear_preset;
const AssaultRifleTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/AssaultRifleTemplates.json");
const AssaultCarbineTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/AssaultCarbineTemplates.json");
const MachinegunTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/MachinegunTemplates.json");
const MarksmanRifleTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/MarksmanRifleTemplates.json");
const PistolTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/PistolTemplates.json");
const ShotgunTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/ShotgunTemplates.json");
const SMGTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/SMGTemplates.json");
const SniperRifleTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/SniperRifleTemplates.json");
const SpecialWeaponTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/SpecialWeaponTemplates.json");
const GrenadeLauncherTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/GrenadeLauncherTemplates.json");
const armorComponentsTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorComponentsTemplates.json");
const armorChestrigTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorChestrigTemplates.json");
const helmetTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/helmetTemplates.json");
const armorVestsTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorVestsTemplates.json");
const armorMasksTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorMasksTemplates.json");
const chestrigTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/chestrigTemplates.json");
const headsetTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/headsetTemplates.json");
const ammoDB = require("../../db/templates/ammo/ammoTemplates.json");
const weapTemplatesArr = [AssaultCarbineTemplates, AssaultRifleTemplates, MachinegunTemplates, MarksmanRifleTemplates, PistolTemplates, ShotgunTemplates, SMGTemplates, SniperRifleTemplates, SpecialWeaponTemplates, GrenadeLauncherTemplates];
const gearTemlplatesArr = [armorComponentsTemplates, armorChestrigTemplates, helmetTemplates, armorVestsTemplates, armorMasksTemplates, chestrigTemplates, headsetTemplates];
const traderRepairs = require("../../db/traders/repair/traderRepair.json");
const fenceLimits = require("../../db/traders/fence/fenceLimits.json");
const prapId = "54cb50c76803fa8b248b4571";
const theraId = "54cb57776803fa99248b456e";
const skierId = "58330581ace78e27b8b10cee";
const pkId = "5935c25fb3acc3127c3d8cd9";
const mechId = "5a7c2eca46aef81a7ca2145d";
const ragmId = "5ac3b934156ae10c4430e83c";
const jaegId = "5c0647fdd443bc2504c2d371";
class Traders {
    constructor(logger, tables, modConf, traderConf, array, utils) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.traderConf = traderConf;
        this.array = array;
        this.utils = utils;
        this.itemDB = this.tables.templates.items;
    }
    loadTraderTweaks() {
        if (modConfig.nerf_fence == true) {
            this.traderConf.fence.discountOptions.assortSize = 10;
            this.traderConf.fence.discountOptions.presetPriceMult = 2.2;
            this.traderConf.fence.discountOptions.itemPriceMult = 1.8;
            this.traderConf.fence.maxPresetsPercent = 4;
            this.traderConf.fence.partialRefreshChangePercent = 50;
            this.traderConf.fence.discountOptions.assortSize = 10;
            this.traderConf.fence.assortSize = 30;
            this.traderConf.fence.itemPriceMult = 2;
            this.traderConf.fence.presetPriceMult = 2.5;
            this.traderConf.fence.itemTypeLimits = fenceLimits.itemTypeLimits;
            this.traderConf.fence.blacklist = fenceLimits.blacklist;
        }
        this.tables.globals.config.Health.HealPrice.HealthPointPrice = 100;
        this.tables.globals.config.Health.HealPrice.EnergyPointPrice = 30;
        this.tables.globals.config.Health.HealPrice.HydrationPointPrice = 30;
        if (this.modConf.logEverything == true) {
            this.logger.info("Traders Loaded");
        }
    }
    loadTraderRefreshTimes() {
        for (let trader in this.traderConf.updateTime) {
            this.traderConf.updateTime[trader].seconds = 1800;
        }
    }
    loadTraderRepairs() {
        this.tables.traders[prapId].base.repair = traderRepairs.Prapor;
        this.tables.traders[skierId].base.repair = traderRepairs.SkierRepair;
        this.tables.traders[mechId].base.repair = traderRepairs.MechanicRepair;
        for (let ll in this.tables.traders[prapId].base.loyaltyLevels) {
            this.tables.traders[prapId].base.loyaltyLevels[ll].repair_price_coef *= 1.5;
        }
        for (let ll in this.tables.traders[skierId].base.loyaltyLevels) {
            this.tables.traders[skierId].base.loyaltyLevels[ll].repair_price_coef *= 0.5;
        }
        for (let ll in this.tables.traders[mechId].base.loyaltyLevels) {
            this.tables.traders[mechId].base.loyaltyLevels[ll].repair_price_coef *= 2;
        }
    }
    setLoyaltyLevels() {
        this.loyaltyLevelHelper(ammoDB, false);
        this.loyaltyLevelHelper(weapTemplatesArr, true);
        this.loyaltyLevelHelper(gearTemlplatesArr, true);
    }
    loyaltyLevelHelper(db, multifile) {
        if (multifile == false) {
            this.setLL(db);
        }
        else {
            for (let files in db) {
                let file = db[files];
                this.setLL(file);
            }
        }
    }
    setLL(file) {
        for (let item in file) {
            let loyaltyLvl = file[item]?.LoyaltyLevel !== undefined ? file[item]?.LoyaltyLevel : 3;
            let itemID = file[item].ItemID;
            for (let trader in this.tables.traders) {
                if (this.tables.traders[trader].assort?.items !== undefined) {
                    for (let item in this.tables.traders[trader].assort.items) {
                        if (this.tables.traders[trader].assort.items[item].parentId === "hideout" && this.tables.traders[trader].assort.items[item]._tpl === itemID) {
                            let id = this.tables.traders[trader].assort.items[item]._id;
                            if (this.itemDB[this.tables.traders[trader]?.assort?.barter_scheme[id][0][0]?._tpl]?._parent !== enums_1.ParentClasses.MONEY) {
                                this.tables.traders[trader].assort.loyal_level_items[id] = Math.max(1, loyaltyLvl - 1);
                            }
                            else {
                                this.tables.traders[trader].assort.loyal_level_items[id] = Math.min(4, loyaltyLvl);
                            }
                        }
                    }
                }
            }
        }
    }
}
exports.Traders = Traders;
class RandomizeTraderAssort {
    constructor() {
        this.databaseServer = tsyringe_1.container.resolve("DatabaseServer");
        this.logger = tsyringe_1.container.resolve("WinstonLogger");
        this.tables = this.databaseServer.getTables();
        this.itemDB = this.tables.templates.items;
        this.arrays = new arrays_1.Arrays(this.tables);
        this.utils = new utils_1.Utils(this.tables, this.arrays);
    }
    adjustTraderStockAtServerStart() {
        if (utils_1.EventTracker.isChristmas == true) {
            this.logger.warning("====== Christmas Sale, Everything 40% Off! ======");
        }
        for (let trader in this.tables.traders) {
            if (this.tables.traders[trader].assort?.items !== undefined) {
                let assortItems = this.tables.traders[trader].assort.items;
                for (let item in assortItems) {
                    let itemId = assortItems[item]._id;
                    let itemTemplId = assortItems[item]._tpl;
                    if (modConfig.randomize_trader_stock == true) {
                        if (assortItems[item].upd?.StackObjectsCount !== undefined) {
                            this.randomizeStockHelper(assortItems[item]);
                        }
                        if (assortItems[item].upd?.UnlimitedCount !== undefined) {
                            assortItems[item].upd.UnlimitedCount = false;
                        }
                    }
                    if (modConfig.randomize_trader_prices == true || modConfig.adjust_trader_prices) {
                        if (this.tables.traders[trader]?.assort?.barter_scheme) {
                            let barter = this.tables.traders[trader].assort.barter_scheme[itemId];
                            if (barter !== undefined) {
                                let randNum = this.utils.pickRandNumOneInTen();
                                this.setAndRandomizeCost(randNum, itemTemplId, barter, true);
                            }
                        }
                    }
                }
            }
            if (modConfig.randomize_trader_ll == true) {
                if (this.tables.traders[trader].assort?.loyal_level_items !== undefined) {
                    let ll = this.tables.traders[trader].assort.loyal_level_items;
                    for (let lvl in ll) {
                        this.randomizeLL(ll, lvl, this.logger);
                    }
                }
            }
        }
    }
    randomizeStockHelper(item) {
        let itemParent = this.itemDB[item._tpl]._parent;
        //ammo
        this.randomizeAmmoStock(itemParent, item);
        this.randomizeStock(itemParent, enums_1.ParentClasses.AMMO_BOX, item, 0, 2);
        //weapons
        for (let id in this.arrays.weaponParentIDs) {
            this.randomizeStock(itemParent, this.arrays.weaponParentIDs[id], item, 0, 1);
        }
        //weapon mods
        for (let id in this.arrays.modParentIDs) {
            this.randomizeStock(itemParent, this.arrays.modParentIDs[id], item, 0, 1);
        }
        //gear
        for (let id in this.arrays.gearParentIDs) {
            this.randomizeStock(itemParent, this.arrays.gearParentIDs[id], item, 0, 1);
        }
        //barter items
        for (let id in this.arrays.barterParentIDs) {
            this.randomizeStock(itemParent, this.arrays.barterParentIDs[id], item, 0, 2);
        }
        //keys 
        for (let id in this.arrays.keyParentIDs) {
            this.randomizeStock(itemParent, this.arrays.keyParentIDs[id], item, 0, 1);
        }
        //maps
        this.randomizeStock(itemParent, enums_1.ParentClasses.MAP, item, 0, 1);
        //nvg + thermals:
        this.randomizeStock(itemParent, enums_1.ParentClasses.NIGHTVISION, item, 0, 1);
        this.randomizeStock(itemParent, enums_1.ParentClasses.SPECIAL_SCOPE, item, 0, 1);
        this.randomizeStock(itemParent, enums_1.ParentClasses.THEMALVISION, item, 0, 1);
        //magazine
        if (itemParent === enums_1.ParentClasses.MAGAZINE) {
            let magCap = this.itemDB[item._tpl]?._props?.Cartridges[0]._max_count;
            if (magCap <= 35) {
                this.randomizeStock(itemParent, enums_1.ParentClasses.MAGAZINE, item, 0, 4);
            }
            else if (magCap > 35 && magCap <= 45) {
                this.randomizeStock(itemParent, enums_1.ParentClasses.MAGAZINE, item, 0, 3);
            }
            else {
                this.randomizeStock(itemParent, enums_1.ParentClasses.MAGAZINE, item, 0, 1);
            }
        }
        //medical
        this.randomizeStock(itemParent, enums_1.ParentClasses.STIMULATOR, item, 0, 1);
        this.randomizeStock(itemParent, enums_1.ParentClasses.DRUGS, item, 0, 2);
        this.randomizeStock(itemParent, enums_1.ParentClasses.MEDICAL, item, 0, 3);
        //special items
        this.randomizeStock(itemParent, enums_1.ParentClasses.SPEC_ITEM, item, 3, 6);
        this.randomizeStock(itemParent, enums_1.ParentClasses.PORTABLE_RANGE_FINDER, item, 0, 1);
        this.randomizeStock(itemParent, enums_1.ParentClasses.COMPASS, item, 0, 1);
        //grenades
        this.randomizeStock(itemParent, enums_1.ParentClasses.THROW_WEAPON, item, 0, 3);
        //money
        this.randomizeStock(itemParent, enums_1.ParentClasses.MONEY, item, 0, 1500);
        //container
        this.randomizeStock(itemParent, enums_1.ParentClasses.SIMPLE_CONTAINER, item, 0, 1);
        this.randomizeStock(itemParent, enums_1.ParentClasses.LOCKABLE_CONTAINER, item, 0, 1);
        //provisions
        this.randomizeStock(itemParent, enums_1.ParentClasses.FOOD, item, 0, 1);
        this.randomizeStock(itemParent, enums_1.ParentClasses.DRINK, item, 0, 1);
    }
    randomizeAmmoStock(assortItemParent, item) {
        if (assortItemParent === enums_1.ParentClasses.AMMO) {
            let randNum = this.utils.pickRandNumOneInTen();
            if (randNum <= 4) {
                item.upd.StackObjectsCount = 0;
            }
            else {
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._9x18mm, 40, 150);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._9x19mm, 30, 130);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._9x21mm, 30, 120);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._9x39mm, 20, 120);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._45ACP, 30, 130);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._357mag, 12, 50);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._46x30mm, 30, 120);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._57x28mm, 30, 120);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._762x25mm, 30, 140);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._366TKM, 30, 120);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._762x39mm, 20, 120);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._762x51mm, 15, 80);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._762x54rmm, 15, 80);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._300BLK, 30, 120);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._556x45mm, 20, 120);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._545x39mm, 20, 120);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._127x108mm, 5, 40);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._127x55mm, 20, 120);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._12ga, 15, 40);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._20ga, 20, 80);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._23x75mm, 5, 12);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._26x75mm, 1, 2);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._40x46mm, 1, 3);
                this.randomizeAmmoStockHelper(item, enums_1.Calibers._40x53mm, 1, 3);
            }
        }
    }
    randomizeAmmoStockHelper(item, caliber, min, max) {
        if (this.itemDB[item._tpl]._props.Caliber === caliber) {
            item.upd.StackObjectsCount = this.utils.pickRandNumInRange(min, max);
        }
    }
    randomizeStock(assortItemParent, catParent, item, min, max) {
        if (assortItemParent === catParent) {
            item.upd.StackObjectsCount = this.utils.pickRandNumInRange(min, max);
        }
    }
    setAndRandomizeCost(randNum, itemTemplId, barter, setBasePrice) {
        if (this.itemDB[barter[0][0]._tpl]._parent === enums_1.ParentClasses.MONEY) {
            let cost = barter[0][0].count;
            if (setBasePrice == true && modConfig.adjust_trader_prices == true) {
                this.adjustPriceByCategory(barter[0][0], itemTemplId, cost);
            }
            if (modConfig.randomize_trader_prices == true) {
                if (randNum >= 8) {
                    barter[0][0].count = cost * 1.15;
                }
                if (randNum <= 3) {
                    barter[0][0].count = cost * 0.85;
                }
            }
            if (utils_1.EventTracker.isChristmas == true) {
                barter[0][0].count = cost * 0.6;
            }
        }
    }
    adjustPriceByCategory(barter, itemTemplId, cost) {
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.AMMO) {
            barter.count = cost * 2;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.AMMO_BOX) {
            barter.count = cost * 2;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.DRUGS) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.MEDKIT) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.MEDS) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.STIMULATOR) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.MEDICAL_SUPPLIES) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.FOOD) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.DRINK) {
            barter.count = cost * 1.5;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.HEADWEAR) {
            barter.count = cost * 0.6;
        }
        if (this.itemDB[itemTemplId]._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT) {
            barter.count = cost * 0.6;
        }
    }
    randomizeLL(ll, i, logger) {
        let level = ll[i];
        let randNum = this.utils.pickRandNumOneInTen();
        if (randNum <= 2) {
            ll[i] = Math.max(1, level - 1);
        }
        if (level === 5) {
            ll[i] = 4;
        }
    }
}
exports.RandomizeTraderAssort = RandomizeTraderAssort;
class RagCallback extends RagfairCallbacks_1.RagfairCallbacks {
    mySearch(url, info, sessionID) {
        this.httpResponse.getBody(this.ragfairController.getOffers(sessionID, info));
        return this.httpResponse.getBody(this.ragfairController.getOffers(sessionID, info));
    }
}
exports.RagCallback = RagCallback;
class TraderRefresh extends TraderAssortHelper_1.TraderAssortHelper {
    myResetExpiredTrader(trader) {
        const traderId = trader.base._id;
        trader.assort = this.jsonUtil.clone(this.traderAssortService.getPristineTraderAssort(traderId));
        if (modConfig.randomize_trader_prices == true || modConfig.randomize_trader_stock == true || modConfig.randomize_trader_ll == true) {
            trader.assort.items = this.modifyTraderAssorts(trader, this.logger);
        }
        trader.base.nextResupply = this.traderHelper.getNextUpdateTimestamp(trader.base._id);
        trader.base.refreshTraderRagfairOffers = true;
        //seems like manually refreshing ragfair is necessary. 
        this.ragfairOfferGenerator.generateFleaOffersForTrader(trader.base._id);
    }
    modifyTraderAssorts(trader, logger) {
        const tables = this.databaseServer.getTables();
        const randomTraderAss = new RandomizeTraderAssort();
        const arrays = new arrays_1.Arrays(tables);
        const utils = new utils_1.Utils(tables, arrays);
        var assortItems = trader.assort.items;
        var assortBarters = trader.assort.barter_scheme;
        if (modConfig.randomize_trader_ll == true) {
            let ll = trader.assort.loyal_level_items;
            for (let lvl in ll) {
                randomTraderAss.randomizeLL(ll, lvl, logger);
            }
        }
        for (let i in assortItems) {
            let item = assortItems[i];
            let itemId = assortItems[i]._id;
            let itemTemplId = assortItems[i]._tpl;
            if (modConfig.randomize_trader_stock == true) {
                if (item.upd?.StackObjectsCount !== undefined) {
                    randomTraderAss.randomizeStockHelper(item);
                }
                if (item.upd?.UnlimitedCount !== undefined) {
                    item.upd.UnlimitedCount = false;
                }
                if (item.upd?.BuyRestrictionCurrent !== undefined) {
                    item.upd.BuyRestrictionCurrent = 0;
                }
            }
            if (modConfig.randomize_trader_prices == true) {
                let barter = assortBarters[itemId];
                if (barter !== undefined) {
                    //roll randomization of prices several times for better potential spread of prices
                    this.randomizePricesAtRefresh(randomTraderAss, utils, itemTemplId, barter);
                    this.randomizePricesAtRefresh(randomTraderAss, utils, itemTemplId, barter);
                    this.randomizePricesAtRefresh(randomTraderAss, utils, itemTemplId, barter);
                }
            }
        }
        return assortItems;
    }
    randomizePricesAtRefresh(randomTraderAss, utils, itemTemplId, barter) {
        let randNum = utils.pickRandNumOneInTen();
        randomTraderAss.setAndRandomizeCost(randNum, itemTemplId, barter, false);
    }
}
exports.TraderRefresh = TraderRefresh;
