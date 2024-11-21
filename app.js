// 1. Retrieving the Bitcoin price from the exchange.
// 2. Initializing variables.
// 3. Obtaining the selection from the dropdown menu.
// 4. Randomly selecting a product upon button activation.
// 5. Adding products to the list.

// BTC Price Kraken https://api.kraken.com/0/public/Ticker?pair=XBTEUR

// Declare btcPrice
let btcPrice;

// Function to fetch data/BTC Price in USD from Kraken API
async function fetchData() {
    try {
        const response = await fetch('https://api.kraken.com/0/public/Ticker?pair=XBTUSD');
        const data = await response.json();

        // Check if the API request was successful
        if (data.error && data.error.length > 0) {
            throw new Error(data.error[0]);
            // Set a default value in case of an error
        }

        // Extract the last trade price (ask) from the API response
        btcPrice = data.result.XXBTZUSD.a[0];
        /* console.log(btcPrice);
        btcPrice = 80000;*/
        console.log(btcPrice);

        // Log the btcPrice to the console and print it On screen
        // console.log('BTC Price:', btcPrice);

        let liveBTCPrice = document.getElementById("liveBTCPrice");
        let formatedBTCPrice = parseFloat(btcPrice).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        liveBTCPrice.innerText = "Bitcoin / Euro: " + formatedBTCPrice + " $";

        // console.log(typeof formatedBTCPrice);
        // console.log(formatedBTCPrice);

        // Now you can use btcprice as needed in your application
    } catch (error) {
        console.error('Error fetching data from Kraken API:', error.message);
    }

};


// Call the fetchData function
fetchData();

// HTML Elementen Variable zuweisen
let artikel = document.getElementById("artikel");
let pruduktName = document.getElementById("gegenstand");
let betrag = document.getElementById("betrag");
let produktBild = document.getElementById("produktBild");
let bitcoinAmount = document.getElementById("bitcoinAmount");
let button = document.getElementById("button");
let buttonText = document.getElementById("buttonText");
let releasePrice = document.getElementById("releasePrice");
let releaseDate = document.getElementById("releaseDate");
let text3 = document.getElementById("text3");
let tooltip = document.getElementById("tooltip");

function buttonPress() {

    button.disabled = true;
    button.style.backgroundColor = 'rgba(247, 147, 26, 0.5)';
    tooltip.style.visibility = 'visible';

    let randombuttonText = Math.floor(Math.random() * buttonTextArray.length);
    buttonText.innerHTML = buttonTextArray[randombuttonText];

    console.log(randombuttonText);
    // Variabeln
    const randomProductArray = [];

    // If BTC != 100K disable family toggle
    if (btcPrice < 100_000) {
        document.getElementById('arrayFamily').checked = false;
        console.log(btcPrice);
    }

    // If  all unchecked just check Diverses
    if (!document.getElementById('arrayConsoles').checked && !document.getElementById('arraySmartphones').checked && !document.getElementById('arrayDiverses').checked && !document.getElementById('arrayFamily').checked && !document.getElementById('arrayCars').checked && !document.getElementById('arrayWhat').checked) {
        console.log("test1111");
        document.getElementById('arrayDiverses').checked = true;
        /*         document.getElementById('arrayWhat').checked = true;
         */
    }
    /*     console.log();
     */

    // Chcek checkbox selection
    if (document.getElementById('arrayConsoles').checked) {
        randomProductArray.push(...consoles);
    }

    if (document.getElementById('arraySmartphones').checked) {
        randomProductArray.push(...smartphones);
    }

    if (document.getElementById('arrayDiverses').checked) {
        randomProductArray.push(...diverses);
    }

    if (document.getElementById('arrayFamily').checked) {
        randomProductArray.push(...familyStuff);
    }

    if (document.getElementById('arrayCars').checked) {
        randomProductArray.push(...cars);
    }

    if (document.getElementById('arrayWhat').checked) {
        randomProductArray.push(...what);
    }

    let randomMaximum = randomProductArray.length;
    let randomIndex = Math.floor(Math.random() * randomMaximum);
    let randomProduct = randomProductArray[randomIndex];
    let btcMenge = randomProduct.bitcoinAmount.toLocaleString("en-US");
    // Ohne und mit tausender Punkte
    let satsMenge = (randomProduct.bitcoinAmount * 100000000).toLocaleString("en-US");
    let satsMenge2 = (randomProduct.bitcoinAmount * 100000000);
    let euroWertWenn = parseFloat(randomProduct.bitcoinAmount * btcPrice).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    let randomProductBild = randomProduct.produktBild;
    let randomProductArtikel = randomProduct.artikel;
    let randomProductGegenstand = randomProduct.pruduktName;
    // Ohne und mit tausender Punkte
    let randomProductOriginalPreis = (randomProduct.originalPreis).toLocaleString("en-US");
    let randomProductOriginalPreis2 = (randomProduct.originalPreis);
    let randomProductreleaseDatum = randomProduct.releaseDatum;
    let buyingPowerTodayBTC = (randomProductOriginalPreis2 / btcPrice).toFixed(8);
    // Ohne und mit tausender Punkte
    let buyingPowerTodaySats = parseInt((randomProductOriginalPreis2 / btcPrice) * 100000000).toLocaleString();
    let buyingPowerTodaySats2 = parseInt((randomProductOriginalPreis2 / btcPrice) * 100000000);
    let lessInPercent = (((((satsMenge2 - buyingPowerTodaySats2) / satsMenge2) * 100).toFixed(2)).toLocaleString()).replace('.', ',');
    let inPercent = ((((buyingPowerTodaySats2 / satsMenge2) * 100).toFixed(2)).toLocaleString()).replace('.', ',');

    /* console.log(inPercent);
    console.log(typeof inPercent); */

    // DOM Change
    artikel.innerText = randomProductArtikel;
    pruduktName.innerText = randomProductGegenstand;
/*     betrag.innerText = euroWertWenn;
 */    produktBild.src = randomProductBild;

    if (!document.getElementById('BTCtoSatsSwitch').checked) {
        bitcoinAmount.innerHTML = "" + btcMenge + " <span style='font-size: 12px;'> BTC</span>";
    } else {
        bitcoinAmount.innerHTML = "" + satsMenge + " <span style='font-size: 12px;'> sats</span>";
    }

    let percentChange = ((((btcPrice * randomProduct.bitcoinAmount) / randomProduct.originalPreis) * 100) - 100).toFixed(2);
    console.log(percentChange);

    releasePrice.innerHTML = "<b>Price:</b> " + " $ " + randomProductOriginalPreis + " " + "<u>(+ " + percentChange.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " %<u/>)";
    releaseDate.innerHTML = "<b>Date:</b> " + randomProductreleaseDatum;
    /*     text3.innerHTML = "<p style='margin-bottom: 15px;'><b>Mit anderen Worten: </b></p>Für " + randomProductOriginalPreis + "€ hättest du damals ~ " + satsMenge + " sats (~ " + btcMenge + " Bitcoin)<br> erwerben können, heute bekommst du für den gleichen Betrag 'nur' noch <br>~ " + buyingPowerTodaySats + " sats,  (~ " + buyingPowerTodayBTC + " Bitcoin), das sind " + lessInPercent + " % weniger. <br> Also 'nur' "  + inPercent + " % im verleich zu damals.";
     */

    // console.log(betrag, randomProduct.originalPreis, euroWertWenn)

    // Counter animation third try
    function counter(id, start, end) {
        let obj = document.getElementById(id);
        let current = start;

        let duration = 600; // Time in milliseconds for animation
        let steps = 60; // Number of steps for animation

        let increment = (end - start) / steps;
        let stepDuration = duration / steps;

        let timer = setInterval(function () {
            current += increment;

            obj.innerText =
                "$ " + current.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });

            if (current >= end) {
                // Ensure final value is accurate
                obj.innerText = "$ " + end.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                clearInterval(timer);

                // Animation is complete
                button.disabled = false;
                button.style.backgroundColor = 'rgba(247, 147, 26, 1)';
            }
        }, stepDuration);
    }

    counter("betrag", randomProduct.originalPreis, parseFloat(randomProduct.bitcoinAmount * btcPrice));

};


