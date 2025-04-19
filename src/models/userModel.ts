import { sequelize } from '@plugins/useSequelize';
import { DataTypes, Model } from 'sequelize';
import type { IUser, UserModel } from './@types';

export const User = sequelize.define<Model<IUser, IUser> & UserModel>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  tableName: 'Users'
});

// Example usage
async function createUser() {
  try {
    const user = await User.create({
      username: 'John Doe'
    });
    console.log(user.get({ plain: true }));
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

await createUser()

User.findAll().then((users) => {

  users.forEach((user) => {

    user.get({ plain: true });
    console.log(user.username);

  })

})
