module.exports = {
  path: "/api/actors/{actorId}",
  method: ["PUT", "PATCH"],
  handler: function(request, reply) {
    let actorId = request.params.actorId;
    let updateActor = request.payload;

    this.models.Actor
      .get(actorId)
      .then(doc => doc.merge(updateActor).save())
      .then(result => reply(result))
      .catch(err => reply(err));
  }
};