let buttonTextArray = [
    '"Bitcoin is too risky."',
    '"Bitcoin is too volatile" (yes, to the upside)"',
    '"Face the facts; I had to do it too!"',
    '"Bitcoin is worthless." Ok, give me one for free then."',
    '"Regretting won\'t change anything."',
    '"It\'s never too late."',
    '"Some just don\'t want to get it!"',
    '"But CNN told me Bitcoin is bad."',
    '"You just got lucky."',
    '"There is no second best." - Saylor"',
    '"Even Chuck Norris is impressed by this!"',
    '"I wish you had listened to me."',
    '"Some learn from mistakes; others not so much..."',
    '"To each their own..."',
    '"Do you want to continue ignoring it?"',
    '"When will you admit it to yourself?"',
    '"I think I screwed myself over..."',
    '"Will you keep turning a blind eye?"',
    '"Too unstable," they said..."',
    '"Regret won\'t buy you back those missed gains."',
    '"But my newsfeed told me Bitcoin\s a scam."',
    '"Critics talk while the world moves forward."',
    '"Even skeptics can\t ignore it forever!"',
    '"Did you really think it was just noise?"',
    '"When will you wake up to reality?"',
    '"Appreciate the lesson in missed chances."',
    '"Will you ever see the opportunity you ignored?"',
    '"The power of Bitcoin is in its idea."',
    '"The idea whose time has come cannot be stopped."'

];



let consoles = [
    {
        pruduktName: "Nintendo Switch OLED",
        artikel: "of of a",
        originalPreis: 349.99,
        bitcoinAmount: 0.00648516,
        releaseDatum: "08.10.2021",
        produktBild: "produkte/Konsolen/SwitchOLED.png"
    },
    {
        pruduktName: "Steam Deck (256 GB)",
        artikel: "of a",
        originalPreis: 549.00,
        bitcoinAmount: 0.01400002,
        releaseDatum: "25.02.2022",
        produktBild: "produkte/Konsolen/SteamDeck.png"
    },
    {
        pruduktName: "PlayStation 4",
        artikel: "of a",
        originalPreis: 399.00,
        bitcoinAmount: 0.69033531,
        releaseDatum: "15.11.13",
        produktBild: "produkte/Konsolen/PS4.png"
    },
    {
        pruduktName: "PlayStation 5",
        artikel: "of a",
        originalPreis: 499.00,
        bitcoinAmount: 0.02800682,
        releaseDatum: "19.11.2020",
        produktBild: "produkte/Konsolen/PS5.png"
    },
    {
        pruduktName: "PlayStation 5 (Digital Edition)",
        artikel: "of a",
        originalPreis: 399.00,
        bitcoinAmount: 0.02239423,
        releaseDatum: "19.11.2020",
        produktBild: "produkte/Konsolen/PS5D.png"
    },
    {
        pruduktName: "Xbox One",
        artikel: "of a",
        originalPreis: 499.00,
        bitcoinAmount: 0.49731906,
        releaseDatum: "22.11.2013",
        produktBild: "produkte/Konsolen/XboxOne.png"
    },
    {
        pruduktName: "Xbox Series X",
        artikel: "of a",
        originalPreis: 499.00,
        bitcoinAmount: 0.03263379,
        releaseDatum: "10.11.2020",
        produktBild: "produkte/Konsolen/XboxSeriesX.png"
    },
    {
        pruduktName: "Xbox Series S",
        artikel: "of a",
        originalPreis: 299.00,
        bitcoinAmount: 0.01955411,
        releaseDatum: "10.11.2020",
        produktBild: "produkte/Konsolen/XboxSeriesS.png"
    },
    {
        pruduktName: "Nintendo 3DS",
        artikel: "of a",
        originalPreis: 249.99,
        bitcoinAmount: 281.77412083,
        releaseDatum: "27.03.2011",
        produktBild: "produkte/Konsolen/3DS.png"
    },
    {
        pruduktName: "Wii U",
        artikel: "of a",
        originalPreis: 299.00,
        bitcoinAmount: 25.36047498,
        releaseDatum: "18.11.2012",
        produktBild: "produkte/Konsolen/WiiU.png"
    },
    {
        pruduktName: "Playstation Vita",
        artikel: "of a",
        originalPreis: 249.99,
        bitcoinAmount: 56.58442734,
        releaseDatum: "15.02.2012",
        produktBild: "produkte/Konsolen/PSVita.png"
    }
];

