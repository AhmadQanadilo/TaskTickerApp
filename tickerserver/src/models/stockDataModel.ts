import mongoose , { Document,  model } from "mongoose";
import { StockEntity } from "../entities/stock";



interface StockDataModel extends mongoose.Model<StockDataDocument> {
  build(attrs: StockEntity): StockDataDocument;
}


export interface StockDataDocument extends mongoose.Document {
  timestamp: Date;
}

const StockDataSchema = new mongoose.Schema(
  {
    channel_id: {
      type: String,
      required: true,
    },
    bid: {
      type: Number,
      required: true,
    },
    bid_size: {
      type: Number,
      required: true,
    },

    ask: {
      type: Number,
      required: true,
    },

    ask_size: {
      type: Number,
      required: true,
    },

    daily_change: {
      type: Number,
      required: true,
    },
    daily_change_perc: {
      type: Number,
      required: true,
    },
    last_price: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
    low: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

StockDataSchema.statics.build = (attrs: StockEntity) => {
  return new Stock(attrs);
};

const Stock = model<StockDataDocument, StockDataModel>('Stock', StockDataSchema);

export { Stock };

//------builder functions --------------------------------
export const StockBuilder = async (data:StockEntity) => {

  const newStock = Stock.build(data)
  await newStock.save()

  return newStock
}


