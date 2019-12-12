import { Model } from "../../../common/containers/data/model";

export default class ProfileModel extends Model<ProfileModel> {
  public id: number | null;
  firstName: string | null;
  lastName: string | null;
  ci: string | null;
  gender: string | null;
  photo: string | null;
  birthday: Date | null;
  constructor(object?: any) {
    super(ProfileModel, { path: "/users/{id}/profile" });
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.ci = null;
    this.gender = null;
    this.photo = null;
    this.birthday = null;
    this.apply(object);
  }
}
