const fs = require('fs')
const keywordsFiles = ["books.txt", "foods.txt", "madicines.txt"];

function isBasicSalesTaxApplicable(){
    var keywords = [];
    for(file in keywordsFiles){
        keywords = fs.readFileSync(file, "utf8");

        console.log(keywords);

    }
}

function getItemsListFromTxt(data){
    var res = [];

    for (var line of data.split("\n")) {
        var obj = {};

        obj["price"] = line.match(/[0-9]*.[0-9]*$/g)[0];
        obj["quantity"] = line.match(/^[0-9]*/g)[0];
        obj["name"] = line.replace(/at/g,"").replace(obj["price"],"").replace(obj["quantity"],"").trim();
    }
    return res;
}

fs.readFile('input.txt','utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    getItemsListFromTxt(data);
    isBasicSalesTaxApplicable();

});