import { inviteUser, deleteInvite, checkInvite, refreshInvite, findAllInvites } from '@services/invite.service';

export const inviteUserHandler = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const invite = await inviteUser(email, role);
    res.status(200).json({ data: invite, mesage: 'user invite success' });
  } catch (error) {
    next(error);
  }
};

export const refreshInviteHandler = async (req, res, next) => {
  try {
    const inviteId = req.params.id;
    const updated = await refreshInvite(inviteId);
    res.status(200).json({ data: updated, mesage: 'refresh invite success' });
  } catch (error) {
    next(error);
  }
};

export const deleteInviteHandler = async (req, res, next) => {
  try {
    const inviteId = req.params.id;
    const deletedInvite = await deleteInvite(inviteId);
    res.status(200).json({ data: deletedInvite, mesage: 'delete invite success' });
  } catch (error) {
    next(error);
  }
};

export const findAllInvitesHandler = async (req, res, next) => {
  try {
    const findAll = await findAllInvites();
    res.status(200).json({ data: findAll, mesage: 'find all invite success' });
  } catch (error) {
    next(error);
  }
};

export const checkInviteHandler = async (req, res, next) => {
  try {
    const { emailToken } = req.query;
    const user = await checkInvite(emailToken);
    res.status(200).json({ data: user, mesage: 'valid token' });
  } catch (error) {
    next(error);
  }
};
