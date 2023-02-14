document.addEventListener( 'DOMContentLoaded', function () {

    const setElementText = (elemId, value) => {
        const targetElement = document.getElementById(elemId);
        if (targetElement === null) {
            console.log('Unable to find element #' + elemId);
            return;
        }
        targetElement.textContent = value.toString();
    };
    const formatCost = (cost) => {
        let costStr = cost.toString();
        if (costStr.indexOf('.') === -1) {
            costStr += '.';
        }
        costStr += '000';
        // If the 3rd digit after the decimal is 5-9, then this should round
        // up. Instead of trying to figure out how to do that manually on the
        // string, just add 0.005 to the cost instead.
        const decimalIdx = costStr.indexOf('.');
        const thirdDigit = costStr[ decimalIdx + 3 ];
        // character comparisons!
        if (thirdDigit >= '5' && thirdDigit <= '9') {
            return formatCost(cost + 0.005);
        }
        // should truncate, 3rd digit after the decimal is 0-4; also add a $
        return '$' + costStr.substring(0, decimalIdx + 3);
    };
    const getQuantity = (item) => {
        let rawInput = prompt("How many " + item + " do you want?");
        if (rawInput === null || rawInput === undefined) {
            // user hit escape, treat as 0
            return 0;
        }
        const asInt = parseInt(rawInput);
        // might not be a number, in which case treat as 0
        if (Number.isNaN(asInt)) {
            return 0;
        }
        return asInt;
    };

    const getOrder = (itemName, unitCost, fieldPrefix) => {
        const count = getQuantity(itemName);
        setElementText(fieldPrefix + '-count', count);
        const cost = count * unitCost;
        setElementText(fieldPrefix + '-cost', formatCost(cost));
        return cost;
    };
    const costHotdogs = getOrder('hotdogs', 4.00, 'hotdogs');
    const costFries = getOrder('orders of fries', 3.50, 'fries');
    const costSodas = getOrder('sodas', 1.75, 'sodas');
    
    const subTotal = costHotdogs + costFries + costSodas;
    setElementText('subtotal-items', formatCost(subTotal));

    let discount = 0;
    if (subTotal >= 20) {
        discount = subTotal * 0.1;
    }
    setElementText('discount', formatCost(discount));

    const totalPreTax = subTotal - discount;
    setElementText('subtotal-discount', formatCost(totalPreTax));
    const tax = totalPreTax * 0.0625;
    setElementText('tax', formatCost(tax));

    setElementText('total', formatCost(totalPreTax + tax));
} );