let smartphones = [
    {
        pruduktName: "iPhone 4",
        artikel: "of a",
        originalPreis: 599.00,
        bitcoinAmount: 14975.00000000,
        releaseDatum: "24.06.2010",
        produktBild: "produkte/Phones/iPhone4.png"
    },
    {
        pruduktName: "iPhone 5",
        artikel: "of a",
        originalPreis: 649.00,
        bitcoinAmount: 52.93637847,
        releaseDatum: "21.09.2012",
        produktBild: "produkte/Phones/iPhone5.png"
    },
    {
        pruduktName: "iPhone 6",
        artikel: "of a",
        originalPreis: 649.00,
        bitcoinAmount: 1.64387031,
        releaseDatum: "19.09.2014",
        produktBild: "produkte/Phones/iPhone6.png"
    },
    {
        pruduktName: "iPhone 7",
        artikel: "of a",
        originalPreis: 649.00,
        bitcoinAmount: 1.06924560,
        releaseDatum: "16.09.2016",
        produktBild: "produkte/Phones/iPhone7.png"
    },
    {
        pruduktName: "iPhone 8",
        artikel: "of a",
        originalPreis: 699.00,
        bitcoinAmount: 0.19252486,
        releaseDatum: "22.09.2017",
        produktBild: "produkte/Phones/iPhone8.png"
    },
    {
        pruduktName: "iPhone X",
        artikel: "of a",
        originalPreis: 999.00,
        bitcoinAmount: 0.13860062,
        releaseDatum: "03.11.2017",
        produktBild: "produkte/Phones/iPhoneX.png"
    },
    {
        pruduktName: "iPhone 11 Pro Max",
        artikel: "of a",
        originalPreis: 1099.00,
        bitcoinAmount: 0.10793939,
        releaseDatum: "20.09.2019",
        produktBild: "produkte/Phones/iPhone11ProMax.png"
    },
    {
        pruduktName: "iPhone 12 Pro Max",
        artikel: "of a",
        originalPreis: 1099.00,
        bitcoinAmount: 0.07060314,
        releaseDatum: "06.11.2020",
        produktBild: "produkte/Phones/iPhone12ProMax.png"
    },
    {
        pruduktName: "iPhone 13 Pro Max",
        artikel: "of a",
        originalPreis: 1099.00,
        bitcoinAmount: 0.02565374,
        releaseDatum: "24.09.2021",
        produktBild: "produkte/Phones/iPhone13ProMax.png"
    },
    {
        pruduktName: "iPhone 14 Pro Max",
        artikel: "of a",
        originalPreis: 1099.00,
        bitcoinAmount: 0.05140042,
        releaseDatum: "09.09.2022",
        produktBild: "produkte/Phones/iPhone14ProMax.png"
    },
    {
        pruduktName: "iPhone 15 Pro Max",
        artikel: "of a",
        originalPreis: 1199.00,
        bitcoinAmount: 0.04510983,
        releaseDatum: "22.09.2023",
        produktBild: "produkte/Phones/iPhone15ProMax.png"
    },
    {
        pruduktName: "Samsung Galaxy S10 Plus",
        artikel: "of a",
        originalPreis: 999.00,
        bitcoinAmount: 0.25607965,
        releaseDatum: "08.03.2019",
        produktBild: "produkte/Phones/GalaxyS10Plus.png"
    },
    {
        pruduktName: "Samsung Galaxy Note 20 Ultra 5G",
        artikel: "of a",
        originalPreis: 1299.00,
        bitcoinAmount: 0.11205530,
        releaseDatum: "21.08.2020",
        produktBild: "produkte/Phones/GalaxyNote20Ultra.png"
    },
    {
        pruduktName: "Samsung Galaxy Fold",
        artikel: "of a",
        originalPreis: 2100.00,
        bitcoinAmount: 0.20269194,
        releaseDatum: "13.09.2019",
        produktBild: "produkte/Phones/GalaxyFold.png"
    },
    {
        pruduktName: "Samsung Galaxy Note 10+",
        artikel: "of a",
        originalPreis: 1099.00,
        bitcoinAmount: 0.10559226,
        releaseDatum: "23.08.2019",
        produktBild: "produkte/Phones/GalaxyNote10Plus.png"
    }
];

