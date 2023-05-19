const { prisma } = require("../prisma/prisma.js");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.users.findUnique({
        where: {
          id: decoded.id,
        },
      });

      req.user = user;
      next();
    } else {
      return res.status(400).json({
        status: 400,
        message: "Incorrect token",
      });
    }
  } catch {
    res.status(400).json({
      status: 400,
      message: "Not authorizated",
    });
  }
};
module.exports = {
  auth,
};
