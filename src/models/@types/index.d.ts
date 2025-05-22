export interface IUser {
  id?: number;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Add model instance type
export interface UserModel extends IUser {
  get: (options: { plain: true }) => IUser;
}