let diverses = [
    {
        pruduktName: "Oculus Rift (CV1)",
        artikel: "of an",
        originalPreis: 599.00,
        bitcoinAmount: 1.41196992,
        releaseDatum: "28.03.2016",
        produktBild: "produkte/Diverses/OculusRiftCV1.png"
    },
    {
        pruduktName: "AirPods 1",
        artikel: "of",
        originalPreis: 159.00,
        bitcoinAmount: 0.20369991,
        releaseDatum: "13.12.2016",
        produktBild: "produkte/Diverses/AirPods1.png"
    },
    {
        pruduktName: "Apple Watch 42mm",
        artikel: "of an",
        originalPreis: 449.00,
        bitcoinAmount: 1.94145371,
        releaseDatum: "24.04.2015",
        produktBild: "produkte/Diverses/AppleWatch42mm.png"
    },
    {
        pruduktName: "Fitbit Ionic",
        artikel: "of a",
        originalPreis: 299.95,
        bitcoinAmount: 0.06811256,
        releaseDatum: "01.10.2017",
        produktBild: "produkte/Diverses/FitbitIonic.png"
    },
    {
        pruduktName: "Fitbit Charge 3",
        artikel: "of a",
        originalPreis: 149.99,
        bitcoinAmount: 0.02311382,
        releaseDatum: "20.10.2018",
        produktBild: "produkte/Diverses/FitbitCharge3.png"
    },
    {
        pruduktName: "Amazon Echo",
        artikel: "of an",
        originalPreis: 179.99,
        bitcoinAmount: 0.26535456,
        releaseDatum: "26.10.2016",
        produktBild: "produkte/Diverses/AmazonEcho.png"
    },
    {
        pruduktName: "Raspberry Pi 4 (4GB)",
        artikel: "of a",
        originalPreis: 45.00,
        bitcoinAmount: 0.00408679,
        releaseDatum: "24.06.2019",
        produktBild: "produkte/Diverses/RaspberryPi44GB.png"
    },
    {
        pruduktName: "Netflix (2015 - 2023)",
        artikel: "of",
        originalPreis: 1262.92,
        bitcoinAmount: 0.80726180,
        releaseDatum: "01.01.2015 - 12.12.2023",
        produktBild: "produkte/Diverses/NetflixStandard.png"
    },
    {
        pruduktName: "Spotify Premium (2015 - 2023)",
        artikel: "of",
        originalPreis: 1081.92,
        bitcoinAmount: 0.78499384,
        releaseDatum: "01.01.2015 - 12.12.2023",
        produktBild: "produkte/Diverses/SpotifyPremium.png"
    },
    {
        pruduktName: "Amazon Prime (2017 - 2023)",
        artikel: "of",
        originalPreis: 509.39,
        bitcoinAmount: 0.11437799,
        releaseDatum: "01.01.2017 - 12.12.2023",
        produktBild: "produkte/Diverses/AmazonPrime.png"
    },
    {
        pruduktName: "$ 10 T-Shirt",
        artikel: "of a",
        originalPreis: 10,
        bitcoinAmount: 0.04476075,
        releaseDatum: "08.02.2015",
        produktBild: "produkte/Diverses/10EuroShirt.png"
    },
    {
        pruduktName: "VanMoof S3",
        artikel: "of a",
        originalPreis: 1998.00,
        bitcoinAmount: 0.29039347,
        releaseDatum: "21.04.2020",
        produktBild: "produkte/Diverses/VanMoofS3.png"
    },
    {
        pruduktName: "GoPro Hero 3 Black",
        artikel: "of a",
        originalPreis: 399.00,
        bitcoinAmount: 31.22065728,
        releaseDatum: "01.10.2012",
        produktBild: "produkte/Diverses/GoProHero3Black.png"
    },
    {
        pruduktName: "GoPro Hero 6 Black",
        artikel: "of a",
        originalPreis: 499.00,
        bitcoinAmount: 0.11952869,
        releaseDatum: "28.09.2017",
        produktBild: "produkte/Diverses/GoProHero6Black.png"
    },
    {
        pruduktName: "GoPro Hero 9 Black",
        artikel: "of a",
        originalPreis: 529.00,
        bitcoinAmount: 0.04831496,
        releaseDatum: "17.09.2020",
        produktBild: "produkte/Diverses/GoProHero9Black.png"
    },
    {
        pruduktName: "GTA 5 (PS3)",
        artikel: "of",
        originalPreis: 49.99,
        bitcoinAmount: 0.37989209,
        releaseDatum: "17.09.2013",
        produktBild: "produkte/Diverses/GTA5PS3.png"
    },
    {
        pruduktName: "GTA 5 (PS4)",
        artikel: "of",
        originalPreis: 69.99,
        bitcoinAmount: 0.18654051,
        releaseDatum: "18.11.2014",
        produktBild: "produkte/Diverses/GTA5PS4.png"
    },
    {
        pruduktName: "GTA 5 (PC)",
        artikel: "of",
        originalPreis: 59.99,
        bitcoinAmount: 0.27372696,
        releaseDatum: "14.04.2015",
        produktBild: "produkte/Diverses/GTA5PC.png"
    },
    {
        pruduktName: "Minecraft (PC)",
        artikel: "of",
        originalPreis: 19.95,
        bitcoinAmount: 8.84936125,
        releaseDatum: "18.11.2011",
        produktBild: "produkte/Diverses/MinecraftPC.png"
    },
    {
        pruduktName: "Big Mac",
        artikel: "of a",
        originalPreis: 3.75,
        bitcoinAmount: 12.50000000,
        releaseDatum: "30.12.2010",
        produktBild: "produkte/Diverses/BigMac.png"
    },
    {
        pruduktName: "Call of Duty: Modern Warfare",
        artikel: "of",
        originalPreis: 59.99,
        bitcoinAmount: 0.00692669,
        releaseDatum: "25.10.2019",
        produktBild: "produkte/Diverses/CallofDutyModernWarfare.png"
    },
    {
        pruduktName: "Harry Potter Book",
        artikel: "of a",
        originalPreis: 20.00,
        bitcoinAmount: 0.03201639,
        releaseDatum: "31.07.2016",
        produktBild: "produkte/Diverses/HarryPotterunddasverwunscheneKindBuch.png"
    },
    {
        pruduktName: "Galaxy Watch Active 2 44mm",
        artikel: "of a",
        originalPreis: 299.00,
        bitcoinAmount: 0.03073185,
        releaseDatum: "23.09.2019",
        produktBild: "produkte/Diverses/GalaxyWatchActive244mm.png"
    },
    {
        pruduktName: "Galaxy Watch 4 44mm",
        artikel: "of a",
        originalPreis: 299.00,
        bitcoinAmount: 0.00609474,
        releaseDatum: "27.08.2021",
        produktBild: "produkte/Diverses/GalaxyWatch444mm.png"
    },
    {
        pruduktName: "Google Home",
        artikel: "of a",
        originalPreis: 129.00,
        bitcoinAmount: 0.18343927,
        releaseDatum: "04.11.2016",
        produktBild: "produkte/Diverses/GoogleHome.png"
    },
    {
        pruduktName: "AncestryDNA Kit",
        artikel: "of an",
        originalPreis: 99.00,
        bitcoinAmount: 0.10272480,
        releaseDatum: "31.12.2016",
        produktBild: "produkte/Diverses/AncestryDNAKit.png"
    },
    {
        pruduktName: "Keurig K-Elite",
        artikel: "of a",
        originalPreis: 169.99,
        bitcoinAmount: 0.01200800,
        releaseDatum: "31.12.2017",
        produktBild: "produkte/Diverses/KeurigKElite.png"
    },
    {
        pruduktName: "Nespresso VertuoLine",
        artikel: "of a",
        originalPreis: 299.95,
        bitcoinAmount: 1.25939455,
        releaseDatum: "09.09.2015",
        produktBild: "produkte/Diverses/NespressoVertuoLine.png"
    },
    {
        pruduktName: "Juicero Press",
        artikel: "of a",
        originalPreis: 699.00,
        bitcoinAmount: 1.67734504,
        releaseDatum: "31.03.2016",
        produktBild: "produkte/Diverses/JuiceroPress.png"
    },
    {
        pruduktName: "DJI Mavic Pro",
        artikel: "of a",
        originalPreis: 999.00,
        bitcoinAmount: 1.56423706,
        releaseDatum: "15.10.2016",
        produktBild: "produkte/Diverses/DJIMavicPro.png"
    },
    {
        pruduktName: "Kindle Oasis",
        artikel: "of a",
        originalPreis: 289.99,
        bitcoinAmount: 0.65211721,
        releaseDatum: "27.04.2016",
        produktBild: "produkte/Diverses/KindleOasis.png"
    },
    {
        pruduktName: "Oculus Quest (64GB)",
        artikel: "of an",
        originalPreis: 399.00,
        bitcoinAmount: 0.07385196,
        releaseDatum: "21.05.2019",
        produktBild: "produkte/Diverses/OculusQuest(64GB).png"
    },
    {
        pruduktName: "Sony PlayStation VR",
        artikel: "of a",
        originalPreis: 399.00,
        bitcoinAmount: 0.62658019,
        releaseDatum: "13.10.2016",
        produktBild: "produkte/Diverses/SonyPlayStationVR.png"
    },
    {
        pruduktName: "Fidget Spinner",
        artikel: "of a",
        originalPreis: 5.00,
        bitcoinAmount: 0.01561573,
        releaseDatum: "31.12.2014",
        produktBild: "produkte/Diverses/FidgetSpinner.png"
    },
    {
        pruduktName: "Glow-in-the-Dark Toilet Paper",
        artikel: "of a",
        originalPreis: 10.00,
        bitcoinAmount: 0.01037624,
        releaseDatum: "31.12.2016",
        produktBild: "produkte/Diverses/GlowintheDarkToiletPaper.png"
    },
    {
        pruduktName: "JBL Flip 4",
        artikel: "of a",
        originalPreis: 99.95,
        bitcoinAmount: 0.09920792,
        releaseDatum: "15.02.2017",
        produktBild: "produkte/Diverses/JBLFlip4.png"
    },
    {
        pruduktName: "MacBook Air M1 (2020)",
        artikel: "of a",
        originalPreis: 999.00,
        bitcoinAmount: 0.05661529,
        releaseDatum: "17.11.2020",
        produktBild: "produkte/Diverses/MacBookAirM1(2020).png"
    },
    {
        pruduktName: "MacBook Pro M1 (2020)",
        artikel: "of a",
        originalPreis: 1299.00,
        bitcoinAmount: 0.07361688,
        releaseDatum: "17.11.2020",
        produktBild: "produkte/Diverses/MacBookProM1(2020).png"
    },
    {
        pruduktName: "1 oz Gold Coin",
        artikel: "of a",
        originalPreis: 1839.70,
        bitcoinAmount: 0.11029469,
        releaseDatum: "03.01.2023",
        produktBild: "produkte/Diverses/1ozGold.png"
    },
    {
        pruduktName: "1 oz Silver Coin",
        artikel: "of a",
        originalPreis: 24.06,
        bitcoinAmount: 0.00144240,
        releaseDatum: "03.01.2023",
        produktBild: "produkte/Diverses/1ozSilver.png"
    },
    {
        pruduktName: "1 oz Platinum Coin",
        artikel: "of a",
        originalPreis: 1082.00,
        bitcoinAmount: 0.06486865,
        releaseDatum: "03.01.2023",
        produktBild: "produkte/Diverses/1ozPlatinum.png"
    },
    {
        pruduktName: "1 oz Gold",
        artikel: "of a",
        originalPreis: 1524.50,
        bitcoinAmount: 0.21823872,
        releaseDatum: "02.01.2020",
        produktBild: "produkte/Diverses/1ozGold.png"
    },
    {
        pruduktName: "1 oz Silver",
        artikel: "of a",
        originalPreis: 17.97,
        bitcoinAmount: 0.00257191,
        releaseDatum: "02.01.2020",
        produktBild: "produkte/Diverses/1ozSilver.png"
    }
    /* {
        pruduktName: "PornHub Premium",
        artikel: "of",
        originalPreis: 9.99,
        bitcoinAmount: 0.03178998,
        releaseDatum: "01.01.2015",
        produktBild: "produkte/Diverses/PornHubPremium.png"
    },
   {
        pruduktName: "",
        artikel: "of a",
        originalPreis: ,
        bitcoinAmount: ,
        releaseDatum: "",
        produktBild: "produkte/Diverses/"
    }*/
];

