import { Observable } from 'rxjs';

export interface IAppService {
  accumulate(numberArray: INumberArray): Observable<any>;
}

interface INumberArray {
  data: number[];
}

export interface IUserService {
  getUserInfo(query: QueryDto): Observable<any>;
}

interface QueryDto {
  userid: number;
}
