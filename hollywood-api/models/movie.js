module.exports = db => {
  const type = db.type;
  const Movie = db.createModel("Movie", {
    title: type.string().required(),
    poster: type.string().required(),
    summary: type.string().required(),
    rating: type
      .string()
      .enum(["G", "PG", "PG-13", "R", "NR"])
      .required(),
    rottenTomatoes: type
      .number()
      .min(0)
      .max(100)
      .required()
  });
  return Movie;
};
