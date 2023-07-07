"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meds = void 0;
class Meds {
    constructor(logger, tables, modConf, medItems, buffs) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.medItems = medItems;
        this.buffs = buffs;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
        this.buffDB = this.globalDB.Health.Effects.Stimulator.Buffs;
    }
    loadRequireMeds() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            ///Pain Meds//
            //Analgin
            if (serverItem._id === "544fb37f4bdc2dee738b4567") {
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "pills");
            }
            //Ibuprofen
            if (serverItem._id === "5af0548586f7743a532b7e99") {
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "pills");
            }
            ///Medicines///
            //Augmentin
            if (serverItem._id === "590c695186f7741e566b64a2") {
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "pills");
            }
            ///Smeary stuff///
            //Vaseline
            if (serverItem._id === "5755383e24597772cb798966") {
                //serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                //serverItem._props.ConflictingItems.splice(1, 0, "vas");
            }
            //GoldenStar
            if (serverItem._id === "5751a89d24597722aa0e8db0") {
                //serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                //serverItem._props.ConflictingItems.splice(1, 0, "vas");
            }
            ///Surgery/
            //CMS
            if (serverItem._id === "5d02778e86f774203e7dedbe") {
                //serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                //serverItem._props.ConflictingItems.splice(1, 0, "surg");
            }
            //Surv12
            if (serverItem._id === "5d02797c86f774203f38e30a") {
                //serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                //serverItem._props.ConflictingItems.splice(1, 0, "surg");
            }
        }
		if (this.modConf.logEverything == true) {
            this.logger.info("Require Meds loaded");
        }
	}
    loadCustomMeds() {
		//Adjust Thermal stim to compensate for lower base temp
        this.globalDB.Health.Effects.Stimulator.Buffs.Buffs_BodyTemperature["Value"] = -3;
        for (const buffName in this.buffs) {
            this.buffDB[buffName] = this.buffs[buffName];
        }
        for (let i in this.itemDB) {
			let serverItem = this.itemDB[i];
            ///Pain Meds//
            //Analgin
            if (serverItem._id === "544fb37f4bdc2dee738b4567") {
				serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["analgin"].effects_health;
                serverItem._props.effects_damage = this.medItems["analgin"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["analgin"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["analgin"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["analgin"].medUseTime;
            }
            //Ibuprofen
            if (serverItem._id === "5af0548586f7743a532b7e99") {
				serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["ibuprofen"].effects_health;
                serverItem._props.effects_damage = this.medItems["ibuprofen"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["ibuprofen"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["ibuprofen"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["ibuprofen"].medUseTime;
            }
            //Morphine
            if (serverItem._id === "544fb3f34bdc2d03748b456a") {
				serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["morphine"].effects_health;
                serverItem._props.effects_damage = this.medItems["morphine"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["morphine"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["morphine"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["morphine"].medUseTime;
            }
            ///Medicines///
            //Augmentin
            if (serverItem._id === "590c695186f7741e566b64a2") {
				serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["augmentin"].effects_health;
                serverItem._props.effects_damage = this.medItems["augmentin"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["augmentin"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["augmentin"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["augmentin"].medUseTime;
            }
            ///Bandages///
            //Aeseptic Bandage
            if (serverItem._id === "544fb25a4bdc2dfb738b4567") {
                serverItem._props.effects_health = this.medItems["aeseptic"].effects_health;
                serverItem._props.effects_damage = this.medItems["aeseptic"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["aeseptic"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["aeseptic"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["aeseptic"].medUseTime;
            }
            //Army Bandage
            if (serverItem._id === "5751a25924597722c463c472") {
				serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["army"].effects_health;
                serverItem._props.effects_damage = this.medItems["army"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["army"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["army"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["army"].medUseTime;
            }
            ///Tourniquets///
            //CAT
            if (serverItem._id === "60098af40accd37ef2175f27") {
				serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["CAT"].effects_health;
                serverItem._props.effects_damage = this.medItems["CAT"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["CAT"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["CAT"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["CAT"].medUseTime;
            }
            //Esmarch
            if (serverItem._id === "5e831507ea0a7c419c2f9bd9") {
				serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["esmarch"].effects_health;
                serverItem._props.effects_damage = this.medItems["esmarch"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["esmarch"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["esmarch"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["esmarch"].medUseTime;
            }
            //Calok
            if (serverItem._id === "5e8488fa988a8701445df1e4") {
				serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["calok"].effects_health;
                serverItem._props.effects_damage = this.medItems["calok"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["calok"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["calok"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["calok"].medUseTime;
            }
            ///Splints///
            //Immobilizing Splint
            if (serverItem._id === "544fb3364bdc2d34748b456a") {
				serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["immobi"].effects_health;
                serverItem._props.effects_damage = this.medItems["immobi"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["immobi"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["immobi"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["immobi"].medUseTime;
            }
            //Alu Splint
            if (serverItem._id === "5af0454c86f7746bf20992e8") {
				serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["alu"].effects_health;
                serverItem._props.effects_damage = this.medItems["alu"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["alu"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["alu"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["alu"].medUseTime;
            }
            ///Medkits///
            //AI-2
            if (serverItem._id === "5755356824597772cb798962") {
				//serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["AI-2"].effects_health;
                serverItem._props.effects_damage = this.medItems["AI-2"].effects_damage;
				//serverItem._props.AnimationVariantsNumber = this.medItems["AI-2"].AnimationVariantsNumber;
                //serverItem._props.StimulatorBuffs = this.medItems["AI-2"].StimulatorBuffs;
				serverItem._props.MaxHpResource = this.medItems["AI-2"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["AI-2"].medUseTime;
            }
            //CAR
            if (serverItem._id === "590c661e86f7741e566b646a") {
				//serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["CAR"].effects_health;
                serverItem._props.effects_damage = this.medItems["CAR"].effects_damage;
				//serverItem._props.AnimationVariantsNumber = this.medItems["CAR"].AnimationVariantsNumber;
                //serverItem._props.StimulatorBuffs = this.medItems["CAR"].StimulatorBuffs;
				serverItem._props.MaxHpResource = this.medItems["CAR"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["CAR"].medUseTime;
            }
            //Salewa
            if (serverItem._id === "544fb45d4bdc2dee738b4568") {
				//serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["salewa"].effects_health;
                serverItem._props.effects_damage = this.medItems["salewa"].effects_damage;
				//serverItem._props.AnimationVariantsNumber = this.medItems["salewa"].AnimationVariantsNumber;
                //serverItem._props.StimulatorBuffs = this.medItems["salewa"].StimulatorBuffs;
				serverItem._props.MaxHpResource = this.medItems["salewa"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["salewa"].medUseTime;
            }
            //IFAK
            if (serverItem._id === "590c678286f77426c9660122") {
				//serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["IFAK"].effects_health;
                serverItem._props.effects_damage = this.medItems["IFAK"].effects_damage;
				//serverItem._props.AnimationVariantsNumber = this.medItems["IFAK"].AnimationVariantsNumber;
                //serverItem._props.StimulatorBuffs = this.medItems["IFAK"].StimulatorBuffs;
				serverItem._props.MaxHpResource = this.medItems["IFAK"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["IFAK"].medUseTime;
            }
            //AFAK
            if (serverItem._id === "60098ad7c2240c0fe85c570a") {
				//serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["AFAK"].effects_health;
                serverItem._props.effects_damage = this.medItems["AFAK"].effects_damage;
				//serverItem._props.AnimationVariantsNumber = this.medItems["AFAK"].AnimationVariantsNumber;
                //serverItem._props.StimulatorBuffs = this.medItems["AFAK"].StimulatorBuffs;
				serverItem._props.MaxHpResource = this.medItems["AFAK"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["AFAK"].medUseTime;
            }
            //Grizzly
            if (serverItem._id === "590c657e86f77412b013051d") {
				//serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["grizzly"].effects_health;
                serverItem._props.effects_damage = this.medItems["grizzly"].effects_damage;
				//serverItem._props.AnimationVariantsNumber = this.medItems["grizzly"].AnimationVariantsNumber;
                //serverItem._props.StimulatorBuffs = this.medItems["grizzly"].StimulatorBuffs;
				serverItem._props.MaxHpResource = this.medItems["grizzly"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["grizzly"].medUseTime;
            }
            ///Smeary stuff///
            //Vaseline
            if (serverItem._id === "5755383e24597772cb798966") {
				serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["vaseline"].effects_health;
                serverItem._props.effects_damage = this.medItems["vaseline"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["vaseline"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["vaseline"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["vaseline"].medUseTime;
            }
            //GoldenStar
            if (serverItem._id === "5751a89d24597722aa0e8db0") {
				serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["golden"].effects_health;
                serverItem._props.effects_damage = this.medItems["golden"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["golden"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["golden"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["golden"].medUseTime;
            }
            ///Surgery/
            //CMS
            if (serverItem._id === "5d02778e86f774203e7dedbe") {
                serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["cms"].effects_health;
                serverItem._props.effects_damage = this.medItems["cms"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["cms"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["cms"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["cms"].medUseTime;
            }
            //Surv12
            if (serverItem._id === "5d02797c86f774203f38e30a") {
                serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.effects_health = this.medItems["surv12"].effects_health;
                serverItem._props.effects_damage = this.medItems["surv12"].effects_damage;
                serverItem._props.StimulatorBuffs = this.medItems["surv12"].StimulatorBuffs;
                serverItem._props.MaxHpResource = this.medItems["surv12"].MaxHpResource;
				serverItem._props.medUseTime = this.medItems["surv12"].medUseTime;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Custom Meds loaded");
        }
    }
}
exports.Meds = Meds;
