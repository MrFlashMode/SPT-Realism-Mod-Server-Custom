"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLootCache = exports.BotLooGen = exports.EquipmentSlots = exports.MyLootCacheType = exports.MyBotLootCache = void 0;
const BaseClasses_1 = require("C:/snapshot/project/obj/models/enums/BaseClasses");
const BotLootCacheService_1 = require("C:/snapshot/project/obj/services/BotLootCacheService");
const BotLootGenerator_1 = require("C:/snapshot/project/obj/generators/BotLootGenerator");
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
class MyBotLootCache {
}
exports.MyBotLootCache = MyBotLootCache;
var MyLootCacheType;
(function (MyLootCacheType) {
    MyLootCacheType["SPECIAL"] = "Special";
    MyLootCacheType["BACKPACK"] = "Backpack";
    MyLootCacheType["POCKET"] = "Pocket";
    MyLootCacheType["VEST"] = "Vest";
    MyLootCacheType["COMBINED"] = "Combined";
    MyLootCacheType["VEST_HEALING_ITEMS"] = "VestHealingItems";
    MyLootCacheType["VEST_DRUG_ITEMS"] = "VestDrugItems";
    MyLootCacheType["VEST_STIM_ITEMS"] = "VestStimItems";
    MyLootCacheType["POCKET_HEALING_ITEMS"] = "PocketHealingItems";
    MyLootCacheType["POCKET_DRUG_ITEMS"] = "PocketDrugItems";
    MyLootCacheType["POCKET_STIM_ITEMS"] = "PocketStimItems";
    MyLootCacheType["GRENADE_ITEMS"] = "GrenadeItems";
})(MyLootCacheType = exports.MyLootCacheType || (exports.MyLootCacheType = {}));
var EquipmentSlots;
(function (EquipmentSlots) {
    EquipmentSlots["HEADWEAR"] = "Headwear";
    EquipmentSlots["EARPIECE"] = "Earpiece";
    EquipmentSlots["FACE_COVER"] = "FaceCover";
    EquipmentSlots["ARMOR_VEST"] = "ArmorVest";
    EquipmentSlots["EYEWEAR"] = "Eyewear";
    EquipmentSlots["ARM_BAND"] = "ArmBand";
    EquipmentSlots["TACTICAL_VEST"] = "TacticalVest";
    EquipmentSlots["POCKETS"] = "Pockets";
    EquipmentSlots["BACKPACK"] = "Backpack";
    EquipmentSlots["SECURED_CONTAINER"] = "SecuredContainer";
    EquipmentSlots["FIRST_PRIMARY_WEAPON"] = "FirstPrimaryWeapon";
    EquipmentSlots["SECOND_PRIMARY_WEAPON"] = "SecondPrimaryWeapon";
    EquipmentSlots["HOLSTER"] = "Holster";
    EquipmentSlots["SCABBARD"] = "Scabbard";
})(EquipmentSlots = exports.EquipmentSlots || (exports.EquipmentSlots = {}));
class BotLooGen extends BotLootGenerator_1.BotLootGenerator {
    genLoot(sessionId, templateInventory, itemCounts, isPmc, botRole, botInventory, equipmentChances, botLevel) {
        const jsonUtil = tsyringe_1.container.resolve("JsonUtil");
        const pmcLootGenerator = tsyringe_1.container.resolve("PMCLootGenerator");
        const ragfairPriceService = tsyringe_1.container.resolve("RagfairPriceService");
        const myGetLootCache = new MyLootCache(this.logger, jsonUtil, this.databaseServer, pmcLootGenerator, this.localisationService, ragfairPriceService);
        const lootPool = templateInventory.items;
        const nValue = this.getBotLootNValue(isPmc);
        const looseLootMin = itemCounts.looseLoot.min;
        const looseLootMax = itemCounts.looseLoot.max;
        const lootItemCount = this.getRandomisedCount(looseLootMin, looseLootMax, nValue);
        const pocketLootCount = this.getRandomisedCount(1, 4, nValue);
        const vestLootCount = this.getRandomisedCount(Math.round(looseLootMin / 2), Math.round(looseLootMax / 2), nValue); // Count is half what loose loot min/max is
        const specialLootItemCount = this.getRandomisedCount(itemCounts.specialItems.min, itemCounts.specialItems.max, nValue);
        const healingItemCount = this.getRandomisedCount(itemCounts.healing.min, itemCounts.healing.max, 3);
        const drugItemCount = this.getRandomisedCount(itemCounts.drugs.min, itemCounts.drugs.max, 3);
        const stimItemCount = this.getRandomisedCount(itemCounts.stims.min, itemCounts.stims.max, 3);
        const grenadeCount = this.getRandomisedCount(itemCounts.grenades.min, itemCounts.grenades.max, 4);
        // Special items
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.SPECIAL, lootPool), [EquipmentSlots.POCKETS, EquipmentSlots.BACKPACK, EquipmentSlots.TACTICAL_VEST], specialLootItemCount, botInventory, botRole);
        ///////////////////////////////////////Meds//////////////////////////////////
        //Vest Meds
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_HEALING_ITEMS, lootPool), [EquipmentSlots.TACTICAL_VEST], healingItemCount, botInventory, botRole, false, 0, isPmc);
        //Vest Drugs
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_DRUG_ITEMS, lootPool), [EquipmentSlots.TACTICAL_VEST], drugItemCount, botInventory, botRole, false, 0, isPmc);
        //Vest Stims
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_STIM_ITEMS, lootPool), [EquipmentSlots.TACTICAL_VEST], stimItemCount, botInventory, botRole, true, 0, isPmc);
        //Pocket Meds
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_HEALING_ITEMS, lootPool), [EquipmentSlots.TACTICAL_VEST], healingItemCount, botInventory, botRole, false, 0, isPmc);
        //Pocket Drugs
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_DRUG_ITEMS, lootPool), [EquipmentSlots.POCKETS], drugItemCount, botInventory, botRole, false, 0, isPmc);
        //Pocket Stims
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_STIM_ITEMS, lootPool), [EquipmentSlots.POCKETS], stimItemCount, botInventory, botRole, true, 0, isPmc);
        /////////////////////////////////////////////////////////////////////////////////
        // Grenades
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.GRENADE_ITEMS, lootPool), [EquipmentSlots.TACTICAL_VEST, EquipmentSlots.POCKETS], grenadeCount, botInventory, botRole, false, 0, isPmc);
        if (isPmc && this.randomUtil.getChance100(this.botConfig.pmc.looseWeaponInBackpackChancePercent)) {
            this.addLooseWeaponsToInventorySlot(sessionId, botInventory, "Backpack", templateInventory, equipmentChances.mods, botRole, isPmc, botLevel);
        }
        // Backpack
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BACKPACK, lootPool), [EquipmentSlots.BACKPACK], lootItemCount, botInventory, botRole, true, this.botConfig.pmc.maxBackpackLootTotalRub, isPmc);
        // Vest
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST, lootPool), [EquipmentSlots.TACTICAL_VEST], vestLootCount, botInventory, botRole, true, this.botConfig.pmc.maxVestLootTotalRub, isPmc);
        // Pockets
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET, lootPool), [EquipmentSlots.POCKETS], pocketLootCount, botInventory, botRole, true, this.botConfig.pmc.maxPocketLootTotalRub, isPmc);
    }
}
exports.BotLooGen = BotLooGen;
class MyLootCache extends BotLootCacheService_1.BotLootCacheService {
    myBotRoleExistsInCache(botRole) {
        return !!this.myLootCache[botRole];
    }
    myInitCacheForBotRole(botRole) {
        this.myLootCache[botRole] = {
            backpackLoot: [],
            pocketLoot: [],
            vestLoot: [],
            combinedPoolLoot: [],
            specialItems: [],
            grenadeItems: [],
            vestHealingItems: [],
            vestDrugItems: [],
            vestStimItems: [],
            pocketHealingItems: [],
            pocketDrugItems: [],
            pocketStimItems: []
        };
    }
    clearCache() {
        this.myLootCache = {};
    }
    getLootCache(botRole, isPmc, lootType, lootPool) {
        if (!this.myBotRoleExistsInCache(botRole)) {
            this.myInitCacheForBotRole(botRole);
            this.myAddLootToCache(botRole, isPmc, lootPool);
        }
        switch (lootType) {
            case MyLootCacheType.SPECIAL:
                return this.myLootCache[botRole].specialItems;
            case MyLootCacheType.BACKPACK:
                return this.myLootCache[botRole].backpackLoot;
            case MyLootCacheType.POCKET:
                return this.myLootCache[botRole].pocketLoot;
            case MyLootCacheType.VEST:
                return this.myLootCache[botRole].vestLoot;
            case MyLootCacheType.COMBINED:
                return this.myLootCache[botRole].combinedPoolLoot;
            case MyLootCacheType.GRENADE_ITEMS:
                return this.myLootCache[botRole].grenadeItems;
            case MyLootCacheType.VEST_HEALING_ITEMS:
                return this.myLootCache[botRole].vestHealingItems;
            case MyLootCacheType.VEST_DRUG_ITEMS:
                return this.myLootCache[botRole].vestDrugItems;
            case MyLootCacheType.VEST_STIM_ITEMS:
                return this.myLootCache[botRole].vestStimItems;
            case MyLootCacheType.POCKET_HEALING_ITEMS:
                return this.myLootCache[botRole].pocketHealingItems;
            case MyLootCacheType.POCKET_DRUG_ITEMS:
                return this.myLootCache[botRole].pocketDrugItems;
            case MyLootCacheType.POCKET_STIM_ITEMS:
                return this.myLootCache[botRole].pocketStimItems;
            default:
                this.logger.error(this.localisationService.getText("bot-loot_type_not_found", { lootType: lootType, botRole: botRole, isPmc: isPmc }));
                break;
        }
    }
    myAddLootToCache(botRole, isPmc, lootPool) {
        const specialLootTemplates = [];
        const backpackLootTemplates = [];
        const pocketLootTemplates = [];
        const vestLootTemplates = [];
        const combinedPoolTemplates = [];
        for (const [slot, pool] of Object.entries(lootPool)) {
            if (!pool || !pool.length) {
                continue;
            }
            let itemsToAdd = [];
            const items = this.databaseServer.getTables().templates.items;
            switch (slot.toLowerCase()) {
                case "specialloot":
                    itemsToAdd = pool.map(lootTpl => items[lootTpl]);
                    this.addUniqueItemsToPool(specialLootTemplates, itemsToAdd);
                    break;
                case "pockets":
                    itemsToAdd = pool.map(lootTpl => items[lootTpl]);
                    this.addUniqueItemsToPool(pocketLootTemplates, itemsToAdd);
                    break;
                case "tacticalvest":
                    itemsToAdd = pool.map(lootTpl => items[lootTpl]);
                    this.addUniqueItemsToPool(vestLootTemplates, itemsToAdd);
                    break;
                case "securedcontainer":
                    // Don't add these items to loot pool
                    break;
                default:
                    itemsToAdd = pool.map(lootTpl => items[lootTpl]);
                    this.addUniqueItemsToPool(backpackLootTemplates, itemsToAdd);
            }
            // Add items to combined pool if any exist
            if (Object.keys(itemsToAdd).length > 0) {
                this.addUniqueItemsToPool(combinedPoolTemplates, itemsToAdd);
            }
        }
        // Sort all items by their worth
        this.sortPoolByRagfairPrice(specialLootTemplates);
        this.sortPoolByRagfairPrice(backpackLootTemplates);
        this.sortPoolByRagfairPrice(pocketLootTemplates);
        this.sortPoolByRagfairPrice(vestLootTemplates);
        this.sortPoolByRagfairPrice(combinedPoolTemplates);
        const specialLootItems = specialLootTemplates.filter(template => !this.isBulletOrGrenade(template._props)
            && !this.isMagazine(template._props));
        /////////////////////Meds//////////////////////////////
        //vest
        const vestHealingItems = vestLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent !== BaseClasses_1.BaseClasses.STIMULATOR
            && template._parent !== BaseClasses_1.BaseClasses.DRUGS);
        const vestDrugItems = vestLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.DRUGS);
        const vestStimItems = vestLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.STIMULATOR);
        //pocket
        const pocketHealingItems = pocketLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent !== BaseClasses_1.BaseClasses.STIMULATOR
            && template._parent !== BaseClasses_1.BaseClasses.DRUGS);
        const pocketDrugItems = pocketLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.DRUGS);
        const pocketStimItems = pocketLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.STIMULATOR);
        ///////////////////////////////////////////////////////
        const grenadeItems = combinedPoolTemplates.filter(template => this.isGrenade(template._props));
        // Get loot items (excluding magazines, bullets, grenades and healing items)
        const backpackLootItems = backpackLootTemplates.filter(template => !this.isBulletOrGrenade(template._props)
            && !this.isMagazine(template._props)
            && !this.isMedicalItem(template._props)
            && !this.isGrenade(template._props));
        // Get pocket loot
        const pocketLootItems = pocketLootTemplates.filter(template => !this.isBulletOrGrenade(template._props)
            && !this.isMagazine(template._props)
            && !this.isMedicalItem(template._props)
            && !this.isGrenade(template._props)
            && ("Height" in template._props)
            && ("Width" in template._props));
        // Get vest loot items
        const vestLootItems = vestLootTemplates.filter(template => !this.isBulletOrGrenade(template._props)
            && !this.isMagazine(template._props)
            && !this.isMedicalItem(template._props)
            && !this.isGrenade(template._props));
        this.myLootCache[botRole].vestHealingItems = vestHealingItems;
        this.myLootCache[botRole].vestDrugItems = vestDrugItems;
        this.myLootCache[botRole].vestStimItems = vestStimItems;
        this.myLootCache[botRole].pocketHealingItems = pocketHealingItems;
        this.myLootCache[botRole].pocketDrugItems = pocketDrugItems;
        this.myLootCache[botRole].pocketStimItems = pocketStimItems;
        this.myLootCache[botRole].grenadeItems = grenadeItems;
        this.myLootCache[botRole].specialItems = specialLootItems;
        this.myLootCache[botRole].backpackLoot = backpackLootItems;
        this.myLootCache[botRole].pocketLoot = pocketLootItems;
        this.myLootCache[botRole].vestLoot = vestLootItems;
    }
}
exports.MyLootCache = MyLootCache;
