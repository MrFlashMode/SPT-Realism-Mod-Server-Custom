import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";


export class Arrays {

    constructor(private tables: IDatabaseTables) { }

    public globalDB = this.tables.globals.config;
    public itemDB = this.tables.templates.items;
    public botDB = this.tables.bots.types;

    public traderIDs = [
        "54cb50c76803fa8b248b4571",
        "54cb57776803fa99248b456e",
        "579dc571d53a0658a154fbec",
        "58330581ace78e27b8b10cee",
        "5935c25fb3acc3127c3d8cd9",
        "5a7c2eca46aef81a7ca2145d",
        "5ac3b934156ae10c4430e83c",
        "5c0647fdd443bc2504c2d371"
    ];

    public stash_meds = [
        "544fb37f4bdc2dee738b4567",
        "5af0548586f7743a532b7e99",
        "5e8488fa988a8701445df1e4",
        "5af0454c86f7746bf20992e8",
        "5755356824597772cb798962",
        "590c661e86f7741e566b646a",
        "544fb45d4bdc2dee738b4568",
        "590c678286f77426c9660122",
        "60098ad7c2240c0fe85c570a",
        "590c657e86f77412b013051d",
        "5755383e24597772cb798966",
        "5751a89d24597722aa0e8db0",
        "5d02778e86f774203e7dedbe",
        "5d02797c86f774203f38e30a"
    ];

    public equipment_slots = {
        Headwear: "Headwear",
        Earpiece: "Earpiece",
        FaceCover: "FaceCover",
        ArmorVest: "ArmorVest",
        Eyewear: "Eyewear",
        ArmBand: "ArmBand",
        TacticalVest: "TacticalVest",
        Pockets: "Pockets",
        Backpack: "Backpack",
        SecuredContainer: "SecuredContainer",
        FirstPrimaryWeapon: "FirstPrimaryWeapon",
        SecondPrimaryWeapon: "SecondPrimaryWeapon",
        Holster: "Holster",
        Scabbard: "Scabbard"
    };

    public boss_bot_list = [
        this.botDB["bosssanitar"],
        this.botDB["bosskojaniy"],
        this.botDB["bosskilla"],
        this.botDB["bossgluhar"],
        this.botDB["bossbully"],
        this.botDB["bossknight"],
        this.botDB["bosstagilla"],
        this.botDB["followerbigpipe"],
        this.botDB["followerbirdeye"],
        this.botDB["sectantpriest"] 
    ];

    public boss_follower_list = [
        this.botDB["followerbully"],
        this.botDB["followergluharassault"],
        this.botDB["followergluharscout"],
        this.botDB["followergluharsecurity"],
        this.botDB["followergluharsnipe"],
        this.botDB["followerkojaniy"],
        this.botDB["followersanitar"],
        this.botDB["followertagilla"],
    ];

    public PMC_list = [
        this.botDB["usec"],
        this.botDB["bear"],
    ];

    public rogue_raider_list = [
        this.botDB["pmcbot"],
        this.botDB["exusec"],
    ];

    public cultist_list = [
        this.botDB["sectantwarrior"],
        this.botDB["sectantpriest"],
    ];

    public scav_bot_list = [
        this.botDB["cursedassault"],
        this.botDB["assault"],
        this.botDB["marksman"]
    ];

    public scav_bot_health_list = [
        this.botDB["cursedassault"],
        this.botDB["assault"],
    ];

    public non_scav_bot_list = [
        this.botDB["followerbully"],
        this.botDB["followergluharassault"],
        this.botDB["followergluharscout"],
        this.botDB["followergluharsecurity"],
        this.botDB["followergluharsnipe"],
        this.botDB["followerkojaniy"],
        this.botDB["followersanitar"],
        this.botDB["followertagilla"],
        this.botDB["usec"],
        this.botDB["bear"],
        this.botDB["sectantwarrior"],
        this.botDB["sectantpriest"],
        this.botDB["marksman"],
        this.botDB["bosstagilla"],
        this.botDB["bosssanitar"],
        this.botDB["bosskojaniy"],
        this.botDB["bosskilla"],
        this.botDB["bossgluhar"],
        this.botDB["bossbully"],
        this.botDB["pmcbot"],
        this.botDB["exusec"],
        this.botDB["bossknight"],
        this.botDB["followerbigpipe"],
        this.botDB["followerbirdeye"]
    ];