let familyStuff = [
    {
        pruduktName: "Mercedes W124",
        artikel: "of a",
        originalPreis: 25000.00,
        bitcoinAmount: 1.60496847,
        releaseDatum: "01.12.2020",
        produktBild: "produkte/FamilyStuff/MercedesW124.png"
    },
    {
        pruduktName: "Renault TRAFIC",
        artikel: "of a",
        originalPreis: 29000.000,
        bitcoinAmount: 0.78599391,
        releaseDatum: "17.03.2022",
        produktBild: "produkte/FamilyStuff/RenaultTRAFIC.png"
    },
    {
        pruduktName: "Rooftop Tent",
        artikel: "of a",
        originalPreis: 1370.00,
        bitcoinAmount: 0.05776248,
        releaseDatum: "14.08.2022",
        produktBild: "produkte/FamilyStuff/RooftopTent.png"
    },
    {
        pruduktName: "Skyteam Gorilla 125",
        artikel: "of a",
        originalPreis: 1000.00,
        bitcoinAmount: 0.04067496,
        releaseDatum: "09.06.2023",
        produktBild: "produkte/FamilyStuff/SkyteamGorilla125.png"
    },
    {
        pruduktName: "New Front Door",
        artikel: "of a",
        originalPreis: 3150.00,
        bitcoinAmount: 0.12253705,
        releaseDatum: "05.04.2023",
        produktBild: "produkte/FamilyStuff/NewFrontDoor.png"
    },
    {
        pruduktName: '"New" Living Room Furniture',
        artikel: "of",
        originalPreis: 6000.00,
        bitcoinAmount: 0.23340391,
        releaseDatum: "05.04.2023",
        produktBild: "produkte/FamilyStuff/NewLivingRoomFurniture.png"
    },
    {
        pruduktName: "Carport (~45qm)",
        artikel: "of a",
        originalPreis: 2500.00,
        bitcoinAmount: 0.42788437,
        releaseDatum: "19.06.2018",
        produktBild: "produkte/FamilyStuff/Carport.png"
    },
    {
        pruduktName: "Carport Extension (~30qm)",
        artikel: "of a",
        originalPreis: 2500.00,
        bitcoinAmount: 0.04281865,
        releaseDatum: "01.07.2024",
        produktBild: "produkte/FamilyStuff/CarportExtension.png"
    },
    {
        pruduktName: "Angel Juicer 7500",
        artikel: "of an",
        originalPreis: 1329.00,
        bitcoinAmount: 0.05224958,
        releaseDatum: "30.09.2023",
        produktBild: "produkte/FamilyStuff/AngelJuicer7500.png"
    },
    {
        pruduktName: "Diesel Generator",
        artikel: "of a",
        originalPreis: 1444.53,
        bitcoinAmount: 0.02864884,
        releaseDatum: "27.10.2021",
        produktBild: "produkte/FamilyStuff/DieselGenerator.png"
    },
    {
        pruduktName: "Guitar",
        artikel: "of a",
        originalPreis: 250.00,
        bitcoinAmount: 0.01093563,
        releaseDatum: "04.05.2022",
        produktBild: "produkte/FamilyStuff/Guitar.png"
    },
    {
        pruduktName: "Silhouette Cameo 4",
        artikel: "of a",
        originalPreis: 288.40,
        bitcoinAmount: 0.00975806,
        releaseDatum: "30.06.2021",
        produktBild: "produkte/FamilyStuff/SilhouetteCameo4.png"
    },
    {
        pruduktName: "EPSON EcoTank ET-2850",
        artikel: "of an",
        originalPreis: 271.26,
        bitcoinAmount: 0.01395286,
        releaseDatum: "02.10.2022",
        produktBild: "produkte/FamilyStuff/EPSONEcoTankET-2850.png"
    },
    {
        pruduktName: "New Setup / PC", /*  (for my room) */
        artikel: "of",
        originalPreis: 2500.00,
        bitcoinAmount: 0.11876462,
        releaseDatum: "30.01.2023",
        produktBild: "produkte/FamilyStuff/NewFurniture.png"
    },
    {
        pruduktName: "Herman Miller - Sayl",
        artikel: "of a",
        originalPreis: 612.00,
        bitcoinAmount: 0.03903390,
        releaseDatum: "28.11.2022",
        produktBild: "produkte/FamilyStuff/HermanMillerSayl.png"
    },
    {
        pruduktName: "Stuff (I - [In total])",
        artikel: "of",
        originalPreis: 4585.66,
        bitcoinAmount: 0.26733033,
        releaseDatum: "25.08.2020 - 19.7.2024",
        produktBild: "produkte/FamilyStuff/StuffI.png"
    },
    {
        pruduktName: "Stuff (Brother - [In total])",
        artikel: "of",
        originalPreis: 77597.12,
        bitcoinAmount: 3.52213196,
        releaseDatum: "25.08.2020 - 19.7.2024",
        produktBild: "produkte/FamilyStuff/StuffBrother.png"
    },
    {
        pruduktName: "Stuff (Parents - [In total])",
        artikel: "of",
        originalPreis: 22473.19,
        bitcoinAmount: 1.10845166,
        releaseDatum: "19.06.2018 - 19.7.2024",
        produktBild: "produkte/FamilyStuff/StuffParents.png"
    },
    {
        pruduktName: "Safe",
        artikel: "of a",
        originalPreis: 1500.00,
        bitcoinAmount: 0.15619420,
        releaseDatum: "25.08.2020",
        produktBild: "produkte/FamilyStuff/Safe.png"
    },
    {
        pruduktName: "1 kg Silver Koala Coin",
        artikel: "of a",
        originalPreis: 787.77,
        bitcoinAmount: 0.08568930,
        releaseDatum: "25.09.2020",
        produktBild: "produkte/FamilyStuff/1kgSilberKoala.png"
    },
    {
        pruduktName: "1 oz Gold Coin",
        artikel: "of a",
        originalPreis: 1658.84,
        bitcoinAmount: 0.11152840,
        releaseDatum: "17.11.2020",
        produktBild: "produkte/FamilyStuff/1ozGold.png"
    }


    /*
    {
        pruduktName: "Stuff (Parents)",
        artikel: "of",
        originalPreis: 19763.53,
        bitcoinAmount: 1.01484284,
        releaseDatum: "19.06.2018 - NOW",
        produktBild: "produkte/FamilyStuff/"
    } */
];

