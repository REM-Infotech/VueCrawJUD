export interface IUser {
  id?: number;
  username: string;
  birthday: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Add model instance type
export interface UserModel extends IUser {
  get: (options: { plain: true }) => IUser;
}
