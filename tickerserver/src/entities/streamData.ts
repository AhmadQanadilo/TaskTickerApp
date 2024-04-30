import { StockEntity } from "./stock";


export interface StreamData {
    stock:StockEntity, 
    userInput:Number | null, 
    indecator: "more" | "less" | "equal" | null
}