import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-create-archive',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './create-archive.component.html',
  styleUrl: './create-archive.component.css'
})
export class CreateArchiveComponent {
  archiveCodeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form with FormBuilder
    this.archiveCodeForm = this.fb.group({
      archiveCode: ['', [Validators.required, Validators.minLength(3)]], // Add validators as needed
    });
  }

  ngOnInit(): void {}

  // Method to handle form submission
  onSubmit() {
    if (this.archiveCodeForm.valid) {
      const archiveCode = this.archiveCodeForm.get('archiveCode')?.value;
      console.log('Archive Code:', archiveCode);
      // Handle the submission, e.g., send it to a service or backend
    } else {
      console.log('Form is invalid');
    }
  }

  // Optional: Utility method to get form control for template binding
  get archiveCode() {
    return this.archiveCodeForm.get('archiveCode');
  }
}
