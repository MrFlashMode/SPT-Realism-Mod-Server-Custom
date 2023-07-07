"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TieredFlea = exports.FleamarketConfig = exports.FleamarketGlobal = void 0;
const enums_1 = require("../utils/enums");
const custFleaConfig = require("../../db/traders/ragfair/flea_config.json");
class FleamarketGlobal {
    constructor(logger, tables, modConfig) {
        this.logger = logger;
        this.tables = tables;
        this.modConfig = modConfig;
        this.globalDB = this.tables.globals.config;
    }
    loadFleaGlobal() {
        if (this.modConfig.flea_changes == true) {
            this.globalDB.RagFair.minUserLevel = 1;
        }
    }
}
exports.FleamarketGlobal = FleamarketGlobal;
class FleamarketConfig {
    constructor(logger, fleaConf, modConfig, custFleaBlacklist) {
        this.logger = logger;
        this.fleaConf = fleaConf;
        this.modConfig = modConfig;
        this.custFleaBlacklist = custFleaBlacklist;
    }
    loadFleaConfig() {
        if (this.modConfig.flea_changes == true) {
            this.fleaConf.dynamic.condition = custFleaConfig.condition;
            this.fleaConf.dynamic.blacklist.custom = this.custFleaBlacklist.blacklist.custom;
            this.fleaConf.dynamic.barter.enable = false;
            this.fleaConf.sell.reputation.gain = 0.0000007;
            this.fleaConf.sell.reputation.loss = 0.0000007;
            this.fleaConf.dynamic.price.min = 1.3;
            this.fleaConf.dynamic.price.max = 2;
            this.fleaConf.dynamic.presetPrice.min = 1.3;
            this.fleaConf.dynamic.presetPrice.max = 2;
            this.fleaConf.dynamic.endTimeSeconds.min = 600;
            this.fleaConf.dynamic.endTimeSeconds.max = 3600;
            this.fleaConf.dynamic.nonStackableCount.min = 1;
            this.fleaConf.dynamic.nonStackableCount.max = 2;
            this.fleaConf.dynamic.stackablePercent.min = 15;
            this.fleaConf.dynamic.stackablePercent.max = 100;
            if (this.modConfig.logEverything == true) {
                this.logger.info("Flea Changes Enabled");
            }
        }
        if (this.modConfig.logEverything == true) {
            this.logger.info("Fleamarket loaded");
        }
    }
}
exports.FleamarketConfig = FleamarketConfig;
class TieredFlea {
    constructor(fleaConf) {
        this.fleaConf = fleaConf;
    }
    fleaHelper(fetchTier, ragfairOfferGen, container) {
        const offers = container.resolve("RagfairOfferService").getOffers();
        const traders = container.resolve("RagfairServer").getUpdateableTraders();
        for (let o in offers) {
            container.resolve("RagfairOfferService").removeOfferById(offers[o]._id);
        }
        fetchTier();
        ragfairOfferGen.generateDynamicOffers();
        for (let traderID in traders) {
            ragfairOfferGen.generateFleaOffersForTrader(traders[traderID]);
        }
    }
    updateFlea(logger, ragfairOfferGen, container, arrays, level) {
        if (level === undefined) {
            this.fleaHelper(this.flea0.bind(this), ragfairOfferGen, container);
            logger.info("Realism Mod: Fleamarket Tier Set To Default  (tier 0)");
        }
        if (level !== undefined) {
            if (level >= 0 && level < 5) {
                this.fleaHelper(this.flea0.bind(this), ragfairOfferGen, container);
                logger.info("Realism mod: Fleamarket Locked At Tier 0");
            }
            if (level >= 5 && level < 10) {
                this.fleaHelper(this.flea1.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 1 Unlocked");
            }
            if (level >= 10 && level < 15) {
                this.fleaHelper(this.flea2.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 2 Unlocked");
            }
            if (level >= 15 && level < 20) {
                this.fleaHelper(this.flea3.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 3 Unlocked");
            }
            if (level >= 20 && level < 25) {
                this.fleaHelper(this.flea4.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 4 Unlocked");
            }
            if (level >= 25 && level < 30) {
                this.fleaHelper(this.flea5.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 5 Unlocked");
            }
            if (level >= 30 && level < 35) {
                this.fleaHelper(this.flea6.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 6 Unlocked");
            }
            if (level >= 35 && level < 40) {
                this.fleaHelper(this.flea7.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 7 Unlocked");
            }
            if (level >= 40 && level < 45) {
                this.fleaHelper(this.flea8.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 8 Unlocked");
            }
            if (level >= 45) {
                this.fleaHelper(this.flea9.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 9 Unlocked");
            }
        }
    }
    flea0() {
		this.fleaConf.dynamic.offerItemCount.min = 0;
		this.fleaConf.dynamic.offerItemCount.max = 1;
    }
    flea1() {
		this.fleaConf.dynamic.offerItemCount.min = 0;
		this.fleaConf.dynamic.offerItemCount.max = 2;
    }
    flea2() {
		this.fleaConf.dynamic.offerItemCount.min = 0;
		this.fleaConf.dynamic.offerItemCount.max = 3;
    }
    flea3() {
		this.fleaConf.dynamic.offerItemCount.min = 0;
		this.fleaConf.dynamic.offerItemCount.max = 4;
    }
    flea4() {
		this.fleaConf.dynamic.offerItemCount.min = 0;
		this.fleaConf.dynamic.offerItemCount.max = 5;
    }
    flea5() {
		this.fleaConf.dynamic.offerItemCount.min = 0;
		this.fleaConf.dynamic.offerItemCount.max = 6;
    }
    flea6() {
		this.fleaConf.dynamic.offerItemCount.min = 0;
		this.fleaConf.dynamic.offerItemCount.max = 7;
    }
    flea7() {
		this.fleaConf.dynamic.offerItemCount.min = 0;
		this.fleaConf.dynamic.offerItemCount.max = 8;
    }
    flea8() {
		this.fleaConf.dynamic.offerItemCount.min = 0;
		this.fleaConf.dynamic.offerItemCount.max = 9;
    }
    flea9() {
		this.fleaConf.dynamic.offerItemCount.min = 0;
		this.fleaConf.dynamic.offerItemCount.max = 10;
    }
}
exports.TieredFlea = TieredFlea;
