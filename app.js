const LLP_DATA = {
    "2025": {
        "price": {
            "KH14275": 1378125, "KH18436": 2280395, "LV18447": 2280395, "LV19601": 2280395,
            "LV39600": 2280395, "LV39838": 2280395, "KH20818": 64331, "KH59279": 1025640,
            "KH19634": 1840171, "KH19635": 248809, "KH19517": 1177894, "KH20444": 853172,
            "KH62917": 853172, "KH51313": 213302, "KH62913": 213302, "FW84856": 139830,
            "KH33945": 470547, "KH33944": 702763, "LV35495": 613812, "LV35566": 613812,
            "KH33943": 613812, "KH76711": 613812, "KH34202": 505867, "KH34201": 460585,
            "LV30750": 329998, "KH34200": 329998, "KH13214": 415377, "FW60183": 349414,
            "KH59799": 583755, "FW34116": 583755, "KH19775": 349414, "FW80670": 329998,
            "KH12590": 460585, "KH36323": 507789, "KH33943": 613812, "FW89043": 2280395,
            "KH11698": 859631, "FW55152": 248809, "KH23655": 1840171, "KH20922": 1378125,
            "FW79147": 753654, "KH19098": 136958
        },
        "limit": {
            "KH14275": 1639, "KH18436": 3100, "LV18447": 3100, "LV19601": 3100,
            "LV39600": 4520, "LV39838": 4520, "KH20818": 5000, "KH59279": 2585,
            "KH19634": 2790, "KH19635": 4000, "KH19517": 4096, "KH20444": 4520,
            "KH62917": 4520, "KH51313": 6375, "KH62913": 6375, "FW84856": 6375,
            "KH33945": 5000, "KH33944": 5000, "LV35495": 5000, "LV35566": 5000,
            "KH33943": 3000, "KH76711": 3000, "KH34202": 5000, "KH34201": 5000,
            "LV30750": 5000, "KH34200": 4692, "KH13214": 6375, "FW60183": 6375,
            "KH59799": 6375
        },
        "handling_fee": 23610
    },
    "2026": {
        "price": {
            "KH14275": 1474594, "KH18436": 2440023, "LV18447": 2440023, "LV19601": 2440023,
            "LV39600": 2440023, "LV39838": 2440023, "KH20818": 68835, "KH59279": 1097435,
            "KH19634": 1968983, "KH19635": 266226, "KH19517": 1260347, "KH20444": 912895,
            "KH62917": 912895, "KH51313": 228234, "KH62913": 228234, "FW84856": 149619,
            "KH33945": 503486, "KH33944": 751957, "LV35495": 656779, "LV35566": 656779,
            "KH33943": 656779, "KH76711": 656779, "KH34202": 541278, "KH34201": 492826,
            "LV30750": 353098, "KH34200": 353098, "KH13214": 444454, "FW60183": 373873,
            "KH59799": 624618, "FW34116": 624618, "KH19775": 373873, "FW80670": 353098,
            "KH12590": 492826, "KH36323": 543335, "KH33943": 656779, "FW89043": 2440023,
            "KH11698": 919806, "FW55152": 266226, "KH23655": 1968983, "KH20922": 1474594,
            "FW79147": 806410, "KH19098": 146546
        },
        "limit": {
            "KH14275": 1639, "KH18436": 3100, "LV18447": 3100, "LV19601": 3100,
            "LV39600": 4520, "LV39838": 4520, "KH20818": 5000, "KH59279": 2585,
            "KH19634": 2790, "KH19635": 4000, "KH19517": 4096, "KH20444": 4520,
            "KH62917": 4520, "KH51313": 6375, "KH62913": 6375, "FW84856": 6375,
            "KH33945": 5000, "KH33944": 5000, "LV35495": 5000, "LV35566": 5000,
            "KH33943": 3000, "KH76711": 3000, "KH34202": 5000, "KH34201": 5000,
            "LV30750": 5000, "KH34200": 4692, "KH13214": 6375, "FW60183": 6375,
            "KH59799": 6375
        },
        "handling_fee": 23610
    }
};

let currentYear = "2025";
let rows = [];

// DOM Elements
const calcTableBody = document.getElementById('calc-body');
const yearSelect = document.getElementById('year-select');
const totalSumValue = document.getElementById('total-sum-value');
const searchInputs = [document.getElementById('search-2025'), document.getElementById('search-2026')];
const refTableBodies = [document.getElementById('ref-body-2025'), document.getElementById('ref-body-2026')];

// Formatting Utilities
const formatNum = (num, decimals = 0) => {
    if (isNaN(num) || num === null || num === "") return "";
    return Number(num).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
};

