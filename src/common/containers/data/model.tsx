import { HttpHelper, HTTP_METHOD } from "../../helpers/HttpHelper";
import { string } from "prop-types";

export interface IModelConfig {
  path?: string;
  identifier?: string;
  pathParams?: { [key: string]: string };
}

export interface IModel {
  [key: string]: any;
}

export abstract class Model<M extends Model<M>> {
  [keys: string]: any;
  protected _$props: { [key: string]: any } = {};
  protected _$config: IModelConfig = {};
  protected _$metadata: { [key: string]: any } = {};
  protected _$className: new (...args: any) => M;
  protected _$requestor: HttpHelper;
  constructor(
    cls: new (...args: any) => M,
    config?: IModelConfig,
    object?: { [key: string]: any }
  ) {
    this._$className = cls;
    this._$config = {};
    if (config) {
      this._$config.path = config.path;
      this._$config.identifier = config.identifier ? config.identifier : "id";
      this._$config.pathParams = config.pathParams;
    }
    this._$requestor = new HttpHelper();
    if (object) {
      this.apply(object);
    }
  }
  create(object?: any): M {
    return new this._$className(object);
  }
  getPath(withIdentifier?: boolean): string {
    if (!this._$config) {
      throw new Error("Invalid Model configuration.");
    }
    if (!this._$config.path) {
      throw new Error("Invalid Model configuration.");
    }
    let path = this._$config.path.trim();
    if (withIdentifier) {
      if (!this._$config.identifier) {
        throw new Error("Invalid Model configuration.");
      }
      if (
        typeof this[this._$config.identifier] === "undefined" ||
        this[this._$config.identifier] === null
      ) {
        throw new Error("Model identifier has no value.");
      }
      path =
        (path.endsWith("/") ? "" : "/") + `${this[this._$config.identifier]}`;
    }
    return path;
  }
  apply = (object: any): void => {
    for (const key in object) {
      if (this.hasOwnProperty(key)) {
        if (object[key]) {
          this[key] = new object[key].constructor(object[key]);
        } else {
          this[key] = object[key];
        }
      }
    }
  };
  private atomic = (value: any): any => {
    let atomic: any = value;
    if (value) {
      if (typeof value === "object") {
        if (value instanceof String) {
          return value;
        }
        if (value instanceof Number) {
          return value;
        }
        if (value instanceof Date) {
          return value;
        }
        if (value instanceof Boolean) {
          return value;
        }
        if (value.hasOwnProperty("toObject")) {
          atomic = value.toObject();
        } else if (value.hasOwnProperty("length")) {
          atomic = value.map((v: any) => this.atomic(v));
        }
      }
    }
    return atomic;
  };
  save = async (
    params?: { [key: string]: any },
    headers?: { [key: string]: any }
  ): Promise<M> => {
    try {
      const response = await this._$requestor.post(
        this.getPath(),
        this.toObject()
      );
      this.apply(response);
      return (this as unknown) as M;
    } catch (e) {
      throw e;
    }
  };
  update = async (
    params?: { [key: string]: any },
    headers?: { [key: string]: any }
  ): Promise<M> => {
    try {
      const response = await this._$requestor.put(
        this.getPath(true),
        this.toObject()
      );
      this.apply(response);
      return (this as unknown) as M;
    } catch (e) {
      throw e;
    }
  };
  remove = async (
    params?: { [key: string]: any },
    headers?: { [key: string]: any }
  ): Promise<boolean> => {
    try {
      const response = await this._$requestor.put(this.getPath(true));
      return true;
    } catch (e) {
      throw e;
    }
  };
  get = async (
    params?: { [key: string]: any },
    headers?: { [key: string]: any }
  ): Promise<M> => {
    try {
      const response = await this._$requestor.get(this.getPath(true));
      this.apply(response);
      return (this as unknown) as M;
    } catch (e) {
      throw e;
    }
  };

  request = async (
    url: string,
    method: HTTP_METHOD,
    body?: { [key: string]: any }
  ): Promise<any> => {
    return await this._$requestor.request(url, method, body);
  };

  toJSON = () => {
    return this.toObject();
  };
  toObject = () => {
    const json: { [key: string]: any } = {};
    for (const index in this) {
      if (this.hasOwnProperty(index)) {
        json[index] = this.atomic(this[index]);
      }
    }
    return json;
  };
}

export class StateModel<T extends Model<T>> {
  model: T | null;
  actions: {
    [key: string]: Function;
  } = {};
  constructor(model: T) {
    this.model = model;
    this.actions = {};
  }

  get state() {
    return this.model;
  }
}
