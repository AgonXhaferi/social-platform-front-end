import {Component} from '@angular/core';
import {HttpClient, HttpClientModule, HttpErrorResponse, HttpEventType, HttpHeaders} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {FileService} from "../../services/file.service";
import {FormsModule} from "@angular/forms";
import {catchError} from "rxjs";
import {SpinnerService} from "../../services/spinner.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-file-upload-dialog',
  standalone: true,
  imports: [
    NgIf,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.css'
})
export class FileUploadDialogComponent {
  files?: File[];
  isMultiple = false;

  constructor(
    private readonly fileService: FileService,
    private dialogRef: MatDialogRef<FileUploadDialogComponent>
  ) {
  }

  uploadFiles() {
    if (this.files) {
      const formData = new FormData()

      formData.append('file', this.files[0])

      this.fileService.uploadFile(formData)
        .pipe(
          catchError(err => {
            this.dialogRef.close('Error');
            return err
          })
        )
        .subscribe(
          () => {
            this.dialogRef.close('OK');
          }
        )
    } else {
      alert('Please select files to upload!');
    }
  }

  changeFiles(event: any) {

    // On file change set it to files array
    this.files = event.target.files;
  }
}
