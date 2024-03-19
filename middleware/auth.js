//middleware это промежуточное программное обеспечение
const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prisma-client");

const auth = async (req, res, next) => {
  try {
    //(" ")[1] Потому что в начале token стоит Bearer он нам не нужен,
    // потому мы его разделяем на пробел и берем 1 символ
    let token = req.headers.authorization?.split(" ")[1];
    //декодируем и узнаем id нашего пользователя
    //JWT_SECRET- берется для того, чтобы расшифровать нашего пользователя
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      //Осуществляем поиск по id
      where: {
        id: decoded.id,
      },
    });
    //Мы говорим если ты его нашел, добавь его
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ massege: "Не авторизован" });
  }
};

module.exports = {
  auth,
};
