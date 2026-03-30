import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  google_id: {
    type: String,
    required: true,
    ref: "User",
  },
  bankstatement_pdf: String,
  bankstatement_csv: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