    public bot_list = [
        this.botDB["followerbully"],
        this.botDB["followergluharassault"],
        this.botDB["followergluharscout"],
        this.botDB["followergluharsecurity"],
        this.botDB["followergluharsnipe"],
        this.botDB["followerkojaniy"],
        this.botDB["followersanitar"],
        this.botDB["followertagilla"],
        this.botDB["usec"],
        this.botDB["bear"],
        this.botDB["sectantwarrior"],
        this.botDB["sectantpriest"],
        this.botDB["assault"],
        this.botDB["marksman"],
        this.botDB["cursedassault"],
        this.botDB["bosstagilla"],
        this.botDB["bosssanitar"],
        this.botDB["bosskojaniy"],
        this.botDB["bosskilla"],
        this.botDB["bossgluhar"],
        this.botDB["bossbully"],
        this.botDB["pmcbot"],
        this.botDB["exusec"],
        this.botDB["bossknight"],
        this.botDB["followerbigpipe"],
        this.botDB["followerbirdeye"]
    ];

    public mod_types = {
        "FlashHider": "550aa4bf4bdc2dd6348b456b",
        "MuzzleCombo": "550aa4dd4bdc2dc9348b4569",
        "Silencer": "550aa4cd4bdc2dd8348b456c",
        "Barrel": "555ef6e44bdc2de9068b457e",
        "Mount": "55818b224bdc2dde698b456f",
        "Receiver": "55818a304bdc2db5418b457d",
        "Stock": "55818a594bdc2db9688b456a",
        "Charge": "55818a6f4bdc2db9688b456b",
        "CompactCollimator": "55818acf4bdc2dde698b456b",
        "Collimator": "55818ad54bdc2ddc698b4569",
        "AssaultScope": "55818add4bdc2d5b648b456f",
        "Scope": "55818ae44bdc2dde698b456c",
        "IronSight": "55818ac54bdc2d5b648b456e",
        "SpecialScope": "55818aeb4bdc2ddc698b456a",
        "Magazine": "5448bc234bdc2d3c308b4569",
        "AuxiliaryMod": "5a74651486f7744e73386dd1",
        "Foregrip": "55818af64bdc2d5b648b4570",
        "PistolGrip": "55818a684bdc2ddd698b456d",
        "Gasblock": "56ea9461d2720b67698b456f",
        "Handguard": "55818a104bdc2db9688b4569",
        "Bipod": "55818afb4bdc2dde698b456d",
        "Flashlight": "55818b084bdc2d5b648b4571",
        "TacticalCombo": "55818b164bdc2ddc698b456c",
        "CylinderMagazine": "610720f290b75a49ff2e5e25",
        "GrenadeLauncherMagazine": "627a137bf21bc425b06ab944"
    };

    public required_slots = [
        "mod_scope",
        "mod_scope_000",
        "mod_scope_001",
        "mod_scope_002",
        "mod_scope_003",
        "mod_muzzle",
        "mod_flashlight",
        "mod_foregrip",
        "mod_tactical",
        "mod_mount"
    ];

    public neutral_include = [
        "55818a304bdc2db5418b457d",
        "5a74651486f7744e73386dd1",
        "55818a684bdc2ddd698b456d",
        "55818a6f4bdc2db9688b456b",
        "55818b224bdc2dde698b456f",
        "55818acf4bdc2dde698b456b",
        "55818ad54bdc2ddc698b4569",
        "55818add4bdc2d5b648b456f",
        "55818ae44bdc2dde698b456c",
        "55818ac54bdc2d5b648b456e",
        "55818aeb4bdc2ddc698b456a",
        "5448bc234bdc2d3c308b4569"
    ];

