export const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAUtherized = token === "xyz";

  if (!isAdminAUtherized) {
    res.status(401).send("Unauthorized Request!");
  } else {
    next();
  }
};

export const userAuth = (req, res, next) => {
  const token = "xyz";
  const isUserAUtherized = token === "xyz";

  if (!isUserAUtherized) {
    res.status(401).send("Unauthorized Request!");
  } else {
    next();
  }
};
