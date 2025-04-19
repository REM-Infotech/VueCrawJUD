import { sequelize } from '@plugins/useSequelize';
import { DataTypes, Model } from 'sequelize';
import type { IUser, UserModel } from './@types';

export const User = sequelize.define<Model<IUser, IUser> & UserModel>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

User.findAll().then((users) => {

  users.forEach((user) => {

    user.get({ plain: true });
    console.log(user.username, user.birthday);

  })

})
