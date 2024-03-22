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
/**
 @rote POST /api/employees/remove/:id
 @desc Удаление сотрудника 
 @access Private
 */
const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch {
    res.status(400).json({ message: "Не удалось удалить сотрудника" });
  }
};

/**
 @rote PUT /api/employees/edit/:id
 @desc Редактирование сотрудников
 @access Private
 */

const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).send("OK");
  } catch (error) {
    res.status(400).json({ massege: "Не удалось редактировать сотрудника" });
  }
};

/**
 @rote GET /api/employees/:id
 @desc Получение сотрудников
 @access Private
 */
const employee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    res.status(400).json(employee);
  } catch {
    res.status(400).json({ message: "Не удалось получить сотрудника" });
  }
};
module.exports = {
  all,
  add,
  remove,
  edit,
  employee,
};