    public slide_base = [
        "6194f41f9fb0c665d5490e75",
        "6194f5a318a3974e5e7421eb",
        "6194f5722d2c397d6600348f",
        "6194f5d418a3974e5e7421ef",
        "6193d382ed0429009f543e65",
        "615d8dbd290d254f5e6b2ed6",
        "5c0125fc0db834001a669aa3",
        "5c010a700db834001d23ef5d",
        "5c0009510db834001966907f",
        "5bffe7c50db834001d23ece1",
        "5b1faa0f5acfc40dc528aeb5",
        "5a9685b1a2750c0032157104",
        "5a7033908dc32e000a311392",
        "5a7afa25e899ef00135e31b0",
        "5a71e22f8dc32e00094b97f4",
        "5a6f5e048dc32e00094b97da",
        "5a71e4f48dc32e001207fb26",
        "5a6f5f078dc32e00094b97dd",
        "5a702d198dc32e000b452fc3",
        "5cadc55cae921500103bb3be",
        "5d3eb44aa4b93650d64e4979",
        "5e81edc13397a21db957f6a1",
        "5f3e7823ddc4f03b010e2045",
        "60228924961b8d75ee233c32",
        "56d5a407d2720bb3418b456b"
    ];

    public stocks_base = [
        "5cf13123d7f00c1085616a50",
        "5d25d0ac8abbc3054f3e61f7",
        "5ea03e9400685063ec28bfa4",
        "5c503af12e221602b177ca02",
        "5f63405df5750b524b45f114",
        "5bfeb32b0db834001a6694d9",
        "5ae096d95acfc400185c2c81",
        "5bfd35380db83400232fe5cc",
        "5bfd384c0db834001a6691d3",
        "5bfd37c80db834001d23e842",
        "5bbdb870d4351e00367fb67d",
        "5bae13bad4351e00320204af",
        "5adf23995acfc400185c2aeb",
        "5c99f3592e221644fc633070",
        "5a38ef1fc4a282000b1521f6",
        "5addbf175acfc408fb13965b",
        "5aaf8e43e5b5b00015693246",
        "587e0531245977466077a0f7",
        "574dad8024597745964bf05c",
        "5d0236dad7ad1a0940739d29",
        "5cc700b9e4a949000f0f0f25",
        "5cebec10d7f00c065703d185",
        "5de655be4a9f347bc92edb88",
        "617154aa1cb55961fa0fdb3b",
        "617155ee50224f204c1da3cd",
        "5c87a07c2e2216001219d4a2",
        "5bb20e70d4351e0035629f8f",
        "606587d11246154cad35d635",
        "5c793fde2e221601da358614",
        "5bfe86df0db834001b734685",
        "5a9eb32da2750c00171b3f9c",
        "602e620f9b513876d4338d9a",
        "5beec8c20db834001d2c465c",
        "5b39f8db5acfc40016387a1b",
        "5ae30c9a5acfc408fb139a03",
        "56eabf3bd2720b75698b4569",
        "58d2946386f774496974c37e",
        "58d2947e86f77447aa070d53",
        "58d2947686f774485c6a1ee5",
        "58d2946c86f7744e271174b5",
        "5d135e83d7ad1a21b83f42d8",
        "5d135ecbd7ad1a21c176542e",
        "55d4ae6c4bdc2d8b2f8b456e",
        "5947c73886f7747701588af5",
        "5fbbaa86f9986c4cff3fe5f6",
        "5fce16961f152d4312622bc9",
        "5fc2369685fd526b824a5713",
        "5d44069ca4b9361ebd26fc37",
        "5d4406a8a4b9361e4f6eb8b7",
        "5a33cae9c4a28232980eb086",
        "591aef7986f774139d495f03",
        "591af10186f774139d495f0e",
        "5947e98b86f774778f1448bc",
        "5947eab886f77475961d96c5",
        "5b0800175acfc400153aebd4",
        "5d120a10d7ad1a4e1026ba85",
        "5a33e75ac4a2826c6e06d759",
        "5c0e2ff6d174af02a1659d4a",
        "5b0e794b5acfc47a877359b2",
        "59ecc3dd86f7746dc827481c",
        "5b222d405acfc400153af4fe",
        "57616ca52459773c69055192",
        "5649b0fc4bdc2d17108b4588",
        "5ac50c185acfc400163398d4",
        "59d6514b86f774171a068a08",
        "59e6227d86f77440d64f5dc2",
        "59e89d0986f77427600d226e",
        "5649b1c04bdc2d16268b457c",
        "599851db86f77467372f0a18",
        "5ab626e4d8ce87272e4c6e43",
        "57dc347d245977596754e7a1",
        "5abcd472d8ce8700166032ae",
        "59ff3b6a86f77477562ff5ed",
        "57ade1442459771557167e15",
        "619b69037b9de8162902673e",
        "5e217ba4c1434648c13568cd",
        "6087e2a5232e5a31c233d552",
        "5c471b5d2e221602b21d4e14",
        "57c450252459772d28133253",
        "578395e82459774a0e553c7b",
        "5b7d645e5acfc400170e2f90",
        "5b7d63cf5acfc4001876c8df",
        "5b7d63de5acfc400170e2f8d",
        "5b7d64555acfc4001876c8e2",
        "5b7d63b75acfc400170e2f8a",
        "5b7d63b75acfc400170e2f8a",
        "5c5db6f82e2216003a0fe914",
        "5c5db6ee2e221600113fba54",
        "5894a13e86f7742405482982",
        "5fbcc429900b1d5091531dd7",
        "5fbcc437d724d907e2077d5c",
        "5fb6558ad6f0b2136f2d7eb7",
        "5fc3e4ee7283c4046c5814af",
        "5de910da8b6c4240ba2651b5",
        "5a17fb9dfcdbcbcae6687291",
        "5bfe86df0db834001b734685",
        "5926d40686f7740f152b6b7e",
        "5926d3c686f77410de68ebc8",
        "5bd704e7209c4d00d7167c31",
        "5bcf0213d4351e0085327c17",
        "5cdeac42d7f00c000d36ba73",
        "5df35ddddfc58d14537c2036",
        "58889d0c2459775bc215d981",
        "5addc7ac5acfc400194dbd90",
        "606eef756d0bd7580617baf8",
        "607d5a891246154cad35d6aa",
        "612781056f3d944a17348d60",
        "5e848dc4e4dbc5266a4ec63d",
        "5e848db4681bea2ada00daa9",
        "5eea217fc64c5d0dfc05712a",
        "5e87116b81c4ed43e83cefdd",
        "5a7880d0c5856700142fdd9d",
        "5a78813bc5856700186c4abe",
        "56083be64bdc2d20478b456f",
        "56083cba4bdc2de22e8b456f",
        "618167528004cc50514c34f9",
        "618167528004cc50514c34f9"
    ];

