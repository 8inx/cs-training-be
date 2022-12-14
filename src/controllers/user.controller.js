import { deleteUser, findAllUsers, findUserById, updateUser, updateUserRole } from '@services/user.service';

export const updateUserHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const input = req.body;
    const updatedUser = await updateUser(userId, input);
    res.status(200).json({ data: updatedUser, mesage: 'update success' });
  } catch (error) {
    next(error);
  }
};

export const updateUserRoleHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const input = req.body;
    const updatedUser = await updateUserRole(userId, input);
    res.status(200).json({ data: updatedUser, mesage: 'update role success' });
  } catch (error) {
    next(error);
  }
};

export const deleteUserHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await deleteUser(userId);
    res.status(200).json({ data: deletedUser, mesage: 'delete success' });
  } catch (error) {
    next(error);
  }
};

export const findUserByIdHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const findUser = await findUserById(userId);
    res.status(200).json({ data: findUser, mesage: 'find user' });
  } catch (error) {
    next(error);
  }
};

export const findAllUsersHandler = async (req, res, next) => {
  try {
    const query = req.query;
    const findUsers = await findAllUsers(query);
    res.status(200).json({ data: findUsers, mesage: 'find user' });
  } catch (error) {
    next(error);
  }
};
