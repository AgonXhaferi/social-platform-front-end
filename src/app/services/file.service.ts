import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private readonly httpClient: HttpClient) {
  }

  uploadFile(formData: FormData) {
    return this.httpClient.post<any>('http://localhost:3000/api/v1/file/upload', formData, {
      headers: new HttpHeaders({Accept: '*/*'}),
    });
  }
}
