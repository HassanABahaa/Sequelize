import { User } from "../../../DB/models/user.model.js";
import { Op } from "sequelize";

export const signUp = async (req, res) => {
  try {
    await User.create(req.body, {
      fields: ["name", "email", "password", "age"],
    });
    res.json({ success: true, msg: "You can login now" });
  } catch (error) {
    return res.json({ success: false, msg: error.errors[0].message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const results = await User.findAll({ where: { email, password } }); // => output array
    if (results.length == 0) {
      return res.json({ success: false, msg: "User not found" });
    }
    return res.json(results);
  } catch (error) {
    return { error };
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, age } = req.body;
    const results = await User.update(
      { name, email, password, age },
      { where: { id } }
    );
    if (results[0] == 0) {
      return res.json({ success: false, msg: "User not found" });
    }
    return res.json({ success: true, msg: "User updated successfully" });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await User.destroy({ where: { id } }); // not found >> 0 / found >> 1
    if (results == 0) {
      return res.json({ success: false, msg: "User not found" });
    }
    return res.json({ success: true, msg: "User deleted successfully" });
    // return res.json(results);
  } catch (error) {
    return res.json({ success: false, msg: "Error deleting the user." });
  }
};

export const filterUserByChar = async (req, res) => {
  try {
    const { char, age } = req.query;

    const users = await User.findAll({
      where: {
        name: {
          [Op.like]: `${char}%`, // ilike (case insensitive)
        },
        age: {
          [Op.lt]: age,
        },
      },
    });
    if (users.length == 0) {
      return res.json({ msg: "There are no users in this age " });
    }
    return res.json({ success: true, users });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export const filterByAge = async (req, res) => {
  try {
    const { min, max } = req.query;
    const users = await User.findAll({
      where: {
        age: {
          [Op.between]: [min, max],
        },
      },
    });
    if (users.length == 0) {
      return res.json({ msg: "There are no users in this age " });
    }
    return res.json({ success: true, users });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export const oldestUser = async (req, res) => {
  try {
    const users = await User.findAll({ order: [["age", "DESC"]], limit: 3 });
    if (users.length == 0) {
      return res.json({ msg: "There are no users in this age " });
    }
    return res.json({ success: true, users });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};

export const searchById = async (req, res) => {
  try {
    const { id } = req.query;
    const users = await User.findAll({
      where: {
        id: {
          [Op.in]: [id],
        },
      },
    });

    return res.json({ success: true, users });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};

export const allUsers = async (req, res) => {
  try {
    const user = await User.findAll();
    return res.json({ success: true, results: user });
  } catch (error) {
    return res.json({ success: false, error });
  }
};
