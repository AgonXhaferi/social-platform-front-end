import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CulturesService} from "../../services/cultures.service";
import {SpinnerService} from "../../services/spinner.service";
import {NgIf} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-create-event-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    MatDialogContent,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    MatError
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './create-event-dialog.component.html',
  styleUrl: './create-event-dialog.component.css'
})
export class CreateEventDialogComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { culture: string },
    private readonly _cultureService: CulturesService,
    private readonly _spinnerService: SpinnerService,
    private _fb: FormBuilder
  ) {
    debugger;

    this.eventForm = this._fb.group({
      name: ['', Validators.required],
      culture: [data.culture, Validators.required],
      description: ['', Validators.required],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this._spinnerService.show()

      this._cultureService.createEvent(this.eventForm.value)
        .subscribe(eventId => {
          this.dialogRef.close('created');
          this._spinnerService.hide()
        })
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
