export interface IContent {
  title: string;
  link?: string;
  description: string;
  _id?: string;
  onDelete?: () => void;
}

export interface IAuth {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}
