export class Response {
  msg: string = '';
  msgCode: string | string[] = '';
  code: number = -1;

  constructor(data?: Partial<Response>) {
    Object.assign(this, data);
  }

  handle<T>(callbacks: {
    onSuccess: (response: SuccessResponse<T>) => void;
    onFailure: (response: ErrorResponse) => void;
  }) {
    if (this instanceof SuccessResponse) {
      callbacks.onSuccess(this);
    } else if (this instanceof ErrorResponse) {
      callbacks.onFailure(this);
    }
  }
}

export class SuccessResponse<T> extends Response {
  data: T | undefined;
  constructor({ data, msg, msgCode, code }: Partial<SuccessResponse<T>> = {}) {
    super({
      msg,
      msgCode,
      code: code ?? 200,
    });
    this.data = data;
  }
}

export class ErrorResponse extends Response {
  resultMsg: string;
  constructor({ msg, msgCode, code, resultMsg }: Partial<ErrorResponse> = {}) {
    super({
      msg,
      msgCode,
      code: code ?? 500,
    });
    this.resultMsg = resultMsg ?? '';
  }
}
