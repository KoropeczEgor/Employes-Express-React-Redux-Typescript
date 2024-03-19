const { prisma } = require("../prisma/prisma-client");
const brypt = require("bcrypt"); // для хэширования пароля
const jwt = require("jsonwebtoken");

/**
 *
 * @route POST /api/user/login
 * @desc Логин
 * @access Pablic
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ massege: "Пожалуйста, заполните обязательные поля" });
    }

    const user = await prisma.user.findFirst({
      //where - мы ищем если у нас в базе данный такой же email
      where: {
        email,
      },
    });

    const isPasswordCorrect =
      user && (await brypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res
        .status(400)
        .json({ massege: "Неверно введен логин или пароль" });
    }
  } catch {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

/**
 *
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Publics
 */
//next в данном ключе говорит-вызове следующею функцию
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .send(400)
        .json({ massege: "Пожалуйста, заполните обязательные поля" });
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (registeredUser) {
      return res
        .status(400)
        .json({ massege: "Пользватель, с таким email ужу существует " });
    }
    // Шифровка password
    const salt = await brypt.genSalt(10);
    const hashedPassword = await brypt.hash(password, salt);
    //Создаем пользователя и текущими данными
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    //secret - это string который нельзя никому показывать
    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res
        .status(400)
        .json({ massege: "Не удалось создать пользователя" });
    }
  } catch {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};
/**
 *
 * @route GET api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
//current - это текущий пользователь который в данный момент залогинин
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  login,
  register,
  current,
};
