//controller to handle api functions from movies.service and middleware
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//verify that the movie_id exists
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

//handle get 1 movie
async function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

//handle get all movies
async function list(req, res) {
  const {is_showing} = req.query
  let data =""
 if(is_showing){
      data = await service.list2()
     } else{
      data = await service.list()
     }
  res.json({ data });
}

//handle get theaters
async function theaters(req,res){
  const {movie_Id} = req.params;
  const data = await service.readTheaters(movie_Id);
  res.json({ data })
}

//handle get reviews
async function reviews(req,res){
  const {movieId} = req.params;
  const data = await service.readReviews(movieId);
  res.json({ data })
}

//export handlers
module.exports = {
read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
theaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(theaters)],
reviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(reviews)],  
list: asyncErrorBoundary(list),
};

