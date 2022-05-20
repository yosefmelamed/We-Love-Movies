//handle get function for theaters
const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//list all theaters and movies per theater
async function list(req, res) {
  const data = await service.list(req.params);
  res.json({ data });
}

//export functions
module.exports = {
  list
};

