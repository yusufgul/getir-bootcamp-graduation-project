const { Mongoose } = require("mongoose");
const model = require("../models/model");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getData = catchAsync(async (req, res, next) => {
  let minCount = req.body.minCount;
  let maxCount = req.body.maxCount;
  let startDate = new Date(req.body.startDate);
  let endDate = new Date(req.body.endDate);
  endDate.setHours(25, 59, 59);

  //filter and get data from database
  let data = await model.aggregate([
    {
      $addFields: {
        totalCount: {
          $reduce: {
            input: "$counts",
            initialValue: 0,
            in: { $sum: ["$counts"] },
          },
        },
      },
    },
    { $project: { key: 1, createdAt: 1, totalCount: 1, _id: 0 } },
    {
      $match: {
        $and: [
          { totalCount: { $gte: minCount, $lte: maxCount } },
          { createdAt: { $gte: startDate, $lt: endDate } },
        ],
      },
    },
  ]);

  res.status(200).json({
    code: 0,
    msg: "Success",
    records: data,
  });
});
