import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pdf_id: Number,
  csv_id: Number,
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