let cars = [
    {
        pruduktName: "Toyota Camry",
        artikel: "of a",
        originalPreis: 25045.00,
        bitcoinAmount: 1.76916448,
        releaseDatum: "31.12.2017",
        produktBild: "produkte/Cars/ToyotaCamry(XV70)Sedan2017.png"
    },
    {
        pruduktName: "Nissan Altima",
        artikel: "of a",
        originalPreis: 24000.00,
        bitcoinAmount: 6.41248297,
        releaseDatum: "31.12.2018",
        produktBild: "produkte/Cars/NissanAltima(L34)Sedan2018.png"
    },
    {
        pruduktName: "Hyundai Sonata",
        artikel: "of a",
        originalPreis: 23600.00,
        bitcoinAmount: 3.28069395,
        releaseDatum: "31.12.2019",
        produktBild: "produkte/Cars/HyundaiSonata(DN8)Sedan2019.png"
    },
    {
        pruduktName: "Toyota RAV4",
        artikel: "of a",
        originalPreis: 29990.00,
        bitcoinAmount: 4.16898354,
        releaseDatum: "31.12.2019",
        produktBild: "produkte/Cars/ToyotaRAV4(XA5)SUV2019.png"
    },
    {
        pruduktName: "Nissan Rogue",
        artikel: "of a",
        originalPreis: 26050.00,
        bitcoinAmount: 0.56255662,
        releaseDatum: "31.12.2021",
        produktBild: "produkte/Cars/NissanRogue(T33)SUV2021.png"
    },
    {
        pruduktName: "Mazda MX-30",
        artikel: "of a",
        originalPreis: 33470.00,
        bitcoinAmount: 1.15406948,
        releaseDatum: "31.12.2020",
        produktBild: "produkte/Cars/MazdaMX-30(DR)SUV2020.png"
    },
    {
        pruduktName: "GMC Acadia",
        artikel: "of a",
        originalPreis: 29070.00,
        bitcoinAmount: 30.16373711,
        releaseDatum: "31.12.2016",
        produktBild: "produkte/Cars/GMCAcadiaSUV2016.png"
    },
    {
        pruduktName: "Jeep Grand Cherokee",
        artikel: "of a",
        originalPreis: 36995.00,
        bitcoinAmount: 0.79891678,
        releaseDatum: "31.12.2021",
        produktBild: "produkte/Cars/JeepGrandCherokeeL(WL)SUVL2021.png"
    },
    {
        pruduktName: "RAM 1500",
        artikel: "of a",
        originalPreis: 34595.00,
        bitcoinAmount: 9.24332701,
        releaseDatum: "31.12.2018",
        produktBild: "produkte/Cars/RAM1500Pick-upCrewCab5.72018.png"
    },
    {
        pruduktName: "Toyota Tacoma",
        artikel: "of a",
        originalPreis: 24490.00,
        bitcoinAmount: 56.87809183,
        releaseDatum: "31.12.2015",
        produktBild: "produkte/Cars/ToyotaTacoma(N300)Pick-upDoubleCab2015.png"
    },
    {
        pruduktName: "Toyota Tundra",
        artikel: "of a",
        originalPreis: 32480.00,
        bitcoinAmount: 101.43977014,
        releaseDatum: "31.12.2014",
        produktBild: "produkte/Cars/ToyotaTundra(XK50)Pick-upCrewMax2014.png"
    },
    {
        pruduktName: "Ford F-350",
        artikel: "of a",
        originalPreis: 37305.00,
        bitcoinAmount: 38.70857285,
        releaseDatum: "31.12.2016",
        produktBild: "produkte/Cars/FordF-350(P558)Pick-upCrewCab2016.png"
    },
    {
        pruduktName: "Tesla Model 3",
        artikel: "of a",
        originalPreis: 44000.00,
        bitcoinAmount: 3.10813484,
        releaseDatum: "31.12.2017",
        produktBild: "produkte/Cars/TeslaModel3Sedan2017.png"
    },
    {
        pruduktName: "Ford Mustang Mach-E",
        artikel: "of a",
        originalPreis: 62250.00,
        bitcoinAmount: 1.34430517,
        releaseDatum: "31.12.2021",
        produktBild: "produkte/Cars/FordMustangMach-E(LSK)SUV2021.png"
    },
    {
        pruduktName: "Tesla Model S",
        artikel: "of a",
        originalPreis: 68000.00,
        bitcoinAmount: 70.55844937,
        releaseDatum: "31.12.2016",
        produktBild: "produkte/Cars/TeslaModelSLiftback2016.png"
    },
    {
        pruduktName: "Rivian R1S",
        artikel: "of a",
        originalPreis: 78000.00,
        bitcoinAmount: 4.71370298,
        releaseDatum: "31.12.2022",
        produktBild: "produkte/Cars/RivianR1SSUV2022.png"
    },
    {
        pruduktName: "Mercedes-Benz CLE",
        artikel: "of a",
        originalPreis: 65000.00,
        bitcoinAmount: 1.53790862,
        releaseDatum: "31.12.2023",
        produktBild: "produkte/Cars/Mercedes-BenzCLE(C236)Coupé2023.png"
    },
    {
        pruduktName: "Ford Mustang",
        artikel: "of a",
        originalPreis: 27155.00,
        bitcoinAmount: 7.25545729,
        releaseDatum: "31.12.2018",
        produktBild: "produkte/Cars/FordMustang(LAE)Coupé2018.png"
    },
    {
        pruduktName: "Chrysler Pacifica",
        artikel: "of a",
        originalPreis: 35820.00,
        bitcoinAmount: 0.77354235,
        releaseDatum: "31.12.2021",
        produktBild: "produkte/Cars/ChryslerPacificaMinivan2021.png"
    },
    {
        pruduktName: "Porsche Taycan",
        artikel: "of a",
        originalPreis: 133300.00,
        bitcoinAmount: 18.53036032,
        releaseDatum: "31.12.2019",
        produktBild: "produkte/Cars/PorscheTaycanSportTurismo(Y1A)Estate2019.png"
    },
    {
        pruduktName: "Land Rover Range Rover Velar",
        artikel: "of a",
        originalPreis: 56900.00,
        bitcoinAmount: 4.01938346,
        releaseDatum: "31.12.2017",
        produktBild: "produkte/Cars/LandRoverRangeRoverVelar(L560)SUV2017.png"
    }
];

