import { verify } from 'jsonwebtoken';
import config from 'config';

import DuplicateKeyError from '@errors/DuplicateKeyError';
import HttpError from '@errors/HttpError';
import Invited from '@models/invited.model';
import User from '@models/user.model';
import { createToken } from '@utils/utils';
import { sendEmailInvitation } from './email.service';

export const inviteUser = async (email, role) => {
  const findUser = await User.findOne({ email });
  if (findUser) throw new DuplicateKeyError('email', 'Email is already active');

  const findInvites = await Invited.findOne({ email });
  if (findInvites) throw new DuplicateKeyError('email', 'Email is already invited');

  const dateNow = new Date();
  const expirationDate = new Date(dateNow.setMonth(dateNow.getMonth() + 1)).toISOString();
  const invitedUser = await Invited.create({ email, role, expirationDate });

  const registrationToken = createToken(invitedUser.toObject(), '30d');
  const feBaseUrl = config.get('feBaseUrl');
  const registrationUrl = `${feBaseUrl}/register/${registrationToken.token}`;
  const emailInvite = await sendEmailInvitation(email, role, registrationUrl);

  return { emailInvite, registrationUrl };
};

export const refreshInvite = async inviteId => {
  const findInvites = await Invited.findById(inviteId);
  if (!findInvites) throw new HttpError(404, 'Invitation id not found');

  const dateNow = new Date();
  const expirationDate = new Date(dateNow.setMonth(dateNow.getMonth() + 1)).toISOString();
  const updatedUser = await Invited.findByIdAndUpdate(
    inviteId,
    {
      $set: { expirationDate },
    },
    { new: true }
  ).lean();

  const registrationToken = createToken(updatedUser, '30d');
  const feBaseUrl = config.get('feBaseUrl');
  const registrationUrl = `${feBaseUrl}/register/${registrationToken.token}`;
  const emailInvite = await sendEmailInvitation(updatedUser.email, updatedUser.role, registrationUrl);
  return { emailInvite, registrationUrl };
};

export const deleteInvite = async inviteId => {
  const findAndDelete = await Invited.findByIdAndDelete(inviteId);
  return findAndDelete;
};

export const findAllInvites = async () => {
  const findAll = await Invited.find();
  return findAll;
};

export const checkInvite = async emailToken => {
  const secretKey = config.get('secretKey');
  const user = await verify(emailToken, secretKey);
  const invited = await Invited.findById(user._id).lean();
  if (!invited) throw new HttpError(401, 'Account not invited');

  return { ...invited };
};
