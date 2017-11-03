module.exports = db => {
  const type = db.type;
  const Actor = db.createModel("Actor", {
    name: type.string().required(),
    profilePic: type.string().required(),
    age: type.number().required(),
    born: type.string().required(),
    hometown: type.string().required(),
    gender: type
      .string()
      .enum(["male", "female"])
      .required(),
    bio: type.string().required()
  });

  return Actor;
};
