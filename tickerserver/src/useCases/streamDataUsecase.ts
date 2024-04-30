import { StockEntity } from "../entities/stock";
import { StreamData } from "../entities/streamData";

export class StreamDataProcessor {
  static async sendUserStram(
    stockData: StockEntity,
    userInput: Number | null,
    senderFunction: (data: StreamData) => void
  ) {

    if(!userInput){
        senderFunction({ indecator: null, stock: stockData, userInput:null });
        return

    }

    if (userInput > stockData.bid) {
      senderFunction({ indecator: "more", stock: stockData, userInput });
    } else if (userInput < stockData.bid) {
      senderFunction({ indecator: "less", stock: stockData, userInput });
    } else if (userInput == stockData.bid) {
      senderFunction({ indecator: "equal", stock: stockData, userInput });
    }
  }
}
