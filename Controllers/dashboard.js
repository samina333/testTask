import status from 'http-status';
import Model from '../Models/Model';

const getInvoiceSummary = async (req, res, next) => {
    try {
        const invoice = await Model.InvoiceModel.findOne({ userId: req.user._id });
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice data not found.' });
        }

        res.status(200).json({
            totalInvoices: invoice.totalInvoices,
            percentageGrowth: invoice.percentageGrowth,
        });
    } catch (error) {
        next(error);
    }
};

const getInvoiceDetails = async (req, res, next) => {
    try {
        const invoice = await Model.InvoiceModel.findOne({ userId: req.user._id });
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice details not found.' });
        }

        res.status(200).json({ details: invoice.details });
    } catch (error) {
        next(error);
    }
};

const getDashboardOverview = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const [income, expense, tax, invoice] = await Promise.all([
            Model.IncomeModel.findOne({ userId }),
            Model.ExpenseModel.findOne({ userId }),
            Model.TaxModel.findOne({ userId }),
            Model.InvoiceModel.findOne({ userId }),
        ]);

        if (!income || !expense || !tax || !invoice) {
            return res.status(404).json({ message: 'Dashboard data not fully available.' });
        }

        res.status(200).json({
            income: {
                currentIncome: income.currentIncome,
                percentageChange: income.percentageChange,
            },
            expenses: {
                currentExpense: expense.currentExpense,
                percentageChange: expense.percentageChange,
            },
            taxes: {
                currentTax: tax.currentTax,
                percentageChange: tax.percentageChange,
            },
            invoices: {
                totalInvoices: invoice.totalInvoices,
                percentageGrowth: invoice.percentageGrowth,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getGraphData = async (req, res) => {
    const { type, timeframe } = req.query;
  
    // Validate query parameters
    if (!type || !timeframe) {
      return res.status(400).json({ error: 'Missing required query parameters: type and timeframe' });
    }
  
    let startDate, endDate;
  
    // Determine the date range based on the timeframe
    const now = new Date();
    if (timeframe === 'quarterly') {
      startDate = startOfQuarter(now);
      endDate = endOfQuarter(now);
    } else if (timeframe === 'monthly') {
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
    } else {
      return res.status(400).json({ error: 'Unsupported timeframe. Use "quarterly" or "monthly".' });
    }
  
    try {
      let data = [];
  
      // Select the appropriate model and query based on the type
      if (type === 'income') {
        data = await IncomeModel.find({
          date: { $gte: startDate, $lte: endDate },
        }).sort({ date: 1 });
      } else if (type === 'expenses') {
        data = await ExpenseModel.find({
          date: { $gte: startDate, $lte: endDate },
        }).sort({ date: 1 });
      } else if (type === 'taxes') {
        data = await TaxModel.find({
          date: { $gte: startDate, $lte: endDate },
        }).sort({ date: 1 });
      } else if (type === 'invoices') {
        data = await InvoiceModel.find({
          date: { $gte: startDate, $lte: endDate },
        }).sort({ date: 1 });
      } else {
        return res.status(400).json({ error: 'Unsupported type. Use "income", "expenses", "taxes", or "invoices".' });
      }
  
      // Transform data into a format suitable for graphs
      const graphData = data.map(item => ({
        date: item.date,
        amount: item.amount,
      }));
  
      return res.status(200).json({ data: graphData });
    } catch (error) {
      console.error('Error fetching graph data:', error);
      return res.status(500).json({ error: 'An error occurred while fetching graph data.' });
    }
}

export default {getInvoiceSummary,  getInvoiceDetails, getDashboardOverview, getGraphData}