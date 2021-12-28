const appError = require("./appError");

//check if there is data input
const dataChecker = (req, res, next) => {
  if (!req?.body?.startDate?.match(/^[0-9-]{10}$/)) {
    next(new appError("Please enter a valid data for 'startDate'.", 404));
    return;
  }
  if (!req?.body?.endDate?.match(/^[0-9-]{10}$/)) {
    next(new appError("Please enter a valid data for 'endDate'.", 404));
    return;
  }
  if (!req?.body?.minCount) {
    next(new appError("Please enter a valid data for 'minCount'.", 404));
    return;
  }
  if (!req?.body?.maxCount) {
    next(new appError("Please enter a valid data for 'maxCount'.", 404));
    return;
  }

  next();
};

module.exports = dataChecker;
