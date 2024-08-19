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


    debugger;
    this.httpClient.post<any>('http://localhost:3000/api/v1/file/upload', formData, {
      headers: new HttpHeaders({Accept: '*/*'}),
      reportProgress: true,
      observe: 'events',
      // withCredentials: false // Ensure this is false to avoid credentials
    },)
      .pipe(
        catchError(err => {
          debugger;
          console.log(err)

          throw new Error(err)
        })
      )
      .subscribe
      ({
        next: (event: any) => {
          debugger;
          if (event.type === HttpEventType.UploadProgress) {
            const progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            const message = 'Upload success.';
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
  }
}
