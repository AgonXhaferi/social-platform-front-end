import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogActions, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {CulturesService} from "../../services/cultures.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-create-article-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatButtonModule
  ],
  templateUrl: './create-article-dialog.component.html',
  styleUrl: './create-article-dialog.component.css'
})
export class CreateArticleDialogComponent {
  articleForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    content: ['', [Validators.required]],
    culture: ['', [Validators.required, Validators.maxLength(60)]],
  });


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateArticleDialogComponent>,
    private readonly _cultureService: CulturesService
  ) {
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      // this._cultureService.createArticle(this.articleForm.value).subscribe(() => {
      //   this.dialogRef.close('created');
      // });
    }
  }
}
