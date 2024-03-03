
const apiUrl="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let data = [];

async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch(apiUrl);
        data = await response.json();
        renderTable(data);
    } catch (e) {
        console.log(`getting error with API ${e}`)
    }
}

// Render table
const table = document.getElementById('cryptoTable');
function renderTable(data) {

    table.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        const tr = document.createElement('tr');
        const twenty24HrChange = data[i].price_change_percentage_24h;
        const percentage = twenty24HrChange <= 0 ? "negative" : "positive";
        tr.innerHTML = `
            <td><img src="${data[i].image}" alt="" width="30px"> ${data[i].id}</td>
            <td>${data[i].symbol}</td>
            <td>${data[i].current_price}</td>
            <td>${data[i].total_volume}</td>
            <td class="${percentage}">${twenty24HrChange}</td>
            <td>Mkt Cap: ${data[i].market_cap}</td>
        `;
        table.appendChild(tr);
    }
   
}


const search = document.getElementById("search");
const sortByMktCap = document.getElementById('sort1');
const sortByPercentage = document.getElementById('sort2');


function addEventListner() {
    sortByMktCap.addEventListener('click', ()=> {
        const sortedByMktCap = data.sort((a, b) => b.market_cap - a.market_cap)
        renderTable(sortedByMktCap)
    });


    sortByPercentage.addEventListener('click', ()=> {
        const sortByPercentage = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        renderTable(sortByPercentage)
    });

    search.addEventListener('keyup', () =>{
        const searchItem = search.ariaValueMax.toLowerCase();
        const filterdata = data.filter(item => {
            const itemName = item.name.toLowerCase();
            const itemSymbol = item.symbol.toLowerCase();
            return itemName.includes(searchItem) || itemSymbol.includes(searchItem);
        })
        renderTable(filterdata);

    })

}







fetchDataWithAsyncAwait();
