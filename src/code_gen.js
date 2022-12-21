"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGen = void 0;
const enums_1 = require("./enums");
// const magazineJSON = require("../db/bots/loadouts/common/magazines.json");
const FaceShieldTemplates = require("../db/templates/armor/FaceShieldTemplates.json");
const armorComponentsTemplates = require("../db/templates/armor/armorComponentsTemplates.json");
const armorChestrigTemplates = require("../db/templates/armor/armorChestrigTemplates.json");
const helmetTemplates = require("../db/templates/armor/helmetTemplates.json");
const armorVestsTemplates = require("../db/templates/armor/armorVestsTemplates.json");
const ammoTemplates = require("../db/templates/ammo/ammoTemplates.json");
const MuzzleDeviceTemplates = require("../db/templates/attatchments/MuzzleDeviceTemplates.json");
const BarrelTemplates = require("../db/templates/attatchments/BarrelTemplates.json");
const MountTemplates = require("../db/templates/attatchments/MountTemplates.json");
const ReceiverTemplates = require("../db/templates/attatchments/ReceiverTemplates.json");
const StockTemplates = require("../db/templates/attatchments/StockTemplates.json");
const ChargingHandleTemplates = require("../db/templates/attatchments/ChargingHandleTemplates.json");
const ScopeTemplates = require("../db/templates/attatchments/ScopeTemplates.json");
const IronSightTemplates = require("../db/templates/attatchments/IronSightTemplates.json");
const MagazineTemplates = require("../db/templates/attatchments/MagazineTemplates.json");
const AuxiliaryModTemplates = require("../db/templates/attatchments/AuxiliaryModTemplates.json");
const ForegripTemplates = require("../db/templates/attatchments/ForegripTemplates.json");
const PistolGripTemplates = require("../db/templates/attatchments/PistolGripTemplates.json");
const GasblockTemplates = require("../db/templates/attatchments/GasblockTemplates.json");
const HandguardTemplates = require("../db/templates/attatchments/HandguardTemplates.json");
const FlashlightLaserTemplates = require("../db/templates/attatchments/FlashlightLaserTemplates.json");
const AssaultRifleTemplates = require("../db/templates/weapons/AssaultRifleTemplates.json");
const AssaultCarbineTemplates = require("../db/templates/weapons/AssaultCarbineTemplates.json");
const MachinegunTemplates = require("../db/templates/weapons/MachinegunTemplates.json");
const MarksmanRifleTemplates = require("../db/templates/weapons/MarksmanRifleTemplates.json");
const PistolTemplates = require("../db/templates/weapons/PistolTemplates.json");
const ShotgunTemplates = require("../db/templates/weapons/ShotgunTemplates.json");
const SMGTemplates = require("../db/templates/weapons/SMGTemplates.json");
const SniperRifleTemplates = require("../db/templates/weapons/SniperRifleTemplates.json");
const SpecialWeaponTemplates = require("../db/templates/weapons/SpecialWeaponTemplates.json");
const GrenadeLauncherTemplates = require("../db/templates/weapons/GrenadeLauncherTemplates.json");
class CodeGen {
    constructor(logger, tables, modConf, helper, arrays) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.helper = helper;
        this.arrays = arrays;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
    }
    ammoTemplatesCodeGen() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._parent === enums_1.ParentClasses.AMMO || enums_1.ParentClasses.AMMO_BOX) {
                this.itemWriteToFile(ammoTemplates, "ammoTemplates", i, serverItem, "ammo", this.assignJSONToAmmo);
            }
        }
    }
    armorTemplatesCodeGen() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if ((serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT || serverItem._parent === enums_1.ParentClasses.HEADWEAR) && serverItem._props.HasHinge == true) {
                this.itemWriteToFile(FaceShieldTemplates, "FaceShieldTemplates", i, serverItem, "armor", this.assignJSONToArmor);
            }
            if (serverItem._parent === enums_1.ParentClasses.CHESTRIG && serverItem._props.armorClass > 0) {
                this.itemWriteToFile(armorChestrigTemplates, "armorChestrigTemplates", i, serverItem, "armor", this.assignJSONToArmor);
            }
            if (serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT && serverItem._props.armorClass > 0) {
                this.itemWriteToFile(armorComponentsTemplates, "armorComponentsTemplates", i, serverItem, "armor", this.assignJSONToArmor);
            }
            if (serverItem._parent === enums_1.ParentClasses.HEADWEAR && serverItem._props.armorClass > 0) {
                this.itemWriteToFile(helmetTemplates, "helmetTemplates", i, serverItem, "armor", this.assignJSONToArmor);
            }
            if (serverItem._parent === enums_1.ParentClasses.ARMORVEST && serverItem._props.armorClass > 0) {
                this.itemWriteToFile(armorVestsTemplates, "armorVestsTemplates", i, serverItem, "armor", this.assignJSONToArmor);
            }
        }
    }
    weapTemplatesCodeGen() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.RecolDispersion) {
                if (serverItem._props.weapClass === "assaultCarbine") {
                    this.itemWriteToFile(AssaultCarbineTemplates, "AssaultCarbineTemplates", i, serverItem, "weapons", this.assignJSONToWeap);
                }
                if (serverItem._props.weapClass === "assaultRifle") {
                    this.itemWriteToFile(AssaultRifleTemplates, "AssaultRifleTemplates", i, serverItem, "weapons", this.assignJSONToWeap);
                }
                if (serverItem._props.weapClass === "smg") {
                    this.itemWriteToFile(SMGTemplates, "SMGTemplates", i, serverItem, "weapons", this.assignJSONToWeap);
                }
                if (serverItem._props.weapClass === "machinegun") {
                    this.itemWriteToFile(MachinegunTemplates, "MachinegunTemplates", i, serverItem, "weapons", this.assignJSONToWeap);
                }
                if (serverItem._props.weapClass === "marksmanRifle") {
                    this.itemWriteToFile(MarksmanRifleTemplates, "MarksmanRifleTemplates", i, serverItem, "weapons", this.assignJSONToWeap);
                }
                if (serverItem._props.weapClass === "sniperRifle") {
                    this.itemWriteToFile(SniperRifleTemplates, "SniperRifleTemplates", i, serverItem, "weapons", this.assignJSONToWeap);
                }
                if (serverItem._props.weapClass === "pistol") {
                    this.itemWriteToFile(PistolTemplates, "PistolTemplates", i, serverItem, "weapons", this.assignJSONToWeap);
                }
                if (serverItem._props.weapClass === "shotgun") {
                    this.itemWriteToFile(ShotgunTemplates, "ShotgunTemplates", i, serverItem, "weapons", this.assignJSONToWeap);
                }
                if (serverItem._props.weapClass === "specialWeapon") {
                    this.itemWriteToFile(SpecialWeaponTemplates, "SpecialWeaponTemplates", i, serverItem, "weapons", this.assignJSONToWeap);
                }
                if (serverItem._props.weapClass === "grenadeLauncher") {
                    this.itemWriteToFile(GrenadeLauncherTemplates, "GrenadeLauncherTemplates", i, serverItem, "weapons", this.assignJSONToWeap);
                }
            }
        }
    }
    attTemplatesCodeGen() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false) {
                for (let value in this.arrays.modTypes) {
                    if (serverItem._parent === this.arrays.modTypes[value]) {
                        if (this.arrays.modTypes[value] === "550aa4bf4bdc2dd6348b456b" ||
                            this.arrays.modTypes[value] === "550aa4dd4bdc2dc9348b4569" ||
                            this.arrays.modTypes[value] === "550aa4cd4bdc2dd8348b456c") {
                            let id = "muzzle";
                            this.itemWriteToFile(MuzzleDeviceTemplates, "MuzzleDeviceTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "555ef6e44bdc2de9068b457e") {
                            let id = "barrel";
                            this.itemWriteToFile(BarrelTemplates, "BarrelTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818b224bdc2dde698b456f") {
                            let id = "mount";
                            this.itemWriteToFile(MountTemplates, "MountTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818a304bdc2db5418b457d") {
                            let id = "receiver";
                            this.itemWriteToFile(ReceiverTemplates, "ReceiverTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818a594bdc2db9688b456a") {
                            let id = "stock";
                            this.itemWriteToFile(StockTemplates, "StockTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818a6f4bdc2db9688b456b") {
                            let id = "charging";
                            this.itemWriteToFile(ChargingHandleTemplates, "ChargingHandleTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818acf4bdc2dde698b456b" ||
                            this.arrays.modTypes[value] === "55818ad54bdc2ddc698b4569" ||
                            this.arrays.modTypes[value] === "55818add4bdc2d5b648b456f" ||
                            this.arrays.modTypes[value] === "55818ae44bdc2dde698b456c" ||
                            this.arrays.modTypes[value] === "55818aeb4bdc2ddc698b456a") {
                            let id = "scope";
                            this.itemWriteToFile(ScopeTemplates, "ScopeTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818ac54bdc2d5b648b456e") {
                            let id = "irons";
                            this.itemWriteToFile(IronSightTemplates, "IronSightTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "5448bc234bdc2d3c308b4569" ||
                            this.arrays.modTypes[value] === "610720f290b75a49ff2e5e25" ||
                            this.arrays.modTypes[value] === "627a137bf21bc425b06ab944") {
                            let id = "magazine";
                            this.itemWriteToFile(MagazineTemplates, "MagazineTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "5a74651486f7744e73386dd1" ||
                            this.arrays.modTypes[value] === "55818afb4bdc2dde698b456d") {
                            let id = "aux";
                            this.itemWriteToFile(AuxiliaryModTemplates, "AuxiliaryModTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818af64bdc2d5b648b4570") {
                            let id = "foregrip";
                            this.itemWriteToFile(ForegripTemplates, "ForegripTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818a684bdc2ddd698b456d") {
                            let id = "pistolgrip";
                            this.itemWriteToFile(PistolGripTemplates, "PistolGripTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "56ea9461d2720b67698b456f") {
                            let id = "gasblock";
                            this.itemWriteToFile(GasblockTemplates, "GasblockTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818a104bdc2db9688b4569") {
                            let id = "handguard";
                            this.itemWriteToFile(HandguardTemplates, "HandguardTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818b084bdc2d5b648b4571" ||
                            this.arrays.modTypes[value] === "55818b164bdc2ddc698b456c") {
                            let id = "flashlight";
                            this.itemWriteToFile(FlashlightLaserTemplates, "FlashlightLaserTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                    }
                }
            }
        }
    }
    itemWriteToFile(filePathObj, fileStr, index, serverItem, folderStr, funJsonAssign, id) {
        let fileItem = filePathObj[index];
        filePathObj[index] = funJsonAssign(serverItem, fileItem, id);
        this.helper.saveToJSONFile(filePathObj, `db/templates/${folderStr}/${fileStr}.json`);
    }
    assignJSONToAmmo(serverItem, fileItem) {
        if (fileItem) {
            fileItem.loyaltyLevel = 2;
            fileItem;
            return fileItem;
        }
        let ItemID = serverItem._id;
        let Name = serverItem._name;
        let LoyaltyLevel = 2;
        let item = {
            ItemID,
            Name,
            LoyaltyLevel
        };
        return item;
    }
    assignJSONToArmor(serverItem, fileItem) {
        if (fileItem) {
            fileItem;
            return fileItem;
        }
        let ItemID = serverItem._id;
        let Name = serverItem._name;
        let AllowADS = true;
        let LoyaltyLevel = 2;
        let item = {
            ItemID,
            Name,
            AllowADS,
            LoyaltyLevel
        };
        return item;
    }
    assignJSONToWeap(serverItem, fileItem) {
        // new items properties can be added, and  property values can be replaced, by delcaring them in this if statement
        if (fileItem) {
            // fileItem.HeatFactor = serverItem._props.HeatFactor; You need to give it a value. If you set it to the server item's propety value, the new property will only appear if the server mod has that property
            fileItem;
            return fileItem;
        }
        let ItemID = serverItem._id;
        let Name = serverItem._name;
        let WeapType = "";
        let OperationType = "";
        let WeapAccuracy = 0;
        let BaseTorque = 0;
        let RecoilDamping = 75;
        let RecoilHandDamping = 60;
        let HasShoulderContact = false;
        let WeaponAllowADS = false;
        let Ergonomics = serverItem._props.Ergonomics;
        let VerticalRecoil = serverItem._props.RecoilForceUp;
        let HorizontalRecoil = serverItem._props.RecoilForceBack;
        let Dispersion = serverItem._props.RecolDispersion;
        let CameraRecoil = serverItem._props.CameraRecoil;
        let CameraSnap = serverItem._props.CameraSnap;
        let Convergence = serverItem._props.Convergence;
        let RecoilAngle = serverItem._props.RecoilAngle;
        let DurabilityBurnRatio = serverItem._props.DurabilityBurnRatio;
        let BaseMalfunctionChance = serverItem._props.BaseMalfunctionChance;
        let HeatFactorGun = serverItem._props.HeatFactorGun;
        let HeatFactorByShot = serverItem._props.HeatFactorByShot;
        let CoolFactorGun = serverItem._props.CoolFactorGun;
        let CoolFactorGunMods = serverItem._props.CoolFactorGunMods;
        let AllowOverheat = serverItem._props.AllowOverheat;
        let CenterOfImpact = serverItem._props.CenterOfImpact;
        let HipAccuracyRestorationDelay = serverItem._props.HipAccuracyRestorationDelay;
        let HipAccuracyRestorationSpeed = serverItem._props.HipAccuracyRestorationSpeed;
        let HipInnaccuracyGain = serverItem._props.HipInnaccuracyGain;
        let ShotgunDispersion = serverItem._props.ShotgunDispersion;
        let Velocity = serverItem._props.Velocity;
        let Weight = serverItem._props.Weight;
        let AutoROF = serverItem._props.bFirerate;
        let SemiROF = serverItem._props.SingleFireRate;
        let loyaltyLevel = 2;
        let item = {
            ItemID,
            Name,
            WeapType,
            OperationType,
            WeapAccuracy,
            BaseTorque,
            RecoilDamping,
            RecoilHandDamping,
            HasShoulderContact,
            WeaponAllowADS,
            Ergonomics,
            VerticalRecoil,
            HorizontalRecoil,
            Dispersion,
            CameraRecoil,
            CameraSnap,
            Convergence,
            RecoilAngle,
            DurabilityBurnRatio,
            BaseMalfunctionChance,
            HeatFactorGun,
            HeatFactorByShot,
            CoolFactorGun,
            CoolFactorGunMods,
            AllowOverheat,
            CenterOfImpact,
            HipAccuracyRestorationDelay,
            HipAccuracyRestorationSpeed,
            HipInnaccuracyGain,
            ShotgunDispersion,
            Velocity,
            Weight,
            AutoROF,
            SemiROF,
            loyaltyLevel
        };
        return item;
    }
    assignJSONToMod(serverItem, fileItem, ID) {
        //new items properties can be added, and  property values can be replaced, by delcaring them in this if statement
        if (fileItem) {
            // fileItem.HeatFactor = serverItem._props.HeatFactor; You need to give it a value. If you set it to the server item's propety value, the new property will only appear if the server mod has that property
            //    if(serverItem._props?.Recoil !== undefined){
            //     fileItem.VerticalRecoil = serverItem._props.Recoil;
            //     fileItem.HorizontalRecoil = serverItem._props.Recoil;
            //    }
            return fileItem;
        }
        let ItemID = serverItem._id;
        let Name = serverItem._name;
        let ModType = "";
        let VerticalRecoil = serverItem._props.Recoil;
        let HorizontalRecoil = serverItem._props.Recoil;
        let Dispersion = 0;
        let CameraRecoil = 0;
        let AutoROF = 0;
        let SemiROF = 0;
        let ModMalfunctionChance = 0;
        let ReloadSpeed = 0;
        let AimSpeed = 0;
        let Length = 0;
        let CanCylceSubs = false;
        let RecoilAngle = 0;
        let StockAllowADS = false;
        let FixSpeed = 0;
        let ChamberSpeed = 0;
        let ModShotDispersion = 0;
        let Ergonomics = serverItem._props.Ergonomics;
        let Accuracy = serverItem._props.Accuracy;
        let CenterOfImpact = serverItem._props.CenterOfImpact;
        let HeatFactor = serverItem._props.HeatFactor;
        let CoolFactor = serverItem._props.CoolFactor;
        let MagMalfunctionChance = serverItem._props.MalfunctionChance;
        let LoadUnloadModifier = serverItem._props.LoadUnloadModifier;
        let CheckTimeModifier = serverItem._props.CheckTimeModifier;
        let DurabilityBurnModificator = serverItem._props.DurabilityBurnModificator;
        let HasShoulderContact = serverItem._props.HasShoulderContact;
        let BlocksFolding = serverItem._props.BlocksFolding;
        let Velocity = serverItem._props.Velocity;
        let ConflictingItems = serverItem._props.ConflictingItems;
        let Weight = serverItem._props.Weight;
        let ShotgunDispersion = serverItem._props.ShotgunDispersion;
        if (ID === "muzzle") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                CameraRecoil,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                CanCylceSubs,
                Accuracy,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator,
                Velocity,
                RecoilAngle,
                ConflictingItems,
                Ergonomics,
                Weight,
                ModShotDispersion
            };
            return item;
        }
        if (ID === "barrel") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                Length,
                Accuracy,
                CenterOfImpact,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator,
                Velocity,
                ConflictingItems,
                Ergonomics,
                Weight,
                ShotgunDispersion
            };
            return item;
        }
        if (ID === "mount") {
            let item = {
                ItemID,
                Name,
                ModType,
                Ergonomics,
                Accuracy,
                ConflictingItems,
                Weight
            };
            return item;
        }
        if (ID === "receiver") {
            let item = {
                ItemID,
                Name,
                ModType,
                ModMalfunctionChance,
                Accuracy,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator,
                ConflictingItems,
                Ergonomics,
                Weight
            };
            return item;
        }
        if (ID === "charging") {
            let item = {
                ItemID,
                Name,
                ModType,
                ReloadSpeed,
                ConflictingItems,
                FixSpeed,
                Ergonomics,
                Weight,
                ChamberSpeed
            };
            return item;
        }
        if (ID === "scope" || ID === "irons") {
            let item = {
                ItemID,
                Name,
                ModType,
                AimSpeed,
                Accuracy,
                ConflictingItems,
                Ergonomics,
                Weight
            };
            return item;
        }
        if (ID === "magazine") {
            let item = {
                ItemID,
                Name,
                ModType,
                ReloadSpeed,
                Ergonomics,
                MagMalfunctionChance,
                LoadUnloadModifier,
                CheckTimeModifier,
                ConflictingItems,
                Weight
            };
            return item;
        }
        if (ID === "aux") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                AimSpeed,
                ReloadSpeed,
                Ergonomics,
                Accuracy,
                ConflictingItems,
                FixSpeed,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator,
                Weight
            };
            return item;
        }
        if (ID === "foregrip" || ID === "pistolgrip") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                AimSpeed,
                Ergonomics,
                Accuracy,
                ConflictingItems,
                Weight
            };
            return item;
        }
        if (ID === "stock") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                CameraRecoil,
                AimSpeed,
                Ergonomics,
                Accuracy,
                HasShoulderContact,
                BlocksFolding,
                StockAllowADS,
                ConflictingItems,
                Weight
            };
            return item;
        }
        if (ID === "gasblock") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                CanCylceSubs,
                Accuracy,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator,
                ConflictingItems,
                Ergonomics,
                Weight
            };
            return item;
        }
        if (ID === "handguard") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                AimSpeed,
                ChamberSpeed,
                Length,
                Ergonomics,
                Accuracy,
                HeatFactor,
                CoolFactor,
                ConflictingItems,
                Weight
            };
            return item;
        }
        if (ID === "flashlight") {
            let item = {
                ItemID,
                Name,
                ModType,
                ConflictingItems,
                Ergonomics,
                Weight
            };
            return item;
        }
        if (ID === "unknown") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                CameraRecoil,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                ReloadSpeed,
                AimSpeed,
                ChamberSpeed,
                Length,
                CanCylceSubs,
                Ergonomics,
                Accuracy,
                CenterOfImpact,
                HeatFactor,
                CoolFactor,
                MagMalfunctionChance,
                LoadUnloadModifier,
                CheckTimeModifier,
                DurabilityBurnModificator,
                HasShoulderContact,
                BlocksFolding,
                Velocity,
                RecoilAngle,
                ConflictingItems,
                FixSpeed,
                StockAllowADS,
                Weight
            };
            return item;
        }
    }
    doAssignJSONMagazine(fileItem) {
        if (fileItem) {
            fileItem;
            return fileItem;
        }
        let item = {
            "cartridges": []
        };
        return item;
    }
    pushModsToServer() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false) {
                for (let i in MuzzleDeviceTemplates) {
                    let fileItem = MuzzleDeviceTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in BarrelTemplates) {
                    let fileItem = BarrelTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in MountTemplates) {
                    let fileItem = MountTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in ReceiverTemplates) {
                    let fileItem = ReceiverTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in StockTemplates) {
                    let fileItem = StockTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in ChargingHandleTemplates) {
                    let fileItem = ChargingHandleTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in ScopeTemplates) {
                    let fileItem = ScopeTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in IronSightTemplates) {
                    let fileItem = IronSightTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in MagazineTemplates) {
                    let fileItem = MagazineTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in AuxiliaryModTemplates) {
                    let fileItem = AuxiliaryModTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in ForegripTemplates) {
                    let fileItem = ForegripTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in PistolGripTemplates) {
                    let fileItem = PistolGripTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in GasblockTemplates) {
                    let fileItem = GasblockTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in HandguardTemplates) {
                    let fileItem = HandguardTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in FlashlightLaserTemplates) {
                    let fileItem = FlashlightLaserTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in AuxiliaryModTemplates) {
                    let fileItem = AuxiliaryModTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
            }
        }
    }
    pushWeaponsToServer() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.RecolDispersion) {
                for (let i in AssaultRifleTemplates) {
                    let fileItem = AssaultRifleTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in AssaultCarbineTemplates) {
                    let fileItem = AssaultCarbineTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in MachinegunTemplates) {
                    let fileItem = MachinegunTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in MarksmanRifleTemplates) {
                    let fileItem = MarksmanRifleTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in PistolTemplates) {
                    let fileItem = PistolTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in ShotgunTemplates) {
                    let fileItem = ShotgunTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in SMGTemplates) {
                    let fileItem = SMGTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in SniperRifleTemplates) {
                    let fileItem = SniperRifleTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in SpecialWeaponTemplates) {
                    let fileItem = SpecialWeaponTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in GrenadeLauncherTemplates) {
                    let fileItem = GrenadeLauncherTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
            }
        }
    }
    pushArmorToServer() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT || serverItem._parent === enums_1.ParentClasses.HEADWEAR) {
                for (let i in FaceShieldTemplates) {
                    let fileItem = FaceShieldTemplates[i];
                    this.armorPusherHelper(serverItem, fileItem);
                }
            }
        }
    }
    armorPusherHelper(serverItem, fileItem) {
        if (serverItem._id === fileItem.ItemID) {
            var serverConfItems = serverItem._props.ConflictingItems;
            var armorPropertyValues = ["SPTRM", fileItem?.AllowADS?.toString() || "true"];
            var combinedArr = armorPropertyValues.concat(serverConfItems);
            serverItem._props.ConflictingItems = combinedArr;
        }
    }
    modPusherHelper(serverItem, fileItem) {
        if (this.modConf.recoil_attachment_overhaul == true && this.modConf.legacy_recoil_changes != true) {
            if (serverItem._id === fileItem.ItemID) {
                serverItem._props.Ergonomics = fileItem.Ergonomics;
                serverItem._props.Accuracy = fileItem.Accuracy;
                serverItem._props.CenterOfImpact = fileItem.CenterOfImpact;
                serverItem._props.HeatFactor = fileItem.HeatFactor;
                serverItem._props.CoolFactor = fileItem.CoolFactor;
                serverItem._props.MalfunctionChance = fileItem.MagMalfunctionChance;
                serverItem._props.LoadUnloadModifier = fileItem.LoadUnloadModifier;
                serverItem._props.CheckTimeModifier = fileItem.CheckTimeModifier;
                serverItem._props.DurabilityBurnModificator = fileItem.DurabilityBurnModificator;
                serverItem._props.HasShoulderContact = fileItem.HasShoulderContact;
                serverItem._props.BlocksFolding = fileItem.BlocksFolding;
                serverItem._props.Velocity = fileItem.Velocity;
                serverItem._props.Weight = fileItem.Weight;
                serverItem._props.ShotgunDispersion = fileItem.ShotgunDispersion;
                var serverConfItems = serverItem._props.ConflictingItems;
                // var modConfItems = fileItem.ConflictingItems;
                var modPropertyValues = ["SPTRM", fileItem?.ModType?.toString() || "undefined", fileItem?.VerticalRecoil?.toString() || "0", fileItem?.HorizontalRecoil?.toString() || "0", fileItem?.Dispersion?.toString() || "0", fileItem?.CameraRecoil?.toString() || "0",
                    fileItem?.AutoROF?.toString() || "0", fileItem?.SemiROF?.toString() || "0", fileItem?.ModMalfunctionChance?.toString() || "0", fileItem?.ReloadSpeed?.toString() || "0", fileItem?.AimSpeed?.toString() || "0", fileItem?.ChamberSpeed?.toString() || "0",
                    fileItem?.Length?.toString() || "0", fileItem?.CanCylceSubs?.toString() || "false", fileItem?.RecoilAngle?.toString() || "0", fileItem?.StockAllowADS?.toString() || "false", fileItem?.FixSpeed?.toString() || "0", fileItem?.ModShotDispersion?.toString() || "0"];
                // for (let j in modPropertyValues) {
                //     serverConfItems[j] = modPropertyValues[j];
                // }
                var combinedArr = modPropertyValues.concat(serverConfItems);
                serverItem._props.ConflictingItems = combinedArr;
            }
        }
    }
    weapPusherHelper(serverItem, fileItem) {
        if (serverItem._id === fileItem.ItemID) {
            if (this.modConf.malf_changes == true) {
                serverItem._props.BaseMalfunctionChance = fileItem.BaseMalfunctionChance;
                serverItem._props.HeatFactorGun = fileItem.HeatFactorGun;
                serverItem._props.HeatFactorByShot = fileItem.HeatFactorByShot;
                serverItem._props.CoolFactorGun = fileItem.CoolFactorGun;
                serverItem._props.CoolFactorGunMods = fileItem.CoolFactorGunMods;
            }
            if (this.modConf.recoil_attachment_overhaul == true && this.modConf.legacy_recoil_changes != true) {
                serverItem._props.Ergonomics = fileItem.Ergonomics;
                serverItem._props.RecoilForceUp = fileItem.VerticalRecoil;
                serverItem._props.CenterOfImpact = fileItem.CenterOfImpact;
                serverItem._props.HeatFactor = fileItem.HeatFactor;
                serverItem._props.RecoilForceBack = fileItem.HorizontalRecoil;
                serverItem._props.RecolDispersion = fileItem.Dispersion;
                serverItem._props.CameraRecoil = fileItem.CameraRecoil;
                serverItem._props.CameraSnap = fileItem.CameraSnap;
                serverItem._props.Convergence = fileItem.Convergence;
                serverItem._props.DurabilityBurnRatio = fileItem.DurabilityBurnRatio;
                serverItem._props.RecoilAngle = fileItem.RecoilAngle;
                serverItem._props.AllowOverheat = fileItem.AllowOverheat;
                serverItem._props.HipAccuracyRestorationDelay = fileItem.HipAccuracyRestorationDelay;
                serverItem._props.HipAccuracyRestorationSpeed = fileItem.HipAccuracyRestorationSpeed;
                serverItem._props.HipInnaccuracyGain = fileItem.HipInnaccuracyGain;
                serverItem._props.ShotgunDispersion = fileItem.ShotgunDispersion;
                serverItem._props.Velocity = fileItem.Velocity;
                serverItem._props.Weight = fileItem.Weight;
                serverItem._props.bFirerate = fileItem.AutoROF;
                serverItem._props.SingleFireRate = fileItem.SemiROF;
                serverItem._props.DoubleActionAccuracyPenalty = fileItem.DoubleActionAccuracyPenalty;
                var serverConfItems = serverItem._props.ConflictingItems;
                var weapPropertyValues = ["SPTRM", fileItem?.WeapType?.toString() || "undefined", fileItem?.BaseTorque?.toString() || "0", fileItem?.HasShoulderContact?.toString() || "false", "unused", fileItem?.OperationType?.toString() || "undefined", fileItem?.WeapAccuracy?.toString() || "0",
                    fileItem?.RecoilDamping?.toString() || "70", fileItem?.RecoilHandDamping?.toString() || "65", fileItem?.WeaponAllowADS?.toString() || "false"];
                var combinedArr = weapPropertyValues.concat(serverConfItems);
                serverItem._props.ConflictingItems = combinedArr;
            }
        }
    }
    // public pushToAllMods() {
    //     for (let i in this.itemDB) {
    //         let serverItem = this.itemDB[i];
    //         if (serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false) {
    //             var array = ["undefined", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "false", "0", "false", "0"]
    //             var serverConfItems = serverItem._props.ConflictingItems;
    //             var combinedArr = array.concat(serverConfItems)
    //             serverItem._props.ConflictingItems = combinedArr;
    //         }
    //     }
    // }
    descriptionGen() {
        let locale = this.tables.locales.global["en"];
        for (let templateItem in this.itemDB) {
            let item = this.itemDB[templateItem];
            if (item._props.ConflictingItems != undefined && item._props.ConflictingItems[0] === "SPTRM") {
                let modType = item._props.ConflictingItems[1];
                if (modType === "booster") {
                    locale[`${templateItem}` + " Description"] = "This muzzle device is a booster. It gives the full firerate stats on short barreled rifles, and a reduced amount on longer barreld rifles." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "muzzle_supp_adapter") {
                    locale[`${templateItem}` + " Description"] = "This muzzle device is an adapter, it will lose all its stats except accuracy if a suppressor is attached to it." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "shot_pump_grip_adapt") {
                    locale[`${templateItem}` + " Description"] = "If a foregrip is attached to this pump grip there will be a bonus to chamber/pump speed." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "buffer_adapter" || modType === "stock_adapter" || modType === "grip_stock_adapter") {
                    locale[`${templateItem}` + " Description"] = "This adapater changes the recoil profile of the weapon by raising or lowering the stock in line with the barrel. It will not impart any stats unless a stock is attached. If it has a pistol grip slot, the pistol grip provides a bonus to ergo and recoil stats if attached." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "hydraulic_buffer") {
                    locale[`${templateItem}` + " Description"] = "This hydraulic buffer loses all its stats if not places on a shotgun, sniper rifle or assault carbine." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "buffer") {
                    locale[`${templateItem}` + " Description"] = "This buffer tube loses its recoil, firerate and durability burn stats if not placed on a weapon system that uses a recoil buffer (M4, ADAR, MK47, SR25, STM etc.)." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "buffer_stock") {
                    locale[`${templateItem}` + " Description"] = "This stock loses its firerate and durability burn stats if not placed on weapon system that uses a recoil buffer (M4, ADAR, MK47, SR25, STM etc.)." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "stock" && item._props.ConflictingItems[15] === "true") {
                    locale[`${templateItem}` + " Description"] = "This stock allows aiming down sights with any faceshield." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "foregrip_adapter") {
                    locale[`${templateItem}` + " Description"] = "This adapter will lose its negative ergo stat if a grip is attached to it." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "scope") {
                    locale[`${templateItem}` + " Description"] = "ADS speed modifier only applies when this sight is in use." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT || item._parent === enums_1.ParentClasses.HEADWEAR) {
                    if (item._props.ConflictingItems[1] === "true") {
                        locale[`${templateItem}` + " Description"] = "This faceshield allows the use of sights while using any stock in the extended position." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                    }
                    if (item._props.ConflictingItems[1] === "false") {
                        locale[`${templateItem}` + " Description"] = "This faceshield does NOT allow the use of sights while using any stock in the extended position." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                    }
                }
            }
            if (item._parent === enums_1.ParentClasses.AMMO) {
                if (item._props.Caliber === "Caliber20g") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a Toz-106." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber12g") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 610mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber23x75") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 700mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber46x30") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of an MP7." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber57x28") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a standard P90/264mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber9x18PM") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a Makarov." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber9x19PARA") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 254mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber1143x23ACP") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 254mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber9x33R") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 127mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber9x21") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a SR-1MP" + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber762x25TT") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a TT-30 Tokarev." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber762x35") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 229mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber9x39") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a VSS/AS VAL." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber366TKM") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 415mm barrel/standard AKM pattern rifle." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber556x45NATO") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 419mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber545x39") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 415mm barrel/standard AK-74 pattern rifle." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber762x39") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 415mm barrel/standard AKM pattern rifle." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber762x51") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 508mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber762x54R") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 508mm barrel" + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber127x55") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of the ASH-12." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber86x70") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 610mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
            }
        }
    }
}
exports.CodeGen = CodeGen;
