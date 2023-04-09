enum RequestStatusStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failure = 'failure',
}

export class RequestStatus<T, E = any> {
  status: RequestStatusStatus;

  constructor(status: RequestStatusStatus = RequestStatusStatus.Idle) {
    this.status = status;
  }

  static idle<T>(): RequestStatusIdle<T> {
    return new RequestStatusIdle();
  }

  static loading<T>(): RequestStatusLoading<T> {
    return new RequestStatusLoading();
  }

  static success<T>(data: T): RequestStatusSuccess<T> {
    return new RequestStatusSuccess<T>(data);
  }

  static failure<E>(error: E): RequestStatusFailure<E> {
    return new RequestStatusFailure<E>(error);
  }

  maybeMap<K>({
    idle,
    loading,
    succeeded,
    failed,
    orElse,
  }: {
    idle?: () => K;
    loading?: () => K;
    succeeded?: (data: T) => K;
    failed?: (error: E) => K;
    orElse?: () => K;
  }): K {
    switch (this.status) {
      case RequestStatusStatus.Idle:
        return idle ? idle() : (undefined as unknown as K);
      case RequestStatusStatus.Loading:
        return loading ? loading() : (undefined as unknown as K);
      case RequestStatusStatus.Success:
        if (this instanceof RequestStatusSuccess) {
          return succeeded ? succeeded(this.data) : (undefined as unknown as K);
        } else {
          return undefined as unknown as K;
        }
      case RequestStatusStatus.Failure:
        if (this instanceof RequestStatusFailure) {
          return failed ? failed(this.error) : (undefined as unknown as K);
        } else {
          return undefined as unknown as K;
        }
      default:
        return orElse ? orElse() : (undefined as unknown as K);
    }
  }
}

class RequestStatusIdle<T> extends RequestStatus<T> {
  constructor() {
    super();
  }
}

class RequestStatusLoading<T> extends RequestStatus<T> {
  constructor() {
    super(RequestStatusStatus.Loading);
  }
}

class RequestStatusSuccess<T> extends RequestStatus<T> {
  data: T;

  constructor(data: T) {
    super(RequestStatusStatus.Success);
    this.data = data;
  }
}

class RequestStatusFailure<E> extends RequestStatus<unknown, E> {
  error: E;

  constructor(error: E) {
    super(RequestStatusStatus.Failure);
    this.error = error;
  }
}
