import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bankstatement_pdf: String,
  bankstatement_csv: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