let what = [
    {
        pruduktName: "Dinosaur Taco Holder",
        artikel: "of a",
        originalPreis: 20.00,
        bitcoinAmount: 67.65899865,
        releaseDatum: "31.12.2010",
        produktBild: "produkte/What/DinosaurTacoHolder.png"
    },
    {
        pruduktName: "Giant Inflatable T-Rex Costume",
        artikel: "of a",
        originalPreis: 60.00,
        bitcoinAmount: 0.13935016,
        releaseDatum: "31.12.2015",
        produktBild: "produkte/What/GiantInflatableTRexCostume.png"
    },
    {
        pruduktName: "Toilet Coffee Mug",
        artikel: "of a",
        originalPreis: 25.00,
        bitcoinAmount: 84.57374831,
        releaseDatum: "31.12.2010",
        produktBild: "produkte/What/ToiletCoffeeMug.png"
    },
    {
        pruduktName: "Farting Animals Coloring Book",
        artikel: "of a",
        originalPreis: 15.00,
        bitcoinAmount: 0.03483754,
        releaseDatum: "31.12.2015",
        produktBild: "produkte/What/FartingAnimalsColoringBook.png"
    },
    {
        pruduktName: "Unicorn Meat (Canned)",
        artikel: "of an",
        originalPreis: 20.00,
        bitcoinAmount: 67.65899865,
        releaseDatum: "31.12.2010",
        produktBild: "produkte/What/UnicornMeat(Canned).png"
    },
    {
        pruduktName: "Glow-in-the-Dark Toilet Paper",
        artikel: "of a",
        originalPreis: 10.00,
        bitcoinAmount: 0.01037624,
        releaseDatum: "31.12.2016",
        produktBild: "produkte/What/GlowintheDarkToiletPaper.png"
    },
    {
        pruduktName: "Yodeling Pickle",
        artikel: "of a",
        originalPreis: 15.00,
        bitcoinAmount: 50.74424899,
        releaseDatum: "31.12.2010",
        produktBild: "produkte/What/YodelingPickle.png"
    },
    {
        pruduktName: "Pickle Flavored Cotton Candy",
        artikel: "of a",
        originalPreis: 15.00,
        bitcoinAmount: 0.03483754,
        releaseDatum: "31.12.2015",
        produktBild: "produkte/What/PickleFlavoredCottonCandy.png"
    },
    {
        pruduktName: "Inflatable Baby Costume",
        artikel: "of an",
        originalPreis: 50.00,
        bitcoinAmount: 0.11612514,
        releaseDatum: "31.12.2015",
        produktBild: "produkte/What/InflatableBabyCostume.png"
    },
    {
        pruduktName: "Bacon Air Freshener",
        artikel: "of a",
        originalPreis: 10.00,
        bitcoinAmount: 33.82949932,
        releaseDatum: "31.12.2010",
        produktBild: "produkte/What/BaconAirFreshener.png"
    },
    {
        pruduktName: "USB Pet Rock",
        artikel: "of an",
        originalPreis: 29.99,
        bitcoinAmount: 0.00416898,
        releaseDatum: "28.02.2019",
        produktBild: "produkte/What/USBPetRock.png"
    },
    {
        pruduktName: "Screaming Goat Figure",
        artikel: "of a",
        originalPreis: 20.00,
        bitcoinAmount: 0.04645005,
        releaseDatum: "31.12.2015",
        produktBild: "produkte/What/ScreamingGoatFigure.png"
    },
    {
        pruduktName: "Inflatable Sumo Wrestler Costume",
        artikel: "of an",
        originalPreis: 60.00,
        bitcoinAmount: 0.06225746,
        releaseDatum: "31.12.2016",
        produktBild: "produkte/What/InflatableSumoWrestlerCostume.png"
    },
    {
        pruduktName: "Emergency Underpants in a Tin",
        artikel: "of an",
        originalPreis: 15.00,
        bitcoinAmount: 0.03483754,
        releaseDatum: "31.12.2015",
        produktBild: "produkte/What/EmergencyUnderpantsInATin.png"
    },
    {
        pruduktName: "Squirrel Underpants for Squirrels",
        artikel: "of a",
        originalPreis: 25.00,
        bitcoinAmount: 0.05806257,
        releaseDatum: "31.12.2015",
        produktBild: "produkte/What/SquirrelUnderpantsForSquirrels.png"
    },
    {
        pruduktName: "Remote Control Flying Shark",
        artikel: "of a",
        originalPreis: 60.00,
        bitcoinAmount: 0.00423837,
        releaseDatum: "31.12.2017",
        produktBild: "produkte/What/RemoteControlFlyingShark.png"
    }
]

// console.log(consoles[1].originalPreis);

document.addEventListener('DOMContentLoaded', function () {
    const trigger = document.getElementById('trigger');
    const overlay = document.getElementById('overlay');

    trigger.addEventListener('click', function () {
        overlay.style.display = 'flex';
    });

    overlay.addEventListener('click', function () {
        overlay.style.display = 'none';
    });
});


