const fs = require('fs')
var path = require('path')
const keywordsFiles = ["books.txt", "foods.txt", "medicines.txt"];

function computeTotalTaxes(objList){
    var totalTaxesAmount = 0;

    for(var obj of objList){
        if(obj.taxApplicable){
            totalTaxesAmount += (obj.price * 0.1 * obj.quantity);
        }
        if(obj.importDutyApplicable){
            totalTaxesAmount += (obj.price * 0.05 * obj.quantity);
        }
    }
    return (Math.ceil(totalTaxesAmount * 20) / 20).toFixed(2); //???!?!?!??!?!
};

function computeTotalPrice(objList, tt){
    var res = 0;
    for(var obj of objList){
        res += obj.price;
    }
    return res + tt;
};
function printOutput(objList, tt, p){};

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

fs.readFile('input.txt','utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    var itemList = getItemsListFromTxt(data);
    var taxes = 0;
    var price = 0;

    setTaxFields(itemList);
    taxes = computeTotalTaxes(itemList);
    price = computeTotalPrice(itemList, taxes);
    printOutput(itemList);

    console.log(taxes);
    console.log(itemList);
});