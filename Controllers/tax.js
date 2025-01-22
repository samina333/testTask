import status from 'http-status';
import Model from '../Models/Model';

const getTaxSummary = async (req, res, next) => {
    try {
        const tax = await Model.TaxModel.findOne({ userId: req.user._id });
        if (!tax) {
            return res.status(404).json({ message: 'Tax data not found.' });
        }

        res.status(200).json({
            currentTax: tax.currentTax,
            percentageChange: tax.percentageChange,
        });
    } catch (error) {
        next(error);
    }
};

const getTaxTrends = async (req, res, next) => {
    try {
        const tax = await Model.TaxModel.findOne({ userId: req.user._id });
        if (!tax) {
            return res.status(404).json({ message: 'Tax trend data not found.' });
        }

        res.status(200).json({ trends: tax.trends });
    } catch (error) {
        next(error);
    }
};

export default {  getTaxSummary, getTaxTrends}