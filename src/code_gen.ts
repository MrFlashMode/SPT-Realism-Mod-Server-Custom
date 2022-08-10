import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { Helper } from "./helper";

const testFile = require("../db/test.json");


export class CodeGen {

    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf, private helper: Helper) { }

    public globalDB = this.tables.globals.config;
    public itemDB = this.tables.templates.items;

    public codeGen() {

        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if(serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false ){
                let fileItem = testFile[i];

                testFile[i] = this.doAssignJsonItemMod(serverItem, fileItem)
                this.helper.saveToJSONFile(testFile, 'db/test.json');

            }
            if (serverItem._props.RecolDispersion) {

                let fileItem = testFile[i];

                testFile[i] = this.doAssignJsonItemWep(serverItem, fileItem)
              
                this.helper.saveToJSONFile(testFile, 'db/test.json');
            }
                //can do a bunch of calculations here to generate values for recoil, damge etc. to generate base data.
                //Need to remember that this will OVER-WRITE any changes made to the .json 
                //need to find a way to sort generated json objects here.
                //can resuse this function for every type of item, just have different if statements for each category, and seprate files
                //to write them to.
                //CREATE A SAFETY TO PREVENT THIS FROM RUNNING TWICE. Do it same way you did the rever meds function. If this thing goes off
                //unintentionally, all files get ovewritten. Maybe instead use copies of these

                // var confItemArr = fileData._props.ConflictingItems;
                
                // //This will be used to hold data for client functions, such as mass, initial velocity, etc.
                // var myArr = [
                //     "My value 1",
                //     "My value 2"
                // ]
             
                // for (let j = fileData._props.ConflictingItems.length; j < 10; j++){
                //     confItemArr.push("");
                // }

            //     for (let k = 0; k < myArr.length; k++){
            //         confItemArr.splice(0, 0, myArr[k])
            //     }
              
            //    var ConflictingItems = confItemArr;
               
               
            //     var Name = fileData._name;
            //     var ID = fileData._id;
            //     var Calibre = fileData._props.Caliber;
            //     var PenetrationPower = fileData._props.PenetrationPower;
            //     var Damage = fileData._props.Damage
            //     var Recoil = fileData._props.ammoRec;

            //     this.logger.warning("Match Found");
              
                // testFile[i] = {
                //     ID,
                //     Name,
                //     Calibre,
                //     PenetrationPower,
                //     Damage,
                //     ConflictingItems,
                //     Recoil
                // };

            
        }

        this.logger.info("Running Code Gen");
    }

    private doConfictingArrayWep(serverItem : ITemplateItem, fileItem : any) : any  {

        //let arr = serverItem._props.ConflictingItems;
        // var ca = ["a","b", serverItem._props.Caliber.toString()]; 
        // let recoil = (serverItem._props.Recoil).toString();
        let ca = ["0", "0" , "0", "0", "0" , "0", "0", "0" , "0", "0", "0" , "0", "0", "0" , "0"]; 
        let sa = serverItem._props.ConflictingItems;
        return ca.concat(sa);
        
    }

    private doConfictingArrayMod(serverItem : ITemplateItem, fileItem : any) : any  {

        //let arr = serverItem._props.ConflictingItems;
        // var ca = ["a","b", serverItem._props.Caliber.toString()]; 
        // let recoil = (serverItem._props.Recoil).toString();
        let ca = [ "0", "0" , "0", "0", "0" , "0", "0", "0" , "0", "0", "0" , "0", "0", "0" , "0"]; 
        let sa = serverItem._props.ConflictingItems;
        return ca.concat(sa);
        
    }

    private doAssignJsonItemMod(serverItem : ITemplateItem, fileItem : any) {
        
       
        if (fileItem) {
            fileItem.nthRun = fileItem.nthRun+1;
            // fileItem.ConflictingItems = this.doConfictingArray(serverItem);
            fileItem
            return fileItem;
        }
       
        let nthRun = 1;
        let Name = serverItem._name;
        let ID = serverItem._id;
        let ParentID = serverItem._parent;
        let Ergonomics = serverItem._props.Ergonomics;
        let Accuracy = serverItem._props.Accuracy
        let Recoil = serverItem._props.Recoil;
        let ConflictingItems = this.doConfictingArrayMod(serverItem, fileItem);

        let item = {
            nthRun,
            ID,
            ParentID,
            Name,
            Recoil,
            Ergonomics,
            Accuracy,
            ConflictingItems
        };
        return item;
    }

    private doAssignJsonItemWep(serverItem : ITemplateItem, fileItem : any) {
        
       
        if (fileItem) {
            fileItem.nthRun = fileItem.nthRun+1;
            // fileItem.ConflictingItems = this.doConfictingArray(serverItem);
            fileItem
            return fileItem;
        }
       
        let nthRun = 1;
        let Name = serverItem._name;
        let ID = serverItem._id;
        let ParentID = serverItem._parent;
        let Ergonomics = serverItem._props.Ergonomics;
        let Accuracy = serverItem._props.Accuracy
        let RecoilUp = serverItem._props.RecoilForceUp;
        let RecoilBack = serverItem._props.RecoilForceBack;
        let ConflictingItems = this.doConfictingArrayWep(serverItem, fileItem);

        let item = {
            nthRun,
            ID,
            ParentID,
            Name,
            RecoilUp,
            RecoilBack,
            Ergonomics,
            Accuracy,
            ConflictingItems
        };
        return item;
    }

    public pushModsToServer(){
        for (let i in this.itemDB) {
            let fileData = this.itemDB[i];
            if (fileData._props.ToolModdable == true || fileData._props.ToolModdable == false ) {
                for(let j in testFile){
                    if(fileData._id === testFile[j].ID){
                        fileData._props.ConflictingItems = testFile[j].ConflictingItems;
                        fileData._props.Recoil = testFile[j].Recoil;
                        fileData._props.Ergonomics = testFile[j].Ergonomics;
                    }
                }
            }
        }
        this.logger.info("Pushing Mod Stats to server");
    }

    public pushWepsToServer(){
        for (let i in this.itemDB) {
            let fileData = this.itemDB[i];
            if (fileData._props.RecolDispersion) {
                for(let j in testFile){
                    if(fileData._id === testFile[j].ID){
                        fileData._props.ConflictingItems = testFile[j].ConflictingItems;
                    }
                }
            }
        }
        this.logger.info("Pushing Weapon Stats to server");
    }


}