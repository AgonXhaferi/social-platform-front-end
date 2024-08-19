import {Component} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {FileService} from "../../services/file.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    NgIf,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  constructor(private fileService: FileService) {
  }

  // Storing files in a File array
  files?: File[];
  isMultiple = false;

  // Injecting uploadservice

  // Function to use the service to upload files
  uploadFiles(filesElement: HTMLInputElement) {

    // Check whether the files array is not undefined
    if (this.files) {
      const formData = new FormData()

      formData.append('file', this.files[0])

      this.fileService.uploadFile(formData)
    } else {
      alert('Please select files to upload!');
    }
  }

  changeFiles(event: any) {

    // On file change set it to files array
    this.files = event.target.files;
  }
}
