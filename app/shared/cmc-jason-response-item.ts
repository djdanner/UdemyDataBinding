// This is the format of the response you receive from calls to these urls:
//
//   Request all quotes:
//     https://api.coinmarketcap.com/v1/ticker/
//
//   Request a specific quote (you get an array with 1 entry):
//     https://api.coinmarketcap.com/v1/ticker/ethereum/
//
// This is a common, short-hand TypeScript syntax for defining these
// Class Properties and then initializing them via the Constructor.
// Basically the Property Declaration and Initialization code are combined.
export class cmcJasonResponseItem{
  constructor(
      public id: string;
      public name: string;
      public symbol: string;
      public rank:  string;
      public price_usd:  string;
      public price_btc:  string;
      public 24h_volume_usd:  string;
      public market_cap_usd:  string;
      public available_supply:  string;
      public total_supply:  string;
      public percent_change_1h:  string;
      public percent_change_24h:  string;
      public percent_change_7d:  string;
      public last_updated:  string;
      ){}
}

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
