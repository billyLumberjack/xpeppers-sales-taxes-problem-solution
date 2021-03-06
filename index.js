const fs = require('fs')
var path = require('path')
const keywordsFiles = ["books.txt", "foods.txt", "medicines.txt"];

function computeTaxes(objList){
    for(var obj of objList){
        var totalTaxesAmount = 0;

        if(obj.taxApplicable){
            totalTaxesAmount += (obj.price * 0.1);
        }
        if(obj.importDutyApplicable){
            totalTaxesAmount += (obj.price * 0.05);
        }
        obj["taxes"] = Math.ceil(totalTaxesAmount / 0.05) * 0.05;
    }
};

function printOutput(objList, tt, p){
    var total = 0, totalTaxes = 0;
    var str = "";

    for(var obj of objList){
        var price = (obj.price + obj.taxes) * obj.quantity;

        price = Math.round(price * 100) / 100;

        total += price;
        totalTaxes += (obj.taxes * obj.quantity);

        str += obj.quantity + " " + obj.name + ": " + price + "\n";
    }

    str += "Sales Taxes: " + totalTaxes + "\n";
    str += "Total: " + total;
    return str;
};

function setTaxFields(objList){
    for(var obj of objList){
        obj["taxApplicable"] = isBasicSalesTaxApplicable(obj.name);
        obj["importDutyApplicable"] = isImportDutyTaxApplicable(obj.name);
    }
}

function isImportDutyTaxApplicable(objName){
    return objName.includes("imported");
}

function isBasicSalesTaxApplicable(objName){
    var keywords = [];

    for(var file of keywordsFiles){
        keywords = fs.readFileSync(file, "utf8").split("\n");
        for(var keyword of keywords){
            if(objName.includes(keyword))
                return false;
        }
    }
    return true;
}

function getItemsListFromTxt(data){
    var res = [];
    

    for (var line of data.split("\n")) {
        var obj = {};

        obj["price"] = line.match(/[0-9]*.[0-9]*$/g)[0];
        obj["quantity"] = line.match(/^[0-9]*/g)[0];
        obj["name"] = line.replace(/ at /g,"").replace(obj["price"],"").replace(obj["quantity"],"").trim();

        obj["price"] = Number(obj["price"]);
        obj["quantity"] = Number(obj["quantity"]);
        
        res.push(obj);
    }
    return res;
}

exports.getItemsListFromTxt = getItemsListFromTxt;
exports.setTaxFields = setTaxFields;
exports.computeTaxes = computeTaxes;
exports.printOutput = printOutput;

if(!process.argv[2]){
    console.error("Please add input file to the arguments");
    return;
}else{
    fs.readFile(process.argv[2],'utf8', (err, data) => {
        if (err) {
          console.error(err)
          return
        }
    
        var itemList = getItemsListFromTxt(data);
        setTaxFields(itemList);
        computeTaxes(itemList);
        console.log(
            printOutput(itemList)
        );
    });
}