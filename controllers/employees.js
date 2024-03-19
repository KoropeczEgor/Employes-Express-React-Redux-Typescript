const { prisma } = require("../prisma/prisma-client");

/**
 @rote Get /api/employees
 @desc Получение всех сотридников
 @access Private
 */
const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json({ employees });
  } catch {
    res.status(400).json({ message: "Не удалось получить сотрудников" });
  }
};

/**
 @rote POST /api/employees/add
 @desc Добавление сотрудника 
 @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.LastName || !data.adress || !data.age) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }

    // await prisma.user.update({
    //   where: {
    //     id: req.user.id,
    //   },
    //   data: {
    //     createdEmployee: {
    //       create: data,
    //     },
    //   },
    // });
    const employees = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(employees);
  } catch {
    res.status(400).json({ message: "Что-то пощло не так" });
  }
};

module.exports = {
  all,
  add,
};
