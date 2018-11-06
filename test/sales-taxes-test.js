var expect    = require("chai").expect;
var calculator = require("../index");

function testFromInputStringAndExpectedOne(inputData, expectedOutputString){

    var itemList = calculator.getItemsListFromTxt(inputData);
    calculator.setTaxFields(itemList);
    calculator.computeTaxes(itemList);
    expect(
        calculator.printOutput(itemList)
    ).to.equal(expectedOutputString);
}

describe("Amount and Taxes calculator", function() {
    it("Output bill given list of goods with input ONE", function() {
        testFromInputStringAndExpectedOne(
            "2 book at 12.49\n1 music CD at 14.99\n1 chocolate bar at 0.85",
            "2 book: 24.98\n1 music CD: 16.49\n1 chocolate bar: 0.85\nSales Taxes: 1.5\nTotal: 42.32"
            );
    });

    it("Output bill given list of goods with input TWO", function() {
        testFromInputStringAndExpectedOne(
            "1 imported box of chocolates at 10.00\n1 imported bottle of perfume at 47.50",
            "1 imported box of chocolates: 10.5\n1 imported bottle of perfume: 54.65\nSales Taxes: 7.65\nTotal: 65.15"
            );
    });

    it("Output bill given list of goods with input THREE", function() {
        testFromInputStringAndExpectedOne(
            "1 imported bottle of perfume at 27.99\n1 bottle of perfume at 18.99\n1 packet of headache pills at 9.75\n3 box of imported chocolates at 11.25",
            "1 imported bottle of perfume: 32.19\n1 bottle of perfume: 20.89\n1 packet of headache pills: 9.75\n3 box of imported chocolates: 35.55\nSales Taxes: 7.9\nTotal: 98.38"
            );
    });

});