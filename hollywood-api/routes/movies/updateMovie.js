module.exports = {
  path: "/api/movies/{movieId}",
  method: ["PUT", "PATCH"],
  handler: function(request, reply) {
    let movieId = request.params.movieId;
    let updateMovie = request.payload;

    this.models.Movie
      .get(movieId)
      .then(doc => doc.merge(updateMovie).save())
      .then(result => reply(result))
      .catch(err => reply(err));
  }
};
