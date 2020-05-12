export class User {
  isEditable: boolean;
  constructor(
    public userId: string,
    public userPassword: string,
    public userConfirmPassword: string,
    public email: string,
    public fisrtName: string,
    public  lastName: string,
    public phoneNo: string
  ) {}
}

