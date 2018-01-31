// This is the format of the response you receive from calls to these urls:
//
//   Request all quotes:
//     https://api.coinmarketcap.com/v1/ticker/
//
//   Request a specific quote (you get an array with 1 entry):
//     https://api.coinmarketcap.com/v1/ticker/ethereum/
//
// I can't figure-out how to define a type for the JSON obj returned
// by cmc because one of the fields starts with a #, and the compiler
// doesn't allow that!!!  So I denied this as type "any", so then
// compiler will figure-out what it is, and it seems to work.
//
export class cmcJasonResponseItem{
    id:                 string; // ex: "bitcoin"
    name:               string; // ex: "Bitcoin"
    symbol:             string; // ex: "BTC"
    rank:               number; // ex: 1
    price_usd:          number; // ex: 1234.567
    price_btc:          number; // ex: 0.1234
    // public 24h_volume_usd:  string; // How to handle this ???
    market_cap_usd:     number; // ex: 123456789.0
    available_supply:   number; // ex: 123456789.0
    total_supply:       number; // ex: 123456789.0
    percent_change_1h:  number; // ex: 10.123
    percent_change_24h: number; // ex: 10.123
    percent_change_7d:  number; // ex: 10.123
    last_updated:       number; // ex: 12345678 // Unix Timestamp: UTC in seconds (not  mS) from 1970-01-01
}

//         "id": "bitcoin",
//         "name": "Bitcoin",
//         "symbol": "BTC",
//         "rank": "1",
//         "price_usd": "573.137",
//         "price_btc": "1.0",
//         "24h_volume_usd": "72855700.0",
//         "market_cap_usd": "9080883500.0",
//         "available_supply": "15844176.0",
//         "total_supply": "15844176.0",
//         "percent_change_1h": "0.04",
//         "percent_change_24h": "-0.3",
//         "percent_change_7d": "-0.57",
//         "last_updated": "1472762067"

// export class cmcJasonResponseItem{
//   constructor(
//       public id: string;
//       public name: string;
//       public symbol: string;
//       public rank:  string;
//       public price_usd:  string;
//       public price_btc:  string;
//       // public 24h_volume_usd:  string;
//       public market_cap_usd:  string;
//       public available_supply:  string;
//       public total_supply:  string;
//       public percent_change_1h:  string;
//       public percent_change_24h:  string;
//       public percent_change_7d:  string;
//       public last_updated:  string;
//       ){}
// }

// // This kinda works ???
// export class cmcJasonResponseItem{
//   constructor(
//       public id: string,
//       public name: string,
//       public symbol: string,
//       public rank:  number,
//       public price_usd:  number,
//       public price_btc:  number,
//       // public 24h_volume_usd:  number,
//       public market_cap_usd:  number,
//       public available_supply:  number,
//       public total_supply:  number,
//       public percent_change_1h:  number,
//       public percent_change_24h:  number,
//       public percent_change_7d:  number,
//       public last_updated:  number
//       ){}
//}



// This is a common, short-hand TypeScript syntax for defining these
// Class Properties and then initializing them via the Constructor.
// Basically the Property Declaration and Initialization code are combined.
//
// export class cmcJasonResponseItem{
//   constructor(
//       public id: string;
//       public name: string;
//       public symbol: string;
//       public rank:  string;
//       public price_usd:  string;
//       public price_btc:  string;
//       // public 24h_volume_usd:  string;
//       public market_cap_usd:  string;
//       public available_supply:  string;
//       public total_supply:  string;
//       public percent_change_1h:  string;
//       public percent_change_24h:  string;
//       public percent_change_7d:  string;
//       public last_updated:  string;
//       ){}
// }

// Example response from server.
// [
//     {
//         "id": "bitcoin",
//         "name": "Bitcoin",
//         "symbol": "BTC",
//         "rank": "1",
//         "price_usd": "573.137",
//         "price_btc": "1.0",
//         "24h_volume_usd": "72855700.0",
//         "market_cap_usd": "9080883500.0",
//         "available_supply": "15844176.0",
//         "total_supply": "15844176.0",
//         "percent_change_1h": "0.04",
//         "percent_change_24h": "-0.3",
//         "percent_change_7d": "-0.57",
//         "last_updated": "1472762067"
//     },
//     {
//         "id": "ethereum",
//         "name": "Ethereum",
//         "symbol": "ETH",
//         "rank": "2",
//         "price_usd": "12.1844",
//         "price_btc": "0.021262",
//         "24h_volume_usd": "24085900.0",
//         "market_cap_usd": "1018098455.0",
//         "available_supply": "83557537.0",
//         "total_supply": "83557537.0",
//         "percent_change_1h": "-0.58",
//         "percent_change_24h": "6.34",
//         "percent_change_7d": "8.59",
//         "last_updated": "1472762062"
//     },
//     ...
// ]
