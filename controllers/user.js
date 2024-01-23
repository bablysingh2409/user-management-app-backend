const CreatedUser = require('../models/createdUser');
const createError=require('../middlewares/error');

const userController = {
  getAllUsers: async (req, res,next) => {
    try {
      const users = await CreatedUser.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      res.status(500).send(next());
    }
  },

  addUser: async (req, res,next) => {
    try {
      const { name, email, phone } = req.body;
      const newUser = new CreatedUser({ name, email, phone });
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      console.error('Error adding user:', error.message);
      res.status(500).send(next());
    }
  },

  getUserDetails: async (req, res,next) => {
    try {
      const userId = req.params.userId;
      const user = await CreatedUser.findById(userId);
      if (!user) {
        return next(createError(404,'User not found')) 
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      res.status(500).send(next());
    }
  },

  editUser: async (req, res,next) => {
    try {
      const userId = req.params.userId;
      const { name, email, phone } = req.body;
      const updatedUser = await CreatedUser.findByIdAndUpdate(
        userId,
        { name, email, phone },
        { new: true }
      );
      if (!updatedUser) {
        return next(createError(404,'User not found'))  
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Error editing user:', error.message);
      res.status(500).send(next());
    }
  },

  deleteUser: async (req, res,next) => {
    try {
      const userId = req.params.userId;
      const deletedUser = await CreatedUser.findByIdAndDelete(userId);
      if (!deletedUser) {
        return next(createError(404,'User not found')) 
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).send(next());
    }
  },
};

module.exports = userController;
