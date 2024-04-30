import { StockEntity } from "../entities/stock";

export function convertStockListToObject(inputList: any[]): StockEntity | null {

    if(inputList[1] === 'hb'){
        return null;
    }

    const [channel_id, [bid, bid_size, ask, ask_size, daily_change, daily_change_perc, last_price, volume, high, low]] = inputList;
    
    return {
        channel_id,
        bid,
        bid_size,
        ask,
        ask_size,
        daily_change,
        daily_change_perc,
        last_price,
        volume,
        high,
        low
    };
}
