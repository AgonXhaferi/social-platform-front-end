import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateArchiveComponent} from "../create-archive/create-archive.component";
import {FileUploadDialogComponent} from "../file-upload-dialog/file-upload-dialog.component";
import {MatButton} from "@angular/material/button";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent {

  constructor(private dialog: MatDialog,
              private readonly spinnerService: SpinnerService,) {
  }


  createArchiveDialog() {
    this.dialog.open(CreateArchiveComponent, {
      width: '400px'
    })
  }

  uploadFileDialog() {

    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: '600px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'OK') {
        console.log('File uploaded successfully');
        alert('File uploaded successfully!');
      } else if (result === 'ERROR') {
        console.error('File upload failed');
        alert('File upload failed.');
      } else {
        console.log('File upload dialog closed');
      }
    });
  }
}
