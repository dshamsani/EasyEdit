const { prisma } = require("../prisma/prisma.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route POST:/api/users/add
 * @description Add user
 */
const add = async (req, res) => {
  try {
    const { name, surname, age, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof surname !== "string" ||
      typeof age !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        status: 400,
        message: "Incorrect type data",
      });
    }

    const registred = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (registred) {
      return res.status(400).json({
        status: 400,
        message: "User is already registred",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.users.create({
      data: {
        name,
        surname,
        age,
        email,
        password: hashedPassword,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      return res.status(201).json({
        id: user.id,
        name: user.name,
        surname: user.surname,
        age: user.age,
        email: user.email,
        token: jwt.sign(
          {
            id: user.id,
          },
          secret,
          {
            expiresIn: "30d",
          }
        ),
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Can't create user",
      });
    }
  } catch {
    res.status(400).json({
      status: 400,
      message: "Incorrect request",
    });
  }
};

/**
 *
 * @route GET:/api/users/find
 * @param id
 * @description Find user by id
 */
const find = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "Please enter the ID",
      });
    }

    const user = await prisma.users.findFirst({
      where: {
        id,
      },
    });

    if (user) {
      return res.status(200).json({
        id,
        name: user.name,
        surname: user.surname,
        age: user.age,
        email: user.email,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "The user is not in the database",
      });
    }
  } catch {
    res.status(400).json({
      status: 400,
      message: "Incorrect data",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Incorrect login or password",
      });
    }

    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User is not registred",
      });
    }

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (isPasswordCorrect && user && secret) {
      return res.status(200).json({
        id: user.id,
        name: user.name,
        surname: user.surname,
        age: user.age,
        email: user.email,
        token: jwt.sign(
          {
            id: user.id,
          },
          secret,
          {
            expiresIn: "30d",
          }
        ),
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Wrong email or password",
      });
    }
  } catch {
    res.status(400).json({
      status: 400,
      message: "Incorrect data",
    });
  }
};

const current = (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  add,
  find,
  login,
  current,
};
