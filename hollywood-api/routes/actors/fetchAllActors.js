module.exports = {
  path: "/api/actors",
  method: "GET",
  handler: function(request, reply) {
    this.models.Actor
      .filter({})
      .getJoin({ movies: true })
      .then(result => reply(result))
      .catch(err => reply(err));
  }
};
