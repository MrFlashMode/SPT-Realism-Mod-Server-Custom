"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotLoader = void 0;
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const utils_1 = require("../utils/utils");
const scavLO = require("../../db/bots/loadouts/scavs/scavLO.json");
const bearLO = require("../../db/bots/loadouts/PMCs/bearLO.json");
const usecLO = require("../../db/bots/loadouts/PMCs/usecLO.json");
const raiderLO = require("../../db/bots/loadouts/raiders_rogues/raiderLO.json");
const rogueLO = require("../../db/bots/loadouts/raiders_rogues/rogueLO.json");
const knightLO = require("../../db/bots/loadouts/bosses/goons/knightLO.json");
const bigpipeLO = require("../../db/bots/loadouts/bosses/goons/bigpipeLO.json");
const birdeyeLO = require("../../db/bots/loadouts/bosses/goons/birdeyeLO.json");
const killaLO = require("../../db/bots/loadouts/bosses/killaLO.json");
const tagillaLO = require("../../db/bots/loadouts/bosses/tagillaLO.json");
const saniLO = require("../../db/bots/loadouts/bosses/sanitar/sanitarLO.json");
const saniFollowerLO = require("../../db/bots/loadouts/bosses/sanitar/sanitarfollowerLO.json");
const scavLootLimitCat = require("../../db/bots/loadouts/scavs/scavLootLimitCat.json");
const PMCLootLimitCat = require("../../db/bots/loadouts/PMCs/PMCLootLimitCat.json");
const botHealth = require("../../db/bots/botHealth.json");
const rmBotConfig = require("../../db/bots/botconfig.json");
const pmcTypes = require("../../db/bots/pmcTypes.json");
class BotLoader {
    constructor(logger, tables, configServ, modConf, arrays, utils) {
        this.logger = logger;
        this.tables = tables;
        this.configServ = configServ;
        this.modConf = modConf;
        this.arrays = arrays;
        this.utils = utils;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
        this.botDB = this.tables.bots.types;
        this.mapDB = this.tables.locations;
        this.scavBase = this.botDB["assault"];
        this.usecBase = this.botDB["usec"];
        this.bearBase = this.botDB["bear"];
        this.raiderBase = this.botDB["pmcbot"];
        this.rogueBase = this.botDB["exusec"];
        this.knightBase = this.botDB["bossknight"];
        this.bigpipeBase = this.botDB["followerbigpipe"];
        this.birdeyeBase = this.botDB["followerbirdeye"];
        this.killaBase = this.botDB["bosskilla"];
        this.tagillaBase = this.botDB["bosstagilla"];
        this.reshallaBase = this.botDB["bossbully"];
        this.saniBase = this.botDB["bosssanitar"];
        this.saniFollowerBase = this.botDB["followersanitar"];
        this.botConf = this.configServ.getConfig(ConfigTypes_1.ConfigTypes.BOT);
        this.botConfPMC = this.botConf.pmc;
    }
    loadBots() {
        if (this.modConf.dynamic_loot_pmcs == true) {
            this.botConf.pmc.looseWeaponInBackpackChancePercent = 0;
        }
        const botEquipmentTempalte = {
            "lightIsActiveDayChancePercent": 50,
            "lightIsActiveNightChancePercent": 50,
            "laserIsActiveChancePercent": 50,
            "faceShieldIsActiveChancePercent": 100,
            "nvgIsActiveChanceNightPercent": 50,
            "nvgIsActiveChanceDayPercent": 50,
            "weaponSightWhitelist": {},
            "randomisation": [],
            "weaponModLimits": {},
            "clothing": [],
            "weightingAdjustments": [],
            "blacklist": [],
            "whitelist": []
        };
        this.botConf.equipment["assault"] = botEquipmentTempalte;
        this.botConf.equipment["pmcbot"] = botEquipmentTempalte;
        this.botConf.equipment["exusec"] = botEquipmentTempalte;
        this.botConf.equipment["bossknight"] = botEquipmentTempalte;
        this.botConf.equipment["followerbigpipe"] = botEquipmentTempalte;
        this.botConf.equipment["followerbirdeye"] = botEquipmentTempalte;
        this.botConf.equipment["bosskilla"] = botEquipmentTempalte;
        this.botConf.equipment["bosstagilla"] = botEquipmentTempalte;
        this.botConf.equipment["bosssanitar"] = botEquipmentTempalte;
        this.botConf.equipment["followersanitar"] = botEquipmentTempalte;
        this.botConf.equipment["pmc"].weaponModLimits.scopeLimit = 100;
        this.botConf.equipment["pmc"].weaponModLimits.lightLaserLimit = 2;
        this.botConf.equipment["pmc"].randomisation = [];
        this.botConf.equipment["pmc"].blacklist = [];
        this.botConf.equipment["pmc"].weightingAdjustments = [];
        this.botConf.equipment["pmc"].clothing = [];
        this.botConf.equipment["pmc"].faceShieldIsActiveChancePercent = 100;
        if (this.modConf.logEverything == true) {
            this.logger.info("Bots Loaded");
        }
    }
    botMeds() {
        this.arrays.botArr.forEach(addBotMedkit);
        function addBotMedkit(bot) {
            if (bot.inventory.items.SecuredContainer) {
                bot.inventory.items.SecuredContainer.push("5e99735686f7744bfc4af32c");
            }
        }
    }
    forceBossSpawns() {
        for (let i in this.mapDB) {
            if (this.mapDB[i].base?.BossLocationSpawn !== undefined) {
                for (let k in this.mapDB[i].base.BossLocationSpawn) {
                    this.mapDB[i].base.BossLocationSpawn[k].BossChance = 100;
                }
            }
        }
    }
    botDifficulty() {
        // if (this.modConf.pmc_difficulty == true) {
        //     this.botConfPMC.useDifficultyOverride = true;
        //     this.botConfPMC.difficulty = rmBotConfig.pmc2.difficulty;;
        // }
        if (this.modConf.boss_difficulty == true) {
            for (let i in this.mapDB) {
                if (this.mapDB[i].base?.BossLocationSpawn !== undefined) {
                    for (let k in this.mapDB[i].base.BossLocationSpawn) {
                        this.mapDB[i].base.BossLocationSpawn[k].BossDifficult = "hard";
                        this.mapDB[i].base.BossLocationSpawn[k].BossEscortDifficult = "hard";
                    }
                }
            }
        }
    }
    increaseBotCap() {
        this.botConf.maxBotCap = rmBotConfig.maxBotCapHigh;
        this.botConf.presetBatch = rmBotConfig.presetBatch;
    }
    increasePerformance() {
        this.botConf.maxBotCap = rmBotConfig.maxBotCapLow;
        this.botConf.presetBatch = rmBotConfig.presetBatch;
    }
    setBotHealth() {
        for (let bot in this.arrays.botArr) {
            let botType = this.arrays.botArr[bot];
            if (botType.skills?.Common !== undefined) {
                if (botType.skills.Common["Vitality"] !== undefined) {
                    botType.skills.Common["Vitality"].max = 5100;
                    botType.skills.Common["Vitality"].min = 5100;
                }
                else {
                    botType.skills.Common["Vitality"] = {};
                    botType.skills.Common["Vitality"].max = 5100;
                    botType.skills.Common["Vitality"].min = 5100;
                }
            }
            else {
                botType.skills.Common = [];
                botType.skills.Common["Vitality"] = {};
                botType.skills.Common["Vitality"].max = 5100;
                botType.skills.Common["Vitality"].min = 5100;
            }
        }
        if (this.modConf.realistic_health == true) {
            this.setBotHPHelper(this.arrays.botArr);
        }
    }
    setBotHPHelper(botArr) {
        for (let bot in botArr) {
            for (let hpSet in botArr[bot].health.BodyParts) {
                let botPartSet = botArr[bot].health.BodyParts[hpSet];
                for (let part in botPartSet) {
                    for (let tempPart in botHealth.health.BodyParts[0]) {
                        if (part === tempPart) {
                            botPartSet[part].min = botHealth.health.BodyParts[0][tempPart].min;
                            botPartSet[part].max = botHealth.health.BodyParts[0][tempPart].max;
                        }
                    }
                }
            }
            botArr[bot].health.Temperature = botHealth.health.Temperature;
        }
    }
    //this thing is demonic and cursed
    botHpMulti() {
        this.botHPMultiHelper(this.arrays.botArr, 1.0);
        if (this.modConf.logEverything == true) {
            this.logger.info("Killa chest health = " + this.botDB["bosskilla"].health.BodyParts[0].Chest.max);
            this.logger.info("Killa vitality = " + this.botDB["bosskilla"].skills.Common["Vitality"].min);
            this.logger.info("USEC chest health = " + this.botDB["usec"].health.BodyParts[0].Chest.min);
            this.logger.info("Bear chest health = " + this.botDB["bear"].health.BodyParts[0].Chest.min);
            this.logger.info("USEC head health = " + this.botDB["usec"].health.BodyParts[0].Head.min);
            this.logger.info("Bear head health = " + this.botDB["bear"].health.BodyParts[0].Head.min);
            this.logger.info("Bear leg health = " + this.botDB["bear"].health.BodyParts[0].LeftLeg.min);
            this.logger.info("Bear arm health = " + this.botDB["bear"].health.BodyParts[0].LeftArm.min);
            this.logger.info("Scav head health  max = " + this.botDB["assault"].health.BodyParts[0].Head.max);
            this.logger.info("Scav chest health  max = " + this.botDB["assault"].health.BodyParts[0].Chest.max);
            this.logger.info("Scav leg health max = " + this.botDB["assault"].health.BodyParts[0].LeftLeg.max);
            this.logger.info("Scav arm health  max = " + this.botDB["assault"].health.BodyParts[0].LeftArm.max);
            this.logger.info("Scav stomach health  max = " + this.botDB["assault"].health.BodyParts[0].Stomach.max);
            this.logger.info("Cultist chest health = " + this.botDB["sectantwarrior"].health.BodyParts[0].Chest.max);
            this.logger.info("Bot Health Set");
        }
    }
    //the devil himself
    botHPMultiHelper(botArr, multi) {
        for (let bot in botArr) {
            for (let hpSet in botArr[bot].health.BodyParts) {
                let botPartSet = botArr[bot].health.BodyParts[hpSet];
                for (let part in botPartSet) {
                    botPartSet[part].min = Math.round(botPartSet[part].min * multi);
                    botPartSet[part].max = Math.round(botPartSet[part].max * multi);
                }
            }
        }
    }
    botConfig1() {
        //Set bot armor and weapon min durability
        this.botConf.durability.pmc = rmBotConfig.durability1.pmc;
        this.botConf.durability.pmcbot = rmBotConfig.durability1.pmcbot;
        this.botConf.durability.boss = rmBotConfig.durability1.boss;
        this.botConf.durability.follower = rmBotConfig.durability1.follower;
        this.botConf.durability.assault = rmBotConfig.durability1.assault;
        this.botConf.durability.cursedassault = rmBotConfig.durability1.cursedassault;
        this.botConf.durability.marksman = rmBotConfig.durability1.marksman;
        this.botConf.durability.exusec = rmBotConfig.durability1.exusec;
        this.botConf.durability.sectantpriest = rmBotConfig.durability1.sectantpriest;
        this.botConf.durability.sectantwarrior = rmBotConfig.durability1.sectantwarrior;
        //adjust PMC money stack limits and adjust PMC item spawn limits
        this.botConfPMC.dynamicLoot = rmBotConfig.pmc1.dynamicLoot;
        //adjust PMC max loot in rubles
        this.botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc1.maxBackpackLootTotalRub;
        this.botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc1.maxPocketLootTotalRub;
        this.botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc1.maxVestLootTotalRub;
        //adjust PMC hostile chance
        this.botConfPMC.chanceSameSideIsHostilePercent = 100;
        this.botConfPMC.looseWeaponInBackpackChancePercent = rmBotConfig.pmc1.looseWeaponInBackpackChancePercent;
        this.botConfPMC.isUsec = rmBotConfig.pmc1.isUsec;
        this.botConfPMC.convertIntoPmcChance = rmBotConfig.pmc1.convertIntoPmcChance;
        //set loot N value
        this.botConf.lootNValue = rmBotConfig.lootNValue1;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit1;
        this.usecBase.appearance.head = usecLO.appearance.head;
        this.bearBase.appearance.head = bearLO.appearance.head;
        this.botConf.equipment["pmc"].faceShieldIsActiveChancePercent = 100;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            this.botConf.equipment["pmc"].nvgIsActiveChanceDayPercent = 100;
            this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 80;
            this.botConf.equipment["pmc"].laserIsActiveChancePercent = 80;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.botConf.equipment["pmc"].nvgIsActiveChanceDayPercent = 50;
            this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 50;
            this.botConf.equipment["pmc"].laserIsActiveChancePercent = 80;
        }
        else {
            this.botConf.equipment["pmc"].nvgIsActiveChanceDayPercent = 0;
            this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["pmc"].laserIsActiveChancePercent = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 30;
                this.botConf.equipment["pmc"].laserIsActiveChancePercent = 30;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 80;
                this.botConf.equipment["pmc"].laserIsActiveChancePercent = 80;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 0;
                this.botConf.equipment["pmc"].laserIsActiveChancePercent = 0;
            }
        }
        if (this.modConf.pmc_types == true) {
            if (utils_1.RaidInfoTracker.TOD === "day") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.BotTypes2.pmcTypeDay.sptusec;
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes2.pmcTypeDay.sptbear;
            }
            if (utils_1.RaidInfoTracker.TOD === "night") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.BotTypes2.pmcTypeNight.sptusec;
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes2.pmcTypeNight.sptbear;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("botConfig1 loaded");
        }
    }
    botConfig2() {
        //Set bot armor and weapon min durability
        this.botConf.durability.pmc = rmBotConfig.durability2.pmc;
        this.botConf.durability.pmcbot = rmBotConfig.durability2.pmcbot;
        this.botConf.durability.boss = rmBotConfig.durability2.boss;
        this.botConf.durability.follower = rmBotConfig.durability2.follower;
        this.botConf.durability.assault = rmBotConfig.durability2.assault;
        this.botConf.durability.cursedassault = rmBotConfig.durability2.cursedassault;
        this.botConf.durability.marksman = rmBotConfig.durability2.marksman;
        this.botConf.durability.exusec = rmBotConfig.durability2.exusec;
        this.botConf.durability.sectantpriest = rmBotConfig.durability2.sectantpriest;
        this.botConf.durability.sectantwarrior = rmBotConfig.durability2.sectantwarrior;
        //adjust PMC money stack limits and adjust PMC item spawn limits
        this.botConfPMC.dynamicLoot = rmBotConfig.pmc2.dynamicLoot;
        //adjust PMC max loot in rubles
        this.botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc2.maxBackpackLootTotalRub;
        this.botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc2.maxPocketLootTotalRub;
        this.botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc2.maxVestLootTotalRub;
        //adjust PMC hostile chance
        this.botConfPMC.chanceSameSideIsHostilePercent = 100;
        this.botConfPMC.looseWeaponInBackpackChancePercent = rmBotConfig.pmc2.looseWeaponInBackpackChancePercent;
        this.botConfPMC.isUsec = rmBotConfig.pmc2.isUsec;
        this.botConfPMC.convertIntoPmcChance = rmBotConfig.pmc2.convertIntoPmcChance;
        //set loot N value
        this.botConf.lootNValue = rmBotConfig.lootNValue2;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit2;
        this.usecBase.appearance.head = usecLO.appearance.head;
        this.bearBase.appearance.head = bearLO.appearance.head;
        this.botConf.equipment["pmc"].faceShieldIsActiveChancePercent = 100;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            this.botConf.equipment["pmc"].nvgIsActiveChanceDayPercent = 100;
            this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 50;
            this.botConf.equipment["pmc"].laserIsActiveChancePercent = 50;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.botConf.equipment["pmc"].nvgIsActiveChanceDayPercent = 50;
            this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 100;
            this.botConf.equipment["pmc"].laserIsActiveChancePercent = 100;
        }
        else {
            this.botConf.equipment["pmc"].nvgIsActiveChanceDayPercent = 0;
            this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["pmc"].laserIsActiveChancePercent = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 50;
                this.botConf.equipment["pmc"].laserIsActiveChancePercent = 50;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 100;
                this.botConf.equipment["pmc"].laserIsActiveChancePercent = 100;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 0;
                this.botConf.equipment["pmc"].laserIsActiveChancePercent = 0;
            }
        }
        if (this.modConf.pmc_types == true) {
            if (utils_1.RaidInfoTracker.TOD === "day") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.BotTypes2.pmcTypeDay.sptusec;
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes2.pmcTypeDay.sptbear;
            }
            if (utils_1.RaidInfoTracker.TOD === "night") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.BotTypes2.pmcTypeNight.sptusec;
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes2.pmcTypeNight.sptbear;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("boatConfig2 loaded");
        }
    }
    botConfig3() {
        //Set bot armor and weapon min durability
        this.botConf.durability.pmc = rmBotConfig.durability3.pmc;
        this.botConf.durability.pmcbot = rmBotConfig.durability3.pmcbot;
        this.botConf.durability.boss = rmBotConfig.durability3.boss;
        this.botConf.durability.follower = rmBotConfig.durability3.follower;
        this.botConf.durability.assault = rmBotConfig.durability3.assault;
        this.botConf.durability.cursedassault = rmBotConfig.durability3.cursedassault;
        this.botConf.durability.marksman = rmBotConfig.durability3.marksman;
        this.botConf.durability.exusec = rmBotConfig.durability3.exusec;
        this.botConf.durability.sectantpriest = rmBotConfig.durability3.sectantpriest;
        this.botConf.durability.sectantwarrior = rmBotConfig.durability3.sectantwarrior;
        //adjust PMC money stack limits and adjust PMC item spawn limits
        this.botConfPMC.dynamicLoot = rmBotConfig.pmc3.dynamicLoot;
        //adjust PMC max loot in rubles
        this.botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc3.maxBackpackLootTotalRub;
        this.botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc3.maxPocketLootTotalRub;
        this.botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc3.maxVestLootTotalRub;
        //adjust PMC hostile chance
        this.botConfPMC.chanceSameSideIsHostilePercent = 100;
        this.botConfPMC.looseWeaponInBackpackChancePercent = rmBotConfig.pmc3.looseWeaponInBackpackChancePercent;
        this.botConfPMC.isUsec = rmBotConfig.pmc3.isUsec;
        this.botConfPMC.convertIntoPmcChance = rmBotConfig.pmc3.convertIntoPmcChance;
        //set loot N value
        this.botConf.lootNValue = rmBotConfig.lootNValue3;
        this.botConf.itemSpawnLimits.pmc = PMCLootLimitCat.PMCLootLimit3;
        this.usecBase.appearance.head = usecLO.appearance.head;
        this.bearBase.appearance.head = bearLO.appearance.head;
        this.botConf.equipment["pmc"].faceShieldIsActiveChancePercent = 100;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            this.botConf.equipment["pmc"].nvgIsActiveChanceDayPercent = 100;
            this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 25;
            this.botConf.equipment["pmc"].laserIsActiveChancePercent = 25;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.botConf.equipment["pmc"].nvgIsActiveChanceDayPercent = 50;
            this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 100;
            this.botConf.equipment["pmc"].laserIsActiveChancePercent = 100;
        }
        else {
            this.botConf.equipment["pmc"].nvgIsActiveChanceDayPercent = 0;
            this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["pmc"].laserIsActiveChancePercent = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 75;
                this.botConf.equipment["pmc"].laserIsActiveChancePercent = 75;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 100;
                this.botConf.equipment["pmc"].laserIsActiveChancePercent = 100;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                this.botConf.equipment["pmc"].lightIsActiveDayChancePercent = 0;
                this.botConf.equipment["pmc"].laserIsActiveChancePercent = 0;
            }
        }
        if (this.modConf.pmc_types == true) {
            if (utils_1.RaidInfoTracker.TOD === "day") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.BotTypes3.pmcTypeDay.sptusec;
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes3.pmcTypeDay.sptbear;
            }
            if (utils_1.RaidInfoTracker.TOD === "night") {
                this.botConf.pmc.pmcType.sptusec = pmcTypes.BotTypes3.pmcTypeNight.sptusec;
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes3.pmcTypeNight.sptbear;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("botConfig3 loaded");
        }
    }
    scavLoad1() {
        this.scavBase.inventory.Ammo = scavLO.scavLO1.inventory.Ammo;
        this.scavBase.inventory.equipment = scavLO.scavLO1.inventory.equipment;
        this.scavBase.inventory.items = scavLO.scavLO1.inventory.items;
        this.scavBase.inventory.mods = scavLO.scavLO1.inventory.mods;
        this.scavBase.chances = scavLO.scavLO1.chances;
        this.scavBase.generation = scavLO.scavLO1.generation;
        this.botConf.itemSpawnLimits.assault = scavLootLimitCat.ScavLootLimit1;
        if (utils_1.RaidInfoTracker.TOD === "night" || utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.scavBase.chances.mods.mod_flashlight = 40;
            this.botConf.equipment["assault"].lightIsActiveDayChancePercent = 100;
            this.botConf.equipment["assault"].laserIsActiveChancePercent = 100;
        }
        else {
            this.botConf.equipment["assault"].lightIsActiveDayChancePercent = 10;
            this.botConf.equipment["assault"].laserIsActiveChancePercent = 10;
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["assault"].lightIsActiveDayChancePercent = 70;
                this.botConf.equipment["assault"].laserIsActiveChancePercent = 70;
            }
        }
        if (this.modConf.dynamic_loot_scavs === true) {
            this.scavBase.inventory.items = scavLO.scavLO1.inventory.dynamic_looting;
            this.saniBase.generation.items.looseLoot.min = 0;
            this.saniBase.generation.items.looseLoot.max = 1;
        }
        utils_1.BotTierTracker.scavTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("scavLoad1 loaded");
        }
    }
    scavLoad2() {
        this.scavBase.inventory.Ammo = scavLO.scavLO2.inventory.Ammo;
        this.scavBase.inventory.equipment = scavLO.scavLO2.inventory.equipment;
        this.scavBase.inventory.items = scavLO.scavLO2.inventory.items;
        this.scavBase.inventory.mods = scavLO.scavLO2.inventory.mods;
        this.scavBase.chances = scavLO.scavLO2.chances;
        this.scavBase.generation = scavLO.scavLO2.generation;
        this.botConf.itemSpawnLimits.assault = scavLootLimitCat.ScavLootLimit2;
        if (utils_1.RaidInfoTracker.TOD === "night" || utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.scavBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["assault"].lightIsActiveDayChancePercent = 90;
            this.botConf.equipment["assault"].laserIsActiveChancePercent = 90;
        }
        else {
            this.botConf.equipment["assault"].lightIsActiveDayChancePercent = 10;
            this.botConf.equipment["assault"].laserIsActiveChancePercent = 10;
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["assault"].lightIsActiveDayChancePercent = 80;
                this.botConf.equipment["assault"].laserIsActiveChancePercent = 80;
            }
        }
        if (this.modConf.dynamic_loot_scavs === true) {
            this.scavBase.inventory.items = scavLO.scavLO2.inventory.dynamic_looting;
            this.saniBase.generation.items.looseLoot.min = 0;
            this.saniBase.generation.items.looseLoot.max = 2;
        }
        utils_1.BotTierTracker.scavTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("scavLoad2 loaded");
        }
    }
    scavLoad3() {
        this.scavBase.inventory.Ammo = scavLO.scavLO3.inventory.Ammo;
        this.scavBase.inventory.equipment = scavLO.scavLO3.inventory.equipment;
        this.scavBase.inventory.items = scavLO.scavLO3.inventory.items;
        this.scavBase.inventory.mods = scavLO.scavLO3.inventory.mods;
        this.scavBase.chances = scavLO.scavLO3.chances;
        this.scavBase.generation = scavLO.scavLO3.generation;
        this.botConf.itemSpawnLimits.assault = scavLootLimitCat.ScavLootLimit3;
        if (utils_1.RaidInfoTracker.TOD === "night" || utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.scavBase.chances.mods.mod_flashlight = 80;
            this.botConf.equipment["assault"].lightIsActiveDayChancePercent = 60;
            this.botConf.equipment["assault"].laserIsActiveChancePercent = 60;
        }
        else {
            this.botConf.equipment["assault"].lightIsActiveDayChancePercent = 10;
            this.botConf.equipment["assault"].laserIsActiveChancePercent = 10;
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["assault"].lightIsActiveDayChancePercent = 90;
                this.botConf.equipment["assault"].laserIsActiveChancePercent = 90;
            }
        }
        if (this.modConf.dynamic_loot_scavs === true) {
            this.scavBase.inventory.items = scavLO.scavLO3.inventory.dynamic_looting;
            this.saniBase.generation.items.looseLoot.min = 0;
            this.saniBase.generation.items.looseLoot.max = 3;
        }
        utils_1.BotTierTracker.scavTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("scavLoad3 loaded");
        }
    }
    usecLoad1(botJsonTemplate) {
        botJsonTemplate.inventory.Ammo = usecLO.usecLO1.inventory.Ammo;
        botJsonTemplate.inventory.equipment = usecLO.usecLO1.inventory.equipment;
        botJsonTemplate.inventory.items = usecLO.usecLO1.inventory.items;
        botJsonTemplate.inventory.mods = usecLO.usecLO1.inventory.mods;
        botJsonTemplate.chances = usecLO.usecLO1.chances;
        botJsonTemplate.generation = usecLO.usecLO1.generation;
        botJsonTemplate.appearance.body = usecLO.usecLO1.appearance.body;
        botJsonTemplate.appearance.feet = usecLO.usecLO1.appearance.feet;
        botJsonTemplate.experience.level = usecLO.usecLO1.experience.level;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.mods.mod_nvg = 15;
            botJsonTemplate.chances.mods.mod_flashlight = 40;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 15;
            botJsonTemplate.chances.mods.mod_flashlight = 40;
            botJsonTemplate.chances.mods.mod_equipment_000 = 10;
            botJsonTemplate.chances.mods.mod_equipment = 10;
        }
        else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_flashlight = 30;
                botJsonTemplate.chances.mods.mod_equipment_000 = 15;
                botJsonTemplate.chances.mods.mod_equipment = 15;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_flashlight = 40;
                botJsonTemplate.chances.mods.mod_equipment_000 = 20;
                botJsonTemplate.chances.mods.mod_equipment = 20;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 10;
                botJsonTemplate.chances.mods.mod_equipment = 10;
            }
        }
        if (this.modConf.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = usecLO.usecLO1.inventory.dynamic_looting;
            botJsonTemplate.generation.items.looseLoot.min = 0;
            botJsonTemplate.generation.items.looseLoot.max = 1;
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("usecLoad1 loaded");
        }
    }
    usecLoad2(botJsonTemplate) {
        botJsonTemplate.inventory.Ammo = usecLO.usecLO2.inventory.Ammo;
        botJsonTemplate.inventory.equipment = usecLO.usecLO2.inventory.equipment;
        botJsonTemplate.inventory.items = usecLO.usecLO2.inventory.items;
        botJsonTemplate.inventory.mods = usecLO.usecLO2.inventory.mods;
        botJsonTemplate.chances = usecLO.usecLO2.chances;
        botJsonTemplate.generation = usecLO.usecLO2.generation;
        botJsonTemplate.appearance.body = usecLO.usecLO2.appearance.body;
        botJsonTemplate.appearance.feet = usecLO.usecLO2.appearance.feet;
        botJsonTemplate.experience.level = usecLO.usecLO2.experience.level;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.mods.mod_nvg = 25;
            botJsonTemplate.chances.mods.mod_flashlight = 60;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 25;
            botJsonTemplate.chances.mods.mod_flashlight = 60;
            botJsonTemplate.chances.mods.mod_equipment_000 = 10;
            botJsonTemplate.chances.mods.mod_equipment = 10;
        }
        else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_flashlight = 40;
                botJsonTemplate.chances.mods.mod_equipment_000 = 20;
                botJsonTemplate.chances.mods.mod_equipment = 20;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_flashlight = 60;
                botJsonTemplate.chances.mods.mod_equipment_000 = 50;
                botJsonTemplate.chances.mods.mod_equipment = 50;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 0;
                botJsonTemplate.chances.mods.mod_equipment = 0;
            }
        }
        if (utils_1.RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO2.inventory.FirstPrimaryWeapon_urban;
        }
        if (utils_1.RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO2.inventory.FirstPrimaryWeapon_cqb;
        }
        if (utils_1.RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO2.inventory.FirstPrimaryWeapon_outdoor;
        }
        if (this.modConf.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = usecLO.usecLO2.inventory.dynamic_looting;
            botJsonTemplate.generation.items.looseLoot.min = 0;
            botJsonTemplate.generation.items.looseLoot.max = 2;
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("usecLoad2 loaded");
        }
    }
    usecLoad3(botJsonTemplate) {
        botJsonTemplate.inventory.Ammo = usecLO.usecLO3.inventory.Ammo;
        botJsonTemplate.inventory.equipment = usecLO.usecLO3.inventory.equipment;
        botJsonTemplate.inventory.items = usecLO.usecLO3.inventory.items;
        botJsonTemplate.inventory.mods = usecLO.usecLO3.inventory.mods;
        botJsonTemplate.chances = usecLO.usecLO3.chances;
        botJsonTemplate.generation = usecLO.usecLO3.generation;
        botJsonTemplate.appearance.body = usecLO.usecLO3.appearance.body;
        botJsonTemplate.appearance.feet = usecLO.usecLO3.appearance.feet;
        botJsonTemplate.experience.level = usecLO.usecLO3.experience.level;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.mods.mod_nvg = 50;
            botJsonTemplate.chances.mods.mod_flashlight = 90;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 60;
            botJsonTemplate.chances.mods.mod_flashlight = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 20;
            botJsonTemplate.chances.mods.mod_equipment = 20;
        }
        else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_flashlight = 80;
                botJsonTemplate.chances.mods.mod_equipment_000 = 50;
                botJsonTemplate.chances.mods.mod_equipment = 50;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_flashlight = 100;
                botJsonTemplate.chances.mods.mod_equipment_000 = 85;
                botJsonTemplate.chances.mods.mod_equipment = 85;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 0;
                botJsonTemplate.chances.mods.mod_equipment = 0;
            }
        }
        if (utils_1.RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO3.inventory.FirstPrimaryWeapon_urban;
        }
        if (utils_1.RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.Headwear = usecLO.usecLO3.inventory.Headwear_cqb;
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO3.inventory.FirstPrimaryWeapon_cqb;
        }
        if (utils_1.RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO3.inventory.FirstPrimaryWeapon_outdoor;
        }
        if (this.modConf.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = usecLO.usecLO3.inventory.dynamic_looting;
            botJsonTemplate.generation.items.looseLoot.min = 0;
            botJsonTemplate.generation.items.looseLoot.max = 2;
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("usecLoad3 loaded");
        }
    }
    usecLoad4(botJsonTemplate) {
        botJsonTemplate.inventory.Ammo = usecLO.usecLO4.inventory.Ammo;
        botJsonTemplate.inventory.equipment = usecLO.usecLO4.inventory.equipment;
        botJsonTemplate.inventory.items = usecLO.usecLO4.inventory.items;
        botJsonTemplate.inventory.mods = usecLO.usecLO4.inventory.mods;
        botJsonTemplate.chances = usecLO.usecLO4.chances;
        botJsonTemplate.generation = usecLO.usecLO4.generation;
        botJsonTemplate.appearance.body = usecLO.usecLO4.appearance.body;
        botJsonTemplate.appearance.feet = usecLO.usecLO4.appearance.feet;
        botJsonTemplate.experience.level = usecLO.usecLO4.experience.level;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.mods.mod_nvg = 70;
            botJsonTemplate.chances.mods.mod_flashlight = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 65;
            botJsonTemplate.chances.mods.mod_flashlight = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 20;
            botJsonTemplate.chances.mods.mod_equipment = 20;
        }
        else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_flashlight = 100;
                botJsonTemplate.chances.mods.mod_equipment_000 = 60;
                botJsonTemplate.chances.mods.mod_equipment = 60;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_flashlight = 100;
                botJsonTemplate.chances.mods.mod_equipment_000 = 80;
                botJsonTemplate.chances.mods.mod_equipment = 80;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 25;
                botJsonTemplate.chances.mods.mod_equipment = 25;
            }
        }
        if (utils_1.RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO4.inventory.FirstPrimaryWeapon_urban;
        }
        if (utils_1.RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.Headwear = usecLO.usecLO4.inventory.Headwear_cqb;
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO4.inventory.FirstPrimaryWeapon_cqb;
        }
        if (utils_1.RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = usecLO.usecLO4.inventory.FirstPrimaryWeapon_outdoor;
        }
        if (this.modConf.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = usecLO.usecLO4.inventory.dynamic_looting;
            botJsonTemplate.generation.items.looseLoot.min = 0;
            botJsonTemplate.generation.items.looseLoot.max = 3;
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("usecLoad4 loaded");
        }
    }
    bearLoad1(botJsonTemplate) {
        botJsonTemplate.inventory.Ammo = bearLO.bearLO1.inventory.Ammo;
        botJsonTemplate.inventory.equipment = bearLO.bearLO1.inventory.equipment;
        botJsonTemplate.inventory.items = bearLO.bearLO1.inventory.items;
        botJsonTemplate.inventory.mods = bearLO.bearLO1.inventory.mods;
        botJsonTemplate.chances = bearLO.bearLO1.chances;
        botJsonTemplate.generation = bearLO.bearLO1.generation;
        botJsonTemplate.appearance.body = bearLO.bearLO1.appearance.body;
        botJsonTemplate.appearance.feet = bearLO.bearLO1.appearance.feet;
        botJsonTemplate.experience.level = bearLO.bearLO1.experience.level;
        botJsonTemplate.appearance.voice = bearLO.LowTierVoice;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.mods.mod_nvg = 20;
            botJsonTemplate.chances.mods.mod_flashlight = 70;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 15;
            botJsonTemplate.chances.mods.mod_flashlight = 40;
            botJsonTemplate.chances.mods.mod_equipment_000 = 20;
            botJsonTemplate.chances.mods.mod_equipment = 20;
        }
        else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 35;
                botJsonTemplate.chances.mods.mod_equipment = 35;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 50;
                botJsonTemplate.chances.mods.mod_equipment = 50;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 20;
                botJsonTemplate.chances.mods.mod_equipment = 20;
            }
        }
        if (this.modConf.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = bearLO.bearLO1.inventory.dynamic_looting;
            botJsonTemplate.generation.items.looseLoot.min = 0;
            botJsonTemplate.generation.items.looseLoot.max = 1;
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("bearLoad1 loaded");
        }
    }
    bearLoad2(botJsonTemplate) {
        botJsonTemplate.inventory.Ammo = bearLO.bearLO2.inventory.Ammo;
        botJsonTemplate.inventory.equipment = bearLO.bearLO2.inventory.equipment;
        botJsonTemplate.inventory.items = bearLO.bearLO2.inventory.items;
        botJsonTemplate.inventory.mods = bearLO.bearLO2.inventory.mods;
        botJsonTemplate.chances = bearLO.bearLO2.chances;
        botJsonTemplate.generation = bearLO.bearLO2.generation;
        botJsonTemplate.appearance.body = bearLO.bearLO2.appearance.body;
        botJsonTemplate.appearance.feet = bearLO.bearLO2.appearance.feet;
        botJsonTemplate.experience.level = bearLO.bearLO2.experience.level;
        botJsonTemplate.appearance.voice = bearLO.LowTierVoice;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.mods.mod_nvg = 20;
            botJsonTemplate.chances.mods.mod_flashlight = 80;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 25;
            botJsonTemplate.chances.mods.mod_flashlight = 60;
            botJsonTemplate.chances.mods.mod_equipment_000 = 20;
            botJsonTemplate.chances.mods.mod_equipment = 20;
        }
        else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 45;
                botJsonTemplate.chances.mods.mod_equipment = 45;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 70;
                botJsonTemplate.chances.mods.mod_equipment = 70;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 20;
                botJsonTemplate.chances.mods.mod_equipment = 20;
            }
        }
        if (utils_1.RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO2.inventory.FirstPrimaryWeapon_urban;
        }
        if (utils_1.RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO2.inventory.FirstPrimaryWeapon_cqb;
        }
        if (utils_1.RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO2.inventory.FirstPrimaryWeapon_outdoor;
        }
        if (this.modConf.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = bearLO.bearLO2.inventory.dynamic_looting;
            botJsonTemplate.generation.items.looseLoot.min = 0;
            botJsonTemplate.generation.items.looseLoot.max = 2;
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("bearLoad2 loaded");
        }
    }
    bearLoad3(botJsonTemplate) {
        botJsonTemplate.inventory.Ammo = bearLO.bearLO3.inventory.Ammo;
        botJsonTemplate.inventory.equipment = bearLO.bearLO3.inventory.equipment;
        botJsonTemplate.inventory.items = bearLO.bearLO3.inventory.items;
        botJsonTemplate.inventory.mods = bearLO.bearLO3.inventory.mods;
        botJsonTemplate.chances = bearLO.bearLO3.chances;
        botJsonTemplate.generation = bearLO.bearLO3.generation;
        botJsonTemplate.appearance.body = bearLO.bearLO3.appearance.body;
        botJsonTemplate.appearance.feet = bearLO.bearLO3.appearance.feet;
        botJsonTemplate.experience.level = bearLO.bearLO3.experience.level;
        botJsonTemplate.appearance.voice = bearLO.HighTierVoice;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.mods.mod_nvg = 40;
            botJsonTemplate.chances.mods.mod_flashlight = 90;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
            botJsonTemplate.inventory.equipment.Headwear = bearLO.bearLO3.inventory.Headwear_night;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 50;
            botJsonTemplate.chances.mods.mod_flashlight = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 30;
            botJsonTemplate.chances.mods.mod_equipment = 30;
        }
        else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 70;
                botJsonTemplate.chances.mods.mod_equipment = 70;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 100;
                botJsonTemplate.chances.mods.mod_equipment = 100;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 20;
                botJsonTemplate.chances.mods.mod_equipment = 20;
            }
        }
        if (utils_1.RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO3.inventory.FirstPrimaryWeapon_urban;
        }
        if (utils_1.RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO3.inventory.FirstPrimaryWeapon_cqb;
        }
        if (utils_1.RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO3.inventory.FirstPrimaryWeapon_outdoor;
        }
        if (this.modConf.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = bearLO.bearLO3.inventory.dynamic_looting;
            botJsonTemplate.generation.items.looseLoot.min = 0;
            botJsonTemplate.generation.items.looseLoot.max = 2;
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("bearLoad3 loaded");
        }
    }
    bearLoad4(botJsonTemplate) {
        botJsonTemplate.inventory.Ammo = bearLO.bearLO4.inventory.Ammo;
        botJsonTemplate.inventory.equipment = bearLO.bearLO4.inventory.equipment;
        botJsonTemplate.inventory.items = bearLO.bearLO4.inventory.items;
        botJsonTemplate.inventory.mods = bearLO.bearLO4.inventory.mods;
        botJsonTemplate.chances = bearLO.bearLO4.chances;
        botJsonTemplate.generation = bearLO.bearLO4.generation;
        botJsonTemplate.appearance.body = bearLO.bearLO4.appearance.body;
        botJsonTemplate.appearance.feet = bearLO.bearLO4.appearance.feet;
        botJsonTemplate.experience.level = bearLO.bearLO4.experience.level;
        botJsonTemplate.appearance.voice = bearLO.HighTierVoice;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            botJsonTemplate.chances.mods.mod_nvg = 40;
            botJsonTemplate.chances.mods.mod_flashlight = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 0;
            botJsonTemplate.chances.mods.mod_equipment = 0;
            botJsonTemplate.inventory.equipment.Headwear = bearLO.bearLO4.inventory.Headwear_night;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            botJsonTemplate.chances.mods.mod_nvg = 50;
            botJsonTemplate.chances.mods.mod_flashlight = 100;
            botJsonTemplate.chances.mods.mod_equipment_000 = 40;
            botJsonTemplate.chances.mods.mod_equipment = 40;
        }
        else {
            botJsonTemplate.chances.mods.mod_nvg = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 100;
                botJsonTemplate.chances.mods.mod_equipment = 100;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 100;
                botJsonTemplate.chances.mods.mod_equipment = 100;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                botJsonTemplate.chances.mods.mod_equipment_000 = 20;
                botJsonTemplate.chances.mods.mod_equipment = 20;
            }
        }
        if (utils_1.RaidInfoTracker.mapType === "urban") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO4.inventory.FirstPrimaryWeapon_urban;
        }
        if (utils_1.RaidInfoTracker.mapType === "cqb") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO4.inventory.FirstPrimaryWeapon_cqb;
        }
        if (utils_1.RaidInfoTracker.mapType === "outdoor") {
            botJsonTemplate.inventory.equipment.FirstPrimaryWeapon = bearLO.bearLO4.inventory.FirstPrimaryWeapon_outdoor;
        }
        if (this.modConf.pmc_types == true) {
            if (utils_1.RaidInfoTracker.TOD === "day") {
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes3.pmcTypeDay.sptbear;
            }
            if (utils_1.RaidInfoTracker.TOD === "night") {
                this.botConf.pmc.pmcType.sptbear = pmcTypes.BotTypes3.pmcTypeNight.sptbear;
            }
        }
        if (this.modConf.dynamic_loot_pmcs === true) {
            botJsonTemplate.inventory.items = bearLO.bearLO4.inventory.dynamic_looting;
            botJsonTemplate.generation.items.looseLoot.min = 0;
            botJsonTemplate.generation.items.looseLoot.max = 3;
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("bearLoad4 loaded");
        }
    }
    raiderLoad1() {
        this.raiderBase.inventory.Ammo = raiderLO.raiderLO1.inventory.Ammo;
        this.raiderBase.inventory.equipment = raiderLO.raiderLO1.inventory.equipment;
        this.raiderBase.inventory.items = raiderLO.raiderLO1.inventory.items;
        this.raiderBase.inventory.mods = raiderLO.raiderLO1.inventory.mods;
        this.raiderBase.chances = raiderLO.raiderLO1.chances;
        this.raiderBase.generation = raiderLO.raiderLO1.generation;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;
        this.botConf.equipment["pmcbot"].faceShieldIsActiveChancePercent = 100;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            this.raiderBase.chances.mods.mod_nvg = 40;
            this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
            this.raiderBase.chances.mods.mod_equipment *= 0.5;
            this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 50;
            this.botConf.equipment["pmcbot"].nvgIsActiveChanceDayPercent = 100;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO1.inventory.FirstPrimaryWeapon_cqb;
            this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 70;
            this.raiderBase.chances.mods.mod_nvg = 40;
            this.raiderBase.chances.mods.mod_equipment_000 = 50;
            this.raiderBase.chances.mods.mod_equipment = 50;
            this.botConf.equipment["pmcbot"].nvgIsActiveChanceDayPercent = 50;
        }
        else {
            this.raiderBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["pmcbot"].nvgIsActiveChanceDayPercent = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                this.raiderBase.chances.mods.mod_equipment_000 = 50;
                this.raiderBase.chances.mods.mod_equipment = 50;
                this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 50;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                this.raiderBase.chances.mods.mod_equipment_000 = 80;
                this.raiderBase.chances.mods.mod_equipment = 80;
                this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 100;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
                this.raiderBase.chances.mods.mod_equipment *= 0.5;
                this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            }
        }
        if (utils_1.RaidInfoTracker.mapType === "urban") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO1.inventory.FirstPrimaryWeapon_urban;
        }
        if (utils_1.RaidInfoTracker.mapType === "cqb") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO1.inventory.FirstPrimaryWeapon_cqb;
        }
        if (utils_1.RaidInfoTracker.mapType === "outdoor") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO1.inventory.FirstPrimaryWeapon_outdoor;
        }
        utils_1.BotTierTracker.raiderTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("raiderLoad1 loaded");
        }
    }
    raiderLoad2() {
        this.raiderBase.inventory.Ammo = raiderLO.raiderLO2.inventory.Ammo;
        this.raiderBase.inventory.equipment = raiderLO.raiderLO2.inventory.equipment;
        this.raiderBase.inventory.items = raiderLO.raiderLO2.inventory.items;
        this.raiderBase.inventory.mods = raiderLO.raiderLO2.inventory.mods;
        this.raiderBase.chances = raiderLO.raiderLO2.chances;
        this.raiderBase.generation = raiderLO.raiderLO2.generation;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;
        this.botConf.equipment["pmcbot"].faceShieldIsActiveChancePercent = 100;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            this.raiderBase.chances.mods.mod_nvg = 60;
            this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
            this.raiderBase.chances.mods.mod_equipment *= 0.5;
            this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 25;
            this.botConf.equipment["pmcbot"].nvgIsActiveChanceDayPercent = 100;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO2.inventory.FirstPrimaryWeapon_cqb;
            this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 50;
            this.raiderBase.chances.mods.mod_nvg = 50;
            this.raiderBase.chances.mods.mod_equipment_000 = 50;
            this.raiderBase.chances.mods.mod_equipment = 50;
            this.botConf.equipment["pmcbot"].nvgIsActiveChanceDayPercent = 50;
        }
        else {
            this.raiderBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["pmcbot"].nvgIsActiveChanceDayPercent = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                this.raiderBase.chances.mods.mod_equipment_000 = 70;
                this.raiderBase.chances.mods.mod_equipment = 70;
                this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 60;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                this.raiderBase.chances.mods.mod_equipment_000 = 90;
                this.raiderBase.chances.mods.mod_equipment = 90;
                this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 100;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
                this.raiderBase.chances.mods.mod_equipment *= 0.5;
                this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            }
        }
        if (utils_1.RaidInfoTracker.mapType === "urban") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO2.inventory.FirstPrimaryWeapon_urban;
        }
        if (utils_1.RaidInfoTracker.mapType === "cqb") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO2.inventory.FirstPrimaryWeapon_cqb;
        }
        if (utils_1.RaidInfoTracker.mapType === "outdoor") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO2.inventory.FirstPrimaryWeapon_outdoor;
        }
        utils_1.BotTierTracker.raiderTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("raiderLoad2 loaded");
        }
    }
    raiderLoad3() {
        this.raiderBase.inventory.Ammo = raiderLO.raiderLO3.inventory.Ammo;
        this.raiderBase.inventory.equipment = raiderLO.raiderLO3.inventory.equipment;
        this.raiderBase.inventory.items = raiderLO.raiderLO3.inventory.items;
        this.raiderBase.inventory.mods = raiderLO.raiderLO3.inventory.mods;
        this.raiderBase.chances = raiderLO.raiderLO3.chances;
        this.raiderBase.generation = raiderLO.raiderLO3.generation;
        this.raiderBase.appearance.body = raiderLO.appearance.body;
        this.raiderBase.appearance.feet = raiderLO.appearance.feet;
        this.raiderBase.appearance.head = raiderLO.appearance.head;
        this.raiderBase.appearance.voice = raiderLO.appearance.voice;
        this.botConf.equipment["pmcbot"].faceShieldIsActiveChancePercent = 100;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            this.raiderBase.chances.mods.mod_nvg = 80;
            this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
            this.raiderBase.chances.mods.mod_equipment *= 0.5;
            this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["pmcbot"].nvgIsActiveChanceDayPercent = 100;
        }
        else if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO3.inventory.FirstPrimaryWeapon_cqb;
            this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            this.raiderBase.chances.mods.mod_nvg = 50;
            this.raiderBase.chances.mods.mod_equipment_000 = 60;
            this.raiderBase.chances.mods.mod_equipment = 60;
            this.botConf.equipment["pmcbot"].nvgIsActiveChanceDayPercent = 50;
        }
        else {
            this.raiderBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["pmcbot"].nvgIsActiveChanceDayPercent = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban") {
                this.raiderBase.chances.mods.mod_equipment_000 = 100;
                this.raiderBase.chances.mods.mod_equipment = 100;
                this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 80;
            }
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                this.raiderBase.chances.mods.mod_equipment_000 = 100;
                this.raiderBase.chances.mods.mod_equipment = 100;
                this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 100;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                this.raiderBase.chances.mods.mod_equipment_000 *= 0.5;
                this.raiderBase.chances.mods.mod_equipment *= 0.5;
                this.botConf.equipment["pmcbot"].lightIsActiveDayChancePercent = 0;
            }
        }
        if (utils_1.RaidInfoTracker.mapType === "urban") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO3.inventory.FirstPrimaryWeapon_urban;
        }
        if (utils_1.RaidInfoTracker.mapType === "cqb") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO3.inventory.FirstPrimaryWeapon_cqb;
        }
        if (utils_1.RaidInfoTracker.mapType === "outdoor") {
            this.raiderBase.inventory.equipment.FirstPrimaryWeapon = raiderLO.raiderLO3.inventory.FirstPrimaryWeapon_outdoor;
        }
        utils_1.BotTierTracker.raiderTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("raiderLoad3 loaded");
        }
    }
    rogueLoad1() {
        this.rogueBase.inventory.Ammo = rogueLO.rogueLO1.inventory.Ammo;
        this.rogueBase.inventory.equipment = rogueLO.rogueLO1.inventory.equipment;
        this.rogueBase.inventory.items = rogueLO.rogueLO1.inventory.items;
        this.rogueBase.inventory.mods = rogueLO.rogueLO1.inventory.mods;
        ;
        this.rogueBase.chances = rogueLO.rogueLO1.chances;
        this.rogueBase.generation = rogueLO.rogueLO1.generation;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;
        this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 100;
        if (utils_1.RaidInfoTracker.TOD === "night" || utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.rogueBase.chances.mods.mod_nvg = 30;
            this.botConf.equipment["exusec"].lightIsActiveDayChancePercent = 100;
            this.botConf.equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (utils_1.RaidInfoTracker.TOD === "night" && utils_1.RaidInfoTracker.mapName === "Lighthouse" || utils_1.RaidInfoTracker.mapName === "lighthouse") {
            this.rogueBase.chances.mods.mod_nvg = 30;
            this.botConf.equipment["exusec"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (utils_1.RaidInfoTracker.TOD === "day") {
            this.rogueBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["exusec"].nvgIsActiveChanceDayPercent = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban" || utils_1.RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 100;
                this.botConf.equipment["exusec"].lightIsActiveDayChancePercent = 100;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 30;
                this.botConf.equipment["exusec"].lightIsActiveDayChancePercent = 0;
            }
        }
        utils_1.BotTierTracker.rogueTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("rogueLoad1 loaded");
        }
    }
    rogueLoad2() {
        this.rogueBase.inventory.Ammo = rogueLO.rogueLO2.inventory.Ammo;
        this.rogueBase.inventory.equipment = rogueLO.rogueLO2.inventory.equipment;
        this.rogueBase.inventory.items = rogueLO.rogueLO2.inventory.items;
        this.rogueBase.inventory.mods = rogueLO.rogueLO2.inventory.mods;
        this.rogueBase.chances = rogueLO.rogueLO2.chances;
        this.rogueBase.generation = rogueLO.rogueLO2.generation;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;
        this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 100;
        if (utils_1.RaidInfoTracker.TOD === "night" || utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.rogueBase.chances.mods.mod_nvg = 40;
            this.botConf.equipment["exusec"].lightIsActiveDayChancePercent = 100;
            this.botConf.equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (utils_1.RaidInfoTracker.TOD === "night" && utils_1.RaidInfoTracker.mapName === "Lighthouse" || utils_1.RaidInfoTracker.mapName === "lighthouse") {
            this.rogueBase.chances.mods.mod_nvg = 40;
            this.botConf.equipment["exusec"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (utils_1.RaidInfoTracker.TOD === "day") {
            this.rogueBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["exusec"].nvgIsActiveChanceDayPercent = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban" || utils_1.RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 100;
                this.botConf.equipment["exusec"].lightIsActiveDayChancePercent = 100;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 30;
                this.botConf.equipment["exusec"].lightIsActiveDayChancePercent = 0;
            }
        }
        utils_1.BotTierTracker.rogueTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("rogueLoad2 loaded");
        }
    }
    rogueLoad3() {
        this.rogueBase.inventory.Ammo = rogueLO.rogueLO3.inventory.Ammo;
        this.rogueBase.inventory.equipment = rogueLO.rogueLO3.inventory.equipment;
        this.rogueBase.inventory.items = rogueLO.rogueLO3.inventory.items;
        this.rogueBase.inventory.mods = rogueLO.rogueLO3.inventory.mods;
        this.rogueBase.chances = rogueLO.rogueLO3.chances;
        this.rogueBase.generation = rogueLO.rogueLO3.generation;
        this.rogueBase.appearance.body = rogueLO.appearance.body;
        this.rogueBase.appearance.feet = rogueLO.appearance.feet;
        this.rogueBase.appearance.head = rogueLO.appearance.head;
        this.rogueBase.appearance.voice = rogueLO.appearance.voice;
        this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 100;
        if (utils_1.RaidInfoTracker.TOD === "night" || utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.rogueBase.chances.mods.mod_nvg = 50;
            this.botConf.equipment["exusec"].lightIsActiveDayChancePercent = 100;
            this.botConf.equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (utils_1.RaidInfoTracker.TOD === "night" && utils_1.RaidInfoTracker.mapName === "Lighthouse" || utils_1.RaidInfoTracker.mapName === "lighthouse") {
            this.rogueBase.chances.mods.mod_nvg = 50;
            this.botConf.equipment["exusec"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["exusec"].nvgIsActiveChanceDayPercent = 100;
        }
        if (utils_1.RaidInfoTracker.TOD === "day") {
            this.rogueBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["exusec"].nvgIsActiveChanceDayPercent = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban" || utils_1.RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 100;
                this.botConf.equipment["exusec"].lightIsActiveDayChancePercent = 100;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                this.botConf.equipment["exusec"].faceShieldIsActiveChancePercent = 30;
                this.botConf.equipment["exusec"].lightIsActiveDayChancePercent = 0;
            }
        }
        utils_1.BotTierTracker.rogueTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("rogueLoad3 loaded");
        }
    }
    goonsLoad1() {
        this.knightBase.inventory.Ammo = knightLO.knightLO1.inventory.Ammo;
        this.knightBase.inventory.equipment = knightLO.knightLO1.inventory.equipment;
        this.knightBase.inventory.items = knightLO.knightLO1.inventory.items;
        this.knightBase.inventory.mods = knightLO.knightLO1.inventory.mods;
        this.knightBase.chances = knightLO.knightLO1.chances;
        this.knightBase.generation = knightLO.knightLO1.generation;
        this.botConf.equipment["bossknight"].faceShieldIsActiveChancePercent = 100;
        const randNum = this.utils.pickRandNumOneInTen();
        this.bigpipeBase.inventory.Ammo = bigpipeLO.bigpipeLO1.inventory.Ammo;
        this.bigpipeBase.inventory.equipment = bigpipeLO.bigpipeLO1.inventory.equipment;
        this.bigpipeBase.inventory.items = bigpipeLO.bigpipeLO1.inventory.items;
        this.bigpipeBase.inventory.mods = bigpipeLO.bigpipeLO1.inventory.mods;
        this.bigpipeBase.chances = bigpipeLO.bigpipeLO1.chances;
        this.bigpipeBase.generation = bigpipeLO.bigpipeLO1.generation;
        this.botConf.equipment["followerbigpipe"].faceShieldIsActiveChancePercent = 100;
        this.birdeyeBase.inventory.Ammo = birdeyeLO.birdeyeLO1.inventory.Ammo;
        this.birdeyeBase.inventory.equipment = birdeyeLO.birdeyeLO1.inventory.equipment;
        this.birdeyeBase.inventory.items = birdeyeLO.birdeyeLO1.inventory.items;
        this.birdeyeBase.inventory.mods = birdeyeLO.birdeyeLO1.inventory.mods;
        this.birdeyeBase.chances = birdeyeLO.birdeyeLO1.chances;
        this.birdeyeBase.generation = birdeyeLO.birdeyeLO1.generation;
        this.botConf.equipment["followerbirdeye"].faceShieldIsActiveChancePercent = 100;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            if (randNum >= 6) {
                this.knightBase.chances.equipment.Headwear = 100;
                this.knightBase.chances.equipment.FaceCover = 0;
                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                this.knightBase.chances.equipment.FaceCover = 0;
            }
            else {
                this.knightBase.chances.equipment.FaceCover = 100;
                this.knightBase.chances.equipment.Headwear = 0;
                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                this.knightBase.chances.equipment.FaceCover = 100;
            }
            this.knightBase.chances.mods.mod_nvg = 100;
            this.botConf.equipment["bossknight"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;
            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf.equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;
            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
            this.botConf.equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
        }
        if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            if (randNum >= 6) {
                this.knightBase.chances.equipment.Headwear = 100;
                this.knightBase.chances.equipment.FaceCover = 0;
                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                this.knightBase.chances.equipment.FaceCover = 0;
            }
            else {
                this.knightBase.chances.equipment.FaceCover = 100;
                this.knightBase.chances.equipment.Headwear = 0;
                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                this.knightBase.chances.equipment.FaceCover = 100;
            }
            this.knightBase.chances.mods.mod_nvg = 100;
            this.botConf.equipment["bossknight"].lightIsActiveDayChancePercent = 100;
            this.botConf.equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;
            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf.equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;
            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 5;
            this.botConf.equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
        }
        if (utils_1.RaidInfoTracker.TOD === "day") {
            this.knightBase.chances.mods.mod_nvg = 0;
            this.bigpipeBase.chances.mods.mod_nvg = 0;
            this.birdeyeBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["bossknight"].nvgIsActiveChanceDayPercent = 0;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban" || utils_1.RaidInfoTracker.mapType === "cqb") {
                if (randNum >= 6) {
                    this.knightBase.chances.equipment.Headwear = 100;
                    this.knightBase.chances.equipment.FaceCover = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                    this.knightBase.chances.equipment.FaceCover = 0;
                }
                else {
                    this.knightBase.chances.equipment.FaceCover = 100;
                    this.knightBase.chances.equipment.Headwear = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                    this.knightBase.chances.equipment.FaceCover = 100;
                }
                this.botConf.equipment["bossknight"].lightIsActiveDayChancePercent = 100;
                this.bigpipeBase.chances.mods.mod_equipment_000 = 100;
                this.botConf.equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;
                this.birdeyeBase.chances.equipment.Headwear = 50;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 50;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf.equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                if (randNum >= 8) {
                    this.knightBase.chances.equipment.Headwear = 100;
                    this.knightBase.chances.equipment.FaceCover = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                    this.knightBase.chances.equipment.FaceCover = 0;
                }
                else {
                    this.knightBase.chances.equipment.FaceCover = 100;
                    this.knightBase.chances.equipment.Headwear = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                    this.knightBase.chances.equipment.FaceCover = 100;
                }
                this.knightBase.chances.mods.mod_equipment_000 = 0;
                this.knightBase.chances.mods.mod_equipment_001 *= 0.5;
                this.botConf.equipment["bossknight"].lightIsActiveDayChancePercent = 0;
                this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
                this.botConf.equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;
                this.birdeyeBase.chances.equipment.Headwear = 25;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf.equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            }
        }
        if (utils_1.RaidInfoTracker.mapType === "cqb") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO1.inventory.FirstPrimaryWeapon_cqb;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
        }
        if (utils_1.RaidInfoTracker.mapType === "urban") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO1.inventory.FirstPrimaryWeapon_urban;
        }
        if (utils_1.RaidInfoTracker.mapType === "outdoor") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO1.inventory.FirstPrimaryWeapon_outdoor;
        }
        utils_1.BotTierTracker.goonsTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("goonsLoad1 loaded");
        }
    }
    goonsLoad2() {
        this.knightBase.inventory.Ammo = knightLO.knightLO2.inventory.Ammo;
        this.knightBase.inventory.equipment = knightLO.knightLO2.inventory.equipment;
        this.knightBase.inventory.items = knightLO.knightLO2.inventory.items;
        this.knightBase.inventory.mods = knightLO.knightLO2.inventory.mods;
        this.knightBase.chances = knightLO.knightLO2.chances;
        this.knightBase.generation = knightLO.knightLO2.generation;
        this.botConf.equipment["bossknight"].faceShieldIsActiveChancePercent = 100;
        const randNum = this.utils.pickRandNumOneInTen();
        this.bigpipeBase.inventory.Ammo = bigpipeLO.bigpipeLO2.inventory.Ammo;
        this.bigpipeBase.inventory.equipment = bigpipeLO.bigpipeLO2.inventory.equipment;
        this.bigpipeBase.inventory.items = bigpipeLO.bigpipeLO2.inventory.items;
        this.bigpipeBase.inventory.mods = bigpipeLO.bigpipeLO2.inventory.mods;
        this.bigpipeBase.chances = bigpipeLO.bigpipeLO2.chances;
        this.bigpipeBase.generation = bigpipeLO.bigpipeLO2.generation;
        this.botConf.equipment["followerbigpipe"].faceShieldIsActiveChancePercent = 100;
        this.birdeyeBase.inventory.Ammo = birdeyeLO.birdeyeLO2.inventory.Ammo;
        this.birdeyeBase.inventory.equipment = birdeyeLO.birdeyeLO2.inventory.equipment;
        this.birdeyeBase.inventory.items = birdeyeLO.birdeyeLO2.inventory.items;
        this.birdeyeBase.inventory.mods = birdeyeLO.birdeyeLO2.inventory.mods;
        this.birdeyeBase.chances = birdeyeLO.birdeyeLO2.chances;
        this.birdeyeBase.generation = birdeyeLO.birdeyeLO2.generation;
        this.botConf.equipment["followerbirdeye"].faceShieldIsActiveChancePercent = 100;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            if (randNum >= 4) {
                this.knightBase.chances.equipment.Headwear = 100;
                this.knightBase.chances.equipment.FaceCover = 0;
                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                this.knightBase.chances.equipment.FaceCover = 0;
            }
            else {
                this.knightBase.chances.equipment.FaceCover = 100;
                this.knightBase.chances.equipment.Headwear = 0;
                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                this.knightBase.chances.equipment.FaceCover = 100;
            }
            this.knightBase.chances.mods.mod_nvg = 100;
            this.botConf.equipment["bossknight"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;
            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf.equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;
            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 5;
            this.botConf.equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
        }
        if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            if (randNum >= 3) {
                this.knightBase.chances.equipment.Headwear = 100;
                this.knightBase.chances.equipment.FaceCover = 0;
                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                this.knightBase.chances.equipment.FaceCover = 0;
            }
            else {
                this.knightBase.chances.equipment.FaceCover = 100;
                this.knightBase.chances.equipment.Headwear = 0;
                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                this.knightBase.chances.equipment.FaceCover = 100;
            }
            this.knightBase.chances.mods.mod_nvg = 100;
            this.botConf.equipment["bossknight"].lightIsActiveDayChancePercent = 100;
            this.botConf.equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;
            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf.equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;
            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 10;
            this.botConf.equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
        }
        if (utils_1.RaidInfoTracker.TOD === "day") {
            this.knightBase.chances.mods.mod_nvg = 0;
            this.bigpipeBase.chances.mods.mod_nvg = 0;
            this.birdeyeBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["bossknight"].nvgIsActiveChanceDayPercent = 0;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban" || utils_1.RaidInfoTracker.mapType === "cqb") {
                if (randNum >= 4) {
                    this.knightBase.chances.equipment.Headwear = 100;
                    this.knightBase.chances.equipment.FaceCover = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                    this.knightBase.chances.equipment.FaceCover = 0;
                }
                else {
                    this.knightBase.chances.equipment.FaceCover = 100;
                    this.knightBase.chances.equipment.Headwear = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                    this.knightBase.chances.equipment.FaceCover = 100;
                }
                this.botConf.equipment["bossknight"].lightIsActiveDayChancePercent = 100;
                this.bigpipeBase.chances.mods.mod_equipment_000 = 100;
                this.botConf.equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;
                this.birdeyeBase.chances.equipment.Headwear = 50;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 50;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf.equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                if (randNum >= 5) {
                    this.knightBase.chances.equipment.Headwear = 100;
                    this.knightBase.chances.equipment.FaceCover = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                    this.knightBase.chances.equipment.FaceCover = 0;
                }
                else {
                    this.knightBase.chances.equipment.FaceCover = 100;
                    this.knightBase.chances.equipment.Headwear = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                    this.knightBase.chances.equipment.FaceCover = 100;
                }
                this.knightBase.chances.mods.mod_equipment_000 = 0;
                this.knightBase.chances.mods.mod_equipment_001 *= 0.5;
                this.botConf.equipment["bossknight"].lightIsActiveDayChancePercent = 0;
                this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
                this.botConf.equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;
                this.birdeyeBase.chances.equipment.Headwear = 25;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf.equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            }
        }
        if (utils_1.RaidInfoTracker.mapType === "cqb") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO2.inventory.FirstPrimaryWeapon_cqb;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
        }
        if (utils_1.RaidInfoTracker.mapType === "urban") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO2.inventory.FirstPrimaryWeapon_urban;
        }
        if (utils_1.RaidInfoTracker.mapType === "outdoor") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO2.inventory.FirstPrimaryWeapon_outdoor;
        }
        utils_1.BotTierTracker.goonsTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("goonsLoad2 loaded");
        }
    }
    goonsLoad3() {
        this.knightBase.inventory.Ammo = knightLO.knightLO3.inventory.Ammo;
        this.knightBase.inventory.equipment = knightLO.knightLO3.inventory.equipment;
        this.knightBase.inventory.items = knightLO.knightLO3.inventory.items;
        this.knightBase.inventory.mods = knightLO.knightLO3.inventory.mods;
        this.knightBase.chances = knightLO.knightLO3.chances;
        this.knightBase.generation = knightLO.knightLO3.generation;
        this.botConf.equipment["bossknight"].faceShieldIsActiveChancePercent = 100;
        const randNum = this.utils.pickRandNumOneInTen();
        this.bigpipeBase.inventory.Ammo = bigpipeLO.bigpipeLO3.inventory.Ammo;
        this.bigpipeBase.inventory.equipment = bigpipeLO.bigpipeLO3.inventory.equipment;
        this.bigpipeBase.inventory.items = bigpipeLO.bigpipeLO3.inventory.items;
        this.bigpipeBase.inventory.mods = bigpipeLO.bigpipeLO3.inventory.mods;
        this.bigpipeBase.chances = bigpipeLO.bigpipeLO3.chances;
        this.bigpipeBase.generation = bigpipeLO.bigpipeLO3.generation;
        this.botConf.equipment["followerbigpipe"].faceShieldIsActiveChancePercent = 100;
        this.birdeyeBase.inventory.Ammo = birdeyeLO.birdeyeLO3.inventory.Ammo;
        this.birdeyeBase.inventory.equipment = birdeyeLO.birdeyeLO3.inventory.equipment;
        this.birdeyeBase.inventory.items = birdeyeLO.birdeyeLO3.inventory.items;
        this.birdeyeBase.inventory.mods = birdeyeLO.birdeyeLO3.inventory.mods;
        this.birdeyeBase.chances = birdeyeLO.birdeyeLO3.chances;
        this.birdeyeBase.generation = birdeyeLO.birdeyeLO3.generation;
        this.botConf.equipment["followerbirdeye"].faceShieldIsActiveChancePercent = 100;
        if (utils_1.RaidInfoTracker.TOD === "night") {
            if (randNum >= 3) {
                this.knightBase.chances.equipment.Headwear = 100;
                this.knightBase.chances.equipment.FaceCover = 0;
                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                this.knightBase.chances.equipment.FaceCover = 0;
            }
            else {
                this.knightBase.chances.equipment.FaceCover = 100;
                this.knightBase.chances.equipment.Headwear = 0;
                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                this.knightBase.chances.equipment.FaceCover = 100;
            }
            this.knightBase.chances.mods.mod_nvg = 100;
            this.botConf.equipment["bossknight"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;
            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf.equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;
            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 10;
            this.botConf.equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
        }
        if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            if (randNum >= 2) {
                this.knightBase.chances.equipment.Headwear = 100;
                this.knightBase.chances.equipment.FaceCover = 0;
                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                this.knightBase.chances.equipment.FaceCover = 0;
            }
            else {
                this.knightBase.chances.equipment.FaceCover = 100;
                this.knightBase.chances.equipment.Headwear = 0;
                this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                this.knightBase.chances.equipment.FaceCover = 100;
            }
            this.knightBase.chances.mods.mod_nvg = 100;
            this.botConf.equipment["bossknight"].lightIsActiveDayChancePercent = 100;
            this.botConf.equipment["bossknight"].nvgIsActiveChanceDayPercent = 100;
            this.bigpipeBase.chances.mods.mod_nvg = 100;
            this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
            this.botConf.equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 100;
            this.birdeyeBase.chances.equipment.Headwear = 100;
            this.birdeyeBase.chances.mods.mod_nvg = 100;
            this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
            this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 1;
            this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 20;
            this.botConf.equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 100;
        }
        if (utils_1.RaidInfoTracker.TOD === "day") {
            this.knightBase.chances.mods.mod_nvg = 0;
            this.bigpipeBase.chances.mods.mod_nvg = 0;
            this.birdeyeBase.chances.mods.mod_nvg = 0;
            this.botConf.equipment["bossknight"].nvgIsActiveChanceDayPercent = 0;
            this.botConf.equipment["followerbigpipe"].nvgIsActiveChanceDayPercent = 0;
            this.botConf.equipment["followerbirdeye"].nvgIsActiveChanceDayPercent = 0;
            if (utils_1.RaidInfoTracker.mapType === "urban" || utils_1.RaidInfoTracker.mapType === "cqb") {
                if (randNum >= 3) {
                    this.knightBase.chances.equipment.Headwear = 100;
                    this.knightBase.chances.equipment.FaceCover = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                    this.knightBase.chances.equipment.FaceCover = 0;
                }
                else {
                    this.knightBase.chances.equipment.FaceCover = 100;
                    this.knightBase.chances.equipment.Headwear = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                    this.knightBase.chances.equipment.FaceCover = 100;
                }
                this.botConf.equipment["bossknight"].lightIsActiveDayChancePercent = 100;
                this.bigpipeBase.chances.mods.mod_equipment_000 = 100;
                this.botConf.equipment["followerbigpipe"].lightIsActiveDayChancePercent = 100;
                this.birdeyeBase.chances.equipment.Headwear = 100;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 80;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf.equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            }
            if (utils_1.RaidInfoTracker.mapType === "outdoor") {
                if (randNum >= 4) {
                    this.knightBase.chances.equipment.Headwear = 100;
                    this.knightBase.chances.equipment.FaceCover = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 1;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 0;
                    this.knightBase.chances.equipment.FaceCover = 0;
                }
                else {
                    this.knightBase.chances.equipment.FaceCover = 100;
                    this.knightBase.chances.equipment.Headwear = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["5ac8d6885acfc400180ae7b0"] = 0;
                    this.bigpipeBase.inventory.equipment.Headwear["628e4dd1f477aa12234918aa"] = 1;
                    this.knightBase.chances.equipment.FaceCover = 100;
                }
                this.knightBase.chances.mods.mod_equipment_000 = 0;
                this.knightBase.chances.mods.mod_equipment_001 *= 0.5;
                this.botConf.equipment["bossknight"].lightIsActiveDayChancePercent = 0;
                this.bigpipeBase.chances.mods.mod_equipment_000 = 0;
                this.botConf.equipment["followerbigpipe"].lightIsActiveDayChancePercent = 0;
                this.birdeyeBase.chances.equipment.Headwear = 50;
                this.birdeyeBase.chances.mods.mod_equipment_000 = 0;
                this.birdeyeBase.inventory.equipment.Headwear["5a16bb52fcdbcb001a3b00dc"] = 0;
                this.birdeyeBase.inventory.equipment.Headwear["61bca7cda0eae612383adf57"] = 1;
                this.botConf.equipment["followerbirdeye"].lightIsActiveDayChancePercent = 0;
            }
        }
        if (utils_1.RaidInfoTracker.mapType === "cqb") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO3.inventory.FirstPrimaryWeapon_cqb;
            this.birdeyeBase.inventory.equipment.SecondPrimaryWeapon = {};
        }
        if (utils_1.RaidInfoTracker.mapType === "urban") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO3.inventory.FirstPrimaryWeapon_urban;
        }
        if (utils_1.RaidInfoTracker.mapType === "outdoor") {
            this.birdeyeBase.inventory.equipment.FirstPrimaryWeapon = birdeyeLO.birdeyeLO3.inventory.FirstPrimaryWeapon_outdoor;
        }
        utils_1.BotTierTracker.goonsTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("goonsLoad3 loaded");
        }
    }
    killaLoad1() {
        this.killaBase.inventory.Ammo = killaLO.killaLO1.inventory.Ammo;
        this.killaBase.inventory.equipment = killaLO.killaLO1.inventory.equipment;
        this.killaBase.inventory.items = killaLO.killaLO1.inventory.items;
        this.killaBase.inventory.mods = killaLO.killaLO1.inventory.mods;
        this.killaBase.chances = killaLO.killaLO1.chances;
        this.killaBase.generation = killaLO.killaLO1.generation;
        if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.killaBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["bosskilla"].lightIsActiveDayChancePercent = 100;
        }
        if (utils_1.RaidInfoTracker.mapName === "Interchange" || utils_1.RaidInfoTracker.mapName === "interchange") {
            this.botConf.equipment["bosskilla"].lightIsActiveDayChancePercent = 0;
        }
        utils_1.BotTierTracker.killaTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("killaLoad1 loaded");
        }
    }
    killaLoad2() {
        this.killaBase.inventory.Ammo = killaLO.killaLO2.inventory.Ammo;
        this.killaBase.inventory.equipment = killaLO.killaLO2.inventory.equipment;
        this.killaBase.inventory.items = killaLO.killaLO2.inventory.items;
        this.killaBase.inventory.mods = killaLO.killaLO2.inventory.mods;
        this.killaBase.chances = killaLO.killaLO2.chances;
        this.killaBase.generation = killaLO.killaLO2.generation;
        if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.killaBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["bosskilla"].lightIsActiveDayChancePercent = 50;
        }
        if (utils_1.RaidInfoTracker.mapName === "Interchange" || utils_1.RaidInfoTracker.mapName === "interchange") {
            this.botConf.equipment["bosskilla"].lightIsActiveDayChancePercent = 0;
        }
        utils_1.BotTierTracker.killaTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("killaLoad2 loaded");
        }
    }
    killaLoad3() {
        this.killaBase.inventory.Ammo = killaLO.killaLO3.inventory.Ammo;
        this.killaBase.inventory.equipment = killaLO.killaLO3.inventory.equipment;
        this.killaBase.inventory.items = killaLO.killaLO3.inventory.items;
        this.killaBase.inventory.mods = killaLO.killaLO3.inventory.mods;
        this.killaBase.chances = killaLO.killaLO3.chances;
        this.killaBase.generation = killaLO.killaLO3.generation;
        if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.killaBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["bosskilla"].lightIsActiveDayChancePercent = 25;
        }
        if (utils_1.RaidInfoTracker.mapName === "Interchange" || utils_1.RaidInfoTracker.mapName === "interchange") {
            this.botConf.equipment["bosskilla"].lightIsActiveDayChancePercent = 0;
        }
        utils_1.BotTierTracker.killaTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("killaLoad3 loaded");
        }
    }
    tagillaLoad1() {
        this.tagillaBase.inventory.Ammo = tagillaLO.tagillaLO1.inventory.Ammo;
        this.tagillaBase.inventory.equipment = tagillaLO.tagillaLO1.inventory.equipment;
        this.tagillaBase.inventory.items = tagillaLO.tagillaLO1.inventory.items;
        this.tagillaBase.inventory.mods = tagillaLO.tagillaLO1.inventory.mods;
        this.tagillaBase.chances = tagillaLO.tagillaLO1.chances;
        this.tagillaBase.generation = tagillaLO.tagillaLO1.generation;
        const randnum = this.utils.pickRandNumOneInTen();
        if (randnum >= 8) {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 1;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 0;
            this.tagillaBase.chances.equipment.FaceCover = 0;
            this.tagillaBase.chances.equipment.Headwear = 100;
        }
        else {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 0;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 1;
            this.tagillaBase.chances.equipment.FaceCover = 100;
            this.tagillaBase.chances.equipment.Headwear = 100;
        }
        if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.tagillaBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["bosstagilla"].lightIsActiveDayChancePercent = 100;
        }
        else if (utils_1.RaidInfoTracker.mapName === "Interchange" || utils_1.RaidInfoTracker.mapName === "interchange") {
            this.botConf.equipment["bosstagilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf.equipment["bosstagilla"].lightIsActiveDayChancePercent = 100;
        }
        utils_1.BotTierTracker.tagillaTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("tagillaLoad1 loaded");
        }
    }
    tagillaLoad2() {
        this.tagillaBase.inventory.Ammo = tagillaLO.tagillaLO2.inventory.Ammo;
        this.tagillaBase.inventory.equipment = tagillaLO.tagillaLO2.inventory.equipment;
        this.tagillaBase.inventory.items = tagillaLO.tagillaLO2.inventory.items;
        this.tagillaBase.inventory.mods = tagillaLO.tagillaLO2.inventory.mods;
        this.tagillaBase.chances = tagillaLO.tagillaLO2.chances;
        this.tagillaBase.generation = tagillaLO.tagillaLO2.generation;
        const randnum = this.utils.pickRandNumOneInTen();
        if (randnum >= 5) {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 1;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 0;
            this.tagillaBase.chances.equipment.FaceCover = 0;
        }
        else {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 0;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 1;
        }
        if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.tagillaBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["bosstagilla"].lightIsActiveDayChancePercent = 50;
        }
        else if (utils_1.RaidInfoTracker.mapName === "Interchange" || utils_1.RaidInfoTracker.mapName === "interchange") {
            this.botConf.equipment["bosstagilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf.equipment["bosstagilla"].lightIsActiveDayChancePercent = 100;
        }
        utils_1.BotTierTracker.tagillaTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("tagillaLoad2 loaded");
        }
    }
    tagillaLoad3() {
        this.tagillaBase.inventory.Ammo = tagillaLO.tagillaLO3.inventory.Ammo;
        this.tagillaBase.inventory.equipment = tagillaLO.tagillaLO3.inventory.equipment;
        this.tagillaBase.inventory.items = tagillaLO.tagillaLO3.inventory.items;
        this.tagillaBase.inventory.mods = tagillaLO.tagillaLO3.inventory.mods;
        this.tagillaBase.chances = tagillaLO.tagillaLO3.chances;
        this.tagillaBase.generation = tagillaLO.tagillaLO3.generation;
        const randnum = this.utils.pickRandNumOneInTen();
        if (randnum >= 3) {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 1;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 0;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 0;
            this.tagillaBase.chances.equipment.FaceCover = 0;
        }
        else {
            this.tagillaBase.inventory.equipment.Headwear["5f60c74e3b85f6263c145586"] = 0;
            this.tagillaBase.inventory.equipment.Headwear["60a7acf20c5cb24b01346648"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad2a2198820d95707a2e"] = 1;
            this.tagillaBase.inventory.equipment.FaceCover["60a7ad3a0c5cb24b0134664a"] = 1;
        }
        if (utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.tagillaBase.chances.mods.mod_flashlight = 60;
            this.botConf.equipment["bosstagilla"].lightIsActiveDayChancePercent = 25;
        }
        else if (utils_1.RaidInfoTracker.mapName === "Interchange" || utils_1.RaidInfoTracker.mapName === "interchange") {
            this.botConf.equipment["bosstagilla"].lightIsActiveDayChancePercent = 0;
        }
        else {
            this.botConf.equipment["bosstagilla"].lightIsActiveDayChancePercent = 100;
        }
        utils_1.BotTierTracker.tagillaTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("tagillaLoad3 loaded");
        }
    }
    sanitarLoad1() {
        this.saniBase.inventory.Ammo = saniLO.sanitarLO1.inventory.Ammo;
        this.saniBase.inventory.equipment = saniLO.sanitarLO1.inventory.equipment;
        this.saniBase.inventory.items = saniLO.sanitarLO1.inventory.items;
        this.saniBase.inventory.mods = saniLO.sanitarLO1.inventory.mods;
        this.saniBase.chances = saniLO.sanitarLO1.chances;
        this.saniBase.generation = saniLO.sanitarLO1.generation;
        this.saniFollowerBase.inventory.Ammo = saniFollowerLO.sanitarfollowerLO1.inventory.Ammo;
        this.saniFollowerBase.inventory.equipment = saniFollowerLO.sanitarfollowerLO1.inventory.equipment;
        this.saniFollowerBase.inventory.items = saniFollowerLO.sanitarfollowerLO1.inventory.items;
        this.saniFollowerBase.inventory.mods = saniFollowerLO.sanitarfollowerLO1.inventory.mods;
        this.saniFollowerBase.chances = saniFollowerLO.sanitarfollowerLO1.chances;
        this.saniFollowerBase.generation = saniFollowerLO.sanitarfollowerLO1.generation;
        if (utils_1.RaidInfoTracker.TOD === "night" || utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.botConf.equipment["bosssanitar"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["bosssanitar"].laserIsActiveChancePercent = 0;
            this.botConf.equipment["followersanitar"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["followersanitar"].laserIsActiveChancePercent = 0;
        }
        else {
            this.botConf.equipment["bosssanitar"].lightIsActiveDayChancePercent = 25;
            this.botConf.equipment["bosssanitar"].laserIsActiveChancePercent = 25;
            this.botConf.equipment["followersanitar"].lightIsActiveDayChancePercent = 25;
            this.botConf.equipment["followersanitar"].laserIsActiveChancePercent = 25;
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["bosssanitar"].lightIsActiveDayChancePercent = 90;
                this.botConf.equipment["bosssanitar"].laserIsActiveChancePercent = 90;
                this.botConf.equipment["followersanitar"].lightIsActiveDayChancePercent = 90;
                this.botConf.equipment["followersanitar"].laserIsActiveChancePercent = 90;
            }
        }
        this.botConf.equipment["followersanitar"].faceShieldIsActiveChancePercent = 100;
        utils_1.BotTierTracker.sanitarTier = 1;
        if (this.modConf.logEverything == true) {
            this.logger.info("saintarLoad1 loaded");
        }
    }
    sanitarLoad2() {
        this.saniBase.inventory.Ammo = saniLO.sanitarLO2.inventory.Ammo;
        this.saniBase.inventory.equipment = saniLO.sanitarLO2.inventory.equipment;
        this.saniBase.inventory.items = saniLO.sanitarLO2.inventory.items;
        this.saniBase.inventory.mods = saniLO.sanitarLO2.inventory.mods;
        this.saniBase.chances = saniLO.sanitarLO2.chances;
        this.saniBase.generation = saniLO.sanitarLO2.generation;
        this.saniFollowerBase.inventory.Ammo = saniFollowerLO.sanitarfollowerLO2.inventory.Ammo;
        this.saniFollowerBase.inventory.equipment = saniFollowerLO.sanitarfollowerLO2.inventory.equipment;
        this.saniFollowerBase.inventory.items = saniFollowerLO.sanitarfollowerLO2.inventory.items;
        this.saniFollowerBase.inventory.mods = saniFollowerLO.sanitarfollowerLO2.inventory.mods;
        this.saniFollowerBase.chances = saniFollowerLO.sanitarfollowerLO2.chances;
        this.saniFollowerBase.generation = saniFollowerLO.sanitarfollowerLO2.generation;
        if (utils_1.RaidInfoTracker.TOD === "night" || utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.botConf.equipment["bosssanitar"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["bosssanitar"].laserIsActiveChancePercent = 0;
            this.botConf.equipment["followersanitar"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["followersanitar"].laserIsActiveChancePercent = 0;
        }
        else {
            this.botConf.equipment["bosssanitar"].lightIsActiveDayChancePercent = 25;
            this.botConf.equipment["bosssanitar"].laserIsActiveChancePercent = 25;
            this.botConf.equipment["followersanitar"].lightIsActiveDayChancePercent = 25;
            this.botConf.equipment["followersanitar"].laserIsActiveChancePercent = 25;
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["bosssanitar"].lightIsActiveDayChancePercent = 90;
                this.botConf.equipment["bosssanitar"].laserIsActiveChancePercent = 90;
                this.botConf.equipment["followersanitar"].lightIsActiveDayChancePercent = 90;
                this.botConf.equipment["followersanitar"].laserIsActiveChancePercent = 90;
            }
        }
        this.botConf.equipment["followersanitar"].faceShieldIsActiveChancePercent = 100;
        utils_1.BotTierTracker.sanitarTier = 2;
        if (this.modConf.logEverything == true) {
            this.logger.info("saintarLoad2 loaded");
        }
    }
    sanitarLoad3() {
        this.saniBase.inventory.Ammo = saniLO.sanitarLO3.inventory.Ammo;
        this.saniBase.inventory.equipment = saniLO.sanitarLO3.inventory.equipment;
        this.saniBase.inventory.items = saniLO.sanitarLO3.inventory.items;
        this.saniBase.inventory.mods = saniLO.sanitarLO3.inventory.mods;
        this.saniBase.chances = saniLO.sanitarLO3.chances;
        this.saniBase.generation = saniLO.sanitarLO3.generation;
        this.saniFollowerBase.inventory.Ammo = saniFollowerLO.sanitarfollowerLO3.inventory.Ammo;
        this.saniFollowerBase.inventory.equipment = saniFollowerLO.sanitarfollowerLO3.inventory.equipment;
        this.saniFollowerBase.inventory.items = saniFollowerLO.sanitarfollowerLO3.inventory.items;
        this.saniFollowerBase.inventory.mods = saniFollowerLO.sanitarfollowerLO3.inventory.mods;
        this.saniFollowerBase.chances = saniFollowerLO.sanitarfollowerLO3.chances;
        this.saniFollowerBase.generation = saniFollowerLO.sanitarfollowerLO3.generation;
        if (utils_1.RaidInfoTracker.TOD === "night" || utils_1.RaidInfoTracker.mapName === "factory4_night") {
            this.botConf.equipment["bosssanitar"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["bosssanitar"].laserIsActiveChancePercent = 0;
            this.botConf.equipment["followersanitar"].lightIsActiveDayChancePercent = 0;
            this.botConf.equipment["followersanitar"].laserIsActiveChancePercent = 0;
        }
        else {
            this.botConf.equipment["bosssanitar"].lightIsActiveDayChancePercent = 25;
            this.botConf.equipment["bosssanitar"].laserIsActiveChancePercent = 25;
            this.botConf.equipment["followersanitar"].lightIsActiveDayChancePercent = 25;
            this.botConf.equipment["followersanitar"].laserIsActiveChancePercent = 25;
            if (utils_1.RaidInfoTracker.mapType === "cqb") {
                this.botConf.equipment["bosssanitar"].lightIsActiveDayChancePercent = 90;
                this.botConf.equipment["bosssanitar"].laserIsActiveChancePercent = 90;
                this.botConf.equipment["followersanitar"].lightIsActiveDayChancePercent = 90;
                this.botConf.equipment["followersanitar"].laserIsActiveChancePercent = 90;
            }
        }
        this.botConf.equipment["followersanitar"].faceShieldIsActiveChancePercent = 100;
        utils_1.BotTierTracker.sanitarTier = 3;
        if (this.modConf.logEverything == true) {
            this.logger.info("sanitarLoad3 loaded");
        }
    }
    forceBossItems() {
        this.tagillaBase.inventory.equipment.Headwear = { "60a7acf20c5cb24b01346648": 1 };
        this.tagillaBase.inventory.equipment.FaceCover = { "60a7ad2a2198820d95707a2e": 1, "60a7ad3a0c5cb24b0134664a": 1 };
        this.tagillaBase.chances.equipment.FaceCover = 100;
        this.tagillaBase.chances.equipment.Headwear = 100;
        this.bigpipeBase.inventory.equipment.Headwear = { "628e4dd1f477aa12234918aa": 1 };
        this.bigpipeBase.inventory.equipment.FaceCover = { "62a61bbf8ec41a51b34758d2": 1 };
        this.bigpipeBase.chances.equipment.FaceCover = 100;
        this.knightBase.inventory.equipment.Headwear = {};
        this.knightBase.chances.equipment.Headwear = 0;
        this.knightBase.chances.equipment.FaceCover = 100;
        this.reshallaBase.inventory.equipment.SecondPrimaryWeapon = { "5b3b713c5acfc4330140bd8d": 1 };
    }
}
exports.BotLoader = BotLoader;
