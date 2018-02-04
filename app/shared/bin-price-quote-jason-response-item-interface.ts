// Price Quote - Specific Crypto Pair
// ----------------------------------
// Example appi call:
//    https://api.binance.com/api/v1/ticker/price?symbol=ADAETH
// Returns:
//    {"symbol":"ADAETH","price":"0.00045441"}


export interface binancePriceQuoteJasonResponseItemInterface{
    symbol: string; // ex: "ADAETH"
    price:  number; // ex: 1.234567
}