    public weapons = [
        "5447b5fc4bdc2d87278b4567",
        "5447b5cf4bdc2d65278b4567",
        "5447b6094bdc2dc3278b4567",
        "5447b5f14bdc2d61278b4567",
        "5447b6254bdc2dc3278b4568",
        "5447b6194bdc2d67278b4567",
        "5447b5e04bdc2d62278b4567"
    ];

    public conflicting_hats = [
        "60bf74184a63fc79b60c57f6",
        "5df8a58286f77412631087ed",
        "5d96141523f0ea1b7f2aacab",
        "572b7fa124597762b472f9d2",
        "59e770f986f7742cbe3164ef",
        "60361b5a9a15b10d96792291",
        "603618feffd42c541047f771",
        "60361a7497633951dc245eb4",
        "6040de02647ad86262233012",
        "60361b0b5a45383c122086a1",
        "603619720ca681766b6a0fc4",
        "572b7d8524597762b472f9d1",
        "5aa2b8d7e5b5b00014028f4a",
        "5aa2ba19e5b5b00014028f4e",
        "5b40e5e25acfc4001a599bea",
        "5aa2b87de5b5b00016327c25",
        "5b40e61f5acfc4001a599bec",
        "5aa2a7e8e5b5b00016327c16",
        "5aa2b89be5b5b0001569311f",
        "5b4329075acfc400153b78ff",
        "5f60e7788adaa7100c3adb49",
        "5f60e6403b85f6263c14558c",
        "5f60e784f2bcbb675b00dac7",
        "5b43271c5acfc432ff4dce65",
        "61c18db6dfd64163ea78fbb4"
    ];

    public conflicting_masks = [
        "5b432c305acfc40019478128",
        "60363c0c92ec1c31037959f5",
        "5b432b6c5acfc4001a599bf0",
        "572b7f1624597762ae139822",
        "5ab8f4ff86f77431c60d91ba",
        "5b432f3d5acfc4704b4a1dfb",
        "5fd8d28367cb5e077335170f",
        "5b4325355acfc40019478126",
        "5ab8f85d86f7745cd93a1cf5",
        "5ab8f39486f7745cd93a1cca",
        "5b4326435acfc433000ed01d"
    ];
}