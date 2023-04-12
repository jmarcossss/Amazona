import { Observable, of } from 'rxjs';
import { ErrorResponse } from '../shared/utils/response';

export abstract class BaseService {
  handleError(operation = 'operation') {
    return (result: any): Observable<ErrorResponse> => {
      console.error(`${operation} failed: ${result?.message}`);
      try {
        return of(new ErrorResponse(result?.error));
      } catch (error) {
        return of(
          new ErrorResponse({
            msg: 'Erro desconhecido',
          })
        );
      }
    };
  }
}
