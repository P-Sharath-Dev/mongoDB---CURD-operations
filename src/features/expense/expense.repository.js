import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    const db = getDB();
    const collection = db.collection("expenses");
    await collection.insertOne(expense);
    //return await collection.findOne({ _id: new ObjectId(result.insertedId) });
    // console.log("result", result);
    return expense;
  }

  // Get one expnese by its ID
  async getOne(id) {
    const db = getDB();
    const collection = db.collection("expenses");
    const result = await collection.findOne({
      _id: new ObjectId(id),
    });
    return result;
  }

  // Get all expenses
  async getAllExpenses() {
    const db = getDB();
    const collection = db.collection("expenses");
    const result = await collection.find().toArray();
    return result;
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    const db = getDB();
    const collection = db.collection("expenses");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $push: { tags: tag } }
    );

    return "Tag added successfully";
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    const db = getDB();
    const collection = db.collection("expenses");
    let query = {};
    if (criteria.minAmount || criteria.maxAmount) {
      query.amount = {};
      if (criteria.minAmount) {
        query.amount.$gte = parseFloat(criteria.minAmount);
      }
      if (criteria.maxAmount) {
        query.amount.$lte = parseFloat(criteria.maxAmount);
      }
    }
    if (criteria.isRecurring !== undefined) {
      query.isRecurring = criteria.isRecurring === "true";
    }
    const expense = await collection.find(query).toArray();
    return expense;
  }
}

export default ExpenseRepository;
