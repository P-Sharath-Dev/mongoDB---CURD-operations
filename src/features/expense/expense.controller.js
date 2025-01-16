import ExpenseModel from "./expense.model.js";
import ExpenseRepository from "./expense.repository.js";

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    try {
      const { title, amount, date, isRecurring, tags } = req.body;
      const newExpense = new ExpenseModel(
        title,
        amount,
        date,
        isRecurring,
        tags
      );
      const result = await this.expenseRepository.addExpense(newExpense);
      return res.status(201).send(result);
    } catch (error) {
      res.status(500).send("error adding expense");
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    try {
      const id = req.params.id;
      const expenseById = await this.expenseRepository.getOne(id);
      return res.status(200).send(expenseById);
    } catch (error) {
      res.status(500).send("error in getting expense");
    }
  };

  // Get all expenses
  getAll = async (req, res) => {
    try {
      const result = await this.expenseRepository.getAllExpenses();
      return res.status(200).send(result);
    } catch (error) {
      res.status(500).send("error getting expenses");
    }
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    try {
      const { id } = req.params;
      const { tag } = req.body;
      const result = await this.expenseRepository.addTagToExpense(id, tag);
      return res.status(200).send(result);
    } catch (error) {
      res.status(500).send("error adding tag");
    }
  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
    try {
      const expense = await this.expenseRepository.filterExpenses(req.query);
      res.status(200).send(expense);
    } catch (error) {
      res.status(500).send("error filtering expenses");
    }
  };
}
