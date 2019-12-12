import { Model } from '../../../common/containers/data/model';
import ProfileModel from './profile';
import { HTTP_METHOD } from '../../../common/helpers/HttpHelper';

export enum ROLES {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export default class UserModel extends Model<UserModel> {
  public id: number | null;
  public username: string;
  public email: string;
  public password: string;
  public role: string;
  profile: ProfileModel | null;

  constructor(object?: any) {
    super(UserModel, {path: 'users'});
    this.id = null;
    this.username = '';
    this.email = '';
    this.password = '';
    this.role = ROLES.USER;
    this.profile = null;
    this.apply(object);
  }

  status = async (): Promise<UserModel> => {
    const response: UserModel = await this.request(
      "users/status",
      HTTP_METHOD.GET
    );
    this.apply(response);
    return this;
  }

  login = async (): Promise<{user: UserModel, token: string}> => {
    const response: {user: UserModel, token: string} = await this.request("users/signin", HTTP_METHOD.POST, this.toObject());
    console.log(response);
    this.apply(response.user);
    return {
      user: this,
      token: response.token
    };
  }
}