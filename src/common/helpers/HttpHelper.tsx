export interface IRequestConfig {
  method: string;
  headers: {
    [key: string]: string;
  };
  body?:
    | string
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | FormData
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null
    | undefined;
}
export enum HTTP_METHOD {
  OPTION = "OPTION",
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

export enum CONTENT_TYPE {
  JSON = "application/json",
  FORM = "multipart/form-data",
  FILE = "multipart/form-data",
  HTML = "text/html",
  TEXT = "text/*"
}
export class HttpHelper {
  private apiUrl: string = process.env.API_URL as string;
  constructor() {}
  getRequestConfig = (
    url: string,
    method: string,
    p?: { [key: string]: any },
    h?: { [key: string]: string }
  ): { url: string; options: IRequestConfig } => {
    let headers: { [key: string]: string } = {
      Accept: CONTENT_TYPE.JSON,
      "Content-Type": CONTENT_TYPE.JSON
    };
    if (localStorage.getItem("app.token")) {
      headers["Authorization"] = `Bearer ${localStorage.getItem("app.token")}`;
    }
    if (h) {
      headers = Object.assign(headers, h);
    }
    let body = undefined;
    if (p) {
      switch (method) {
        case HTTP_METHOD.GET:
        case HTTP_METHOD.DELETE:
        case HTTP_METHOD.OPTION:
          const urlParam = Object.entries(p)
            .map(
              ([key, val]) =>
                `${key}=${
                  typeof val !== "object"
                    ? encodeURIComponent(val)
                    : JSON.stringify(val)
                }`
            )
            .join("&");
          url += url.indexOf("?") >= 0 ? `&${urlParam}` : `?${urlParam}`;
          break;
        default:
          body = this.buildBodyContent(headers["Content-Type"], p);
      }
    }
    const options: IRequestConfig = {
      method: method,
      headers,
      body
    };
    return { url, options };
  };
  buildBodyContent = (contentType: string, body: any) => {
    switch (contentType) {
      case CONTENT_TYPE.JSON:
      case CONTENT_TYPE.TEXT:
      case CONTENT_TYPE.HTML:
        return typeof body === "object" ? JSON.stringify(body) : body;
      case CONTENT_TYPE.FORM:
        return new FormData(body);
      default:
        return body;
    }
  };
  request = async (
    path: string,
    method: HTTP_METHOD,
    params?: { [key: string]: any },
    headers?: { [key: string]: any }
  ) => {
    try {
      const { url, options } = this.getRequestConfig(
        path,
        method,
        params,
        headers
      );
      return this.execute(this.buildUrl(url), options);
    } catch (e) {
      throw e;
    }
  };
  get = async (
    path: string,
    params?: { [key: string]: any },
    headers?: { [key: string]: any }
  ) => {
    try {
      return await this.request(path, HTTP_METHOD.GET, params, headers);
    } catch (e) {
      throw e;
    }
  };
  post = async (
    path: string,
    params?: { [key: string]: any },
    headers?: { [key: string]: any }
  ) => {
    try {
      return await this.request(path, HTTP_METHOD.POST, params, headers);
    } catch (e) {
      throw e;
    }
  };
  put = async (
    path: string,
    params?: { [key: string]: any },
    headers?: { [key: string]: any }
  ) => {
    try {
      return await this.request(path, HTTP_METHOD.PUT, params, headers);
    } catch (e) {
      throw e;
    }
  };
  patch = async (
    path: string,
    params?: { [key: string]: any },
    headers?: { [key: string]: any }
  ) => {
    try {
      return await this.request(path, HTTP_METHOD.PATCH, params, headers);
    } catch (e) {
      throw e;
    }
  };
  delete = async (
    path: string,
    params?: { [key: string]: any },
    headers?: { [key: string]: any }
  ) => {
    try {
      return await this.request(path, HTTP_METHOD.DELETE, params, headers);
    } catch (e) {
      throw e;
    }
  };
  option = async (
    path: string,
    params?: { [key: string]: any },
    headers?: { [key: string]: any }
  ) => {
    try {
      return await this.request(path, HTTP_METHOD.OPTION, params, headers);
    } catch (e) {
      throw e;
    }
  };
  execute = async (url: string, options: IRequestConfig) => {
    try {
      const response = await fetch(url, options);
      if (options.headers.Accept === CONTENT_TYPE.JSON) {
        return await response.json();
      }
      return response;
    } catch (e) {
      throw e;
    }
  };
  buildUrl = (url: string, params?: { [key: string]: any }) => {
    let path = url;
    if (params) {
      for (const index in params) {
        if (params.hasOwnProperty(index)) {
          path = url.replace(`{${index}}`, params[index]);
        }
      }
    }
    let divider = '/'
    if(this.apiUrl.endsWith('/')) {
      divider = '';
    }
    return `${this.apiUrl}${divider}${path}`;
  };
}
