import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {CulturesService} from "../../services/cultures.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {SpinnerService} from "../../services/spinner.service";

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

  articleForm: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateArticleDialogComponent>,
    private readonly _cultureService: CulturesService,
    private readonly _spinnerService: SpinnerService,
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      content: ['', [Validators.required]],
      culture: [this.data.cultureName, [Validators.required]]//this should be prefilled
    });
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      this._spinnerService.show()
      this._cultureService.createArticle(this.articleForm.value)
        .subscribe(() => {
          this.dialogRef.close('created');
          this._spinnerService.hide()
        });
    }
  }
}