const parseNum = (str) => {
    if (typeof str === 'number') return str;
    return parseFloat(str.replace(/,/g, '')) || 0;
};

// Core Calculation Logic
const calculateRow = (row) => {
    const pNumber = row.elements.pNumber.value.trim().toUpperCase();
    const csn = parseNum(row.elements.csn.value);
    const sdc = parseNum(row.elements.sdc.value);
    
    const yearData = LLP_DATA[currentYear];
    
    // Auto-fill from data
    if (yearData.limit[pNumber]) {
        row.elements.limit.value = formatNum(yearData.limit[pNumber]);
    } else if (pNumber === "") {
        row.elements.limit.value = "";
    }
    
    if (yearData.price[pNumber]) {
        row.elements.price.value = formatNum(yearData.price[pNumber]);
    } else if (pNumber === "") {
        row.elements.price.value = "";
    }
    
    row.elements.hFee.value = formatNum(yearData.handling_fee);

    // Calculate fields
    if (sdc !== 0) {
        const factor = csn / sdc;
        row.elements.factor.value = factor.toFixed(4);

        const limitVal = parseNum(row.elements.limit.value);
        const ultimate = limitVal * factor;
        row.elements.ultimate.value = formatNum(ultimate);

        const allowance = (15000 - ultimate) / 15000;
        row.elements.allowance.value = allowance.toFixed(4);

        const priceVal = parseNum(row.elements.price.value);
        const credit = priceVal * allowance;
        row.elements.credit.value = formatNum(credit, 2);

        const hFeeVal = parseNum(row.elements.hFee.value);
        const total = priceVal - credit + hFeeVal;
        row.elements.total.value = formatNum(total, 2);
    } else {
        ['factor', 'ultimate', 'allowance', 'credit', 'total'].forEach(f => row.elements[f].value = "");
    }
    
    updateTotalSum();
};

const updateTotalSum = () => {
    let sum = 0;
    rows.forEach(row => {
        sum += parseNum(row.elements.total.value);
    });
    totalSumValue.innerText = formatNum(sum, 2) + " $";
};

// UI Row Management
const createRow = () => {
    const tr = document.createElement('tr');
    const fields = [
        { name: 'pNumber', type: 'text', readonly: false },
        { name: 'price', type: 'text', readonly: true },
        { name: 'csn', type: 'text', readonly: false },
        { name: 'sdc', type: 'text', readonly: false },
        { name: 'factor', type: 'text', readonly: true },
        { name: 'limit', type: 'text', readonly: true },
        { name: 'ultimate', type: 'text', readonly: true },
        { name: 'allowance', type: 'text', readonly: true },
        { name: 'credit', type: 'text', readonly: true },
        { name: 'hFee', type: 'text', readonly: true },
        { name: 'total', type: 'text', readonly: true }
    ];

    const elements = {};
    fields.forEach(f => {
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'text';
        input.className = `input-field ${f.readonly ? 'readonly-field' : ''}`;
        if (f.readonly) input.readOnly = true;
        
        input.addEventListener('input', () => calculateRow({ elements }));
        
        td.appendChild(input);
        tr.appendChild(td);
        elements[f.name] = input;
    });

    calcTableBody.appendChild(tr);
    const rowObj = { tr, elements };
    rows.push(rowObj);
    return rowObj;
};

const addRow = () => {
    if (rows.length < 15) createRow();
};

const deleteRow = () => {
    if (rows.length > 1) {
        const row = rows.pop();
        row.tr.remove();
        updateTotalSum();
    }
};

// Reference Tables
const updateRefTable = (year, searchStr = "") => {
    const idx = year === "2025" ? 0 : 1;
    const tbody = refTableBodies[idx];
    const prices = LLP_DATA[year].price;
    const query = searchStr.toUpperCase();

    tbody.innerHTML = "";
    Object.keys(prices).sort().forEach(p => {
        if (p.includes(query)) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${p}</td><td style="text-align:right">${formatNum(prices[p])} $</td>`;
            tbody.appendChild(tr);
        }
    });
};

// Event Listeners
yearSelect.addEventListener('change', (e) => {
    currentYear = e.target.value;
    rows.forEach(calculateRow);
});

searchInputs.forEach((input, i) => {
    input.addEventListener('input', (e) => {
        updateRefTable(i === 0 ? "2025" : "2026", e.target.value);
    });
});

// Initialize
document.getElementById('add-btn').addEventListener('click', addRow);
document.getElementById('del-btn').addEventListener('click', deleteRow);

// Initial State
createRow(); // Create first row
updateRefTable("2025");
updateRefTable("2026");
