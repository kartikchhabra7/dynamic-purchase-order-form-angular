import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationMessage } from '../config/Constants';

@Component({
  selector: 'app-talent-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './talent-details.component.html',
  styleUrls: ['./talent-details.component.scss'],
})
export class TalentDetailsComponent {
  @Input() orderForm!: FormGroup;
  @Input() talentDetails!: FormArray;

  ValidationMessage: any = ValidationMessage;

  selectedJobTitle: any | null = null;
  selectedJobId: string | null = null;
  isFieldVisible: boolean = true;

  jobTitles = [
    { name: 'Software Developer', id: 'DEV001' },
    { name: 'UI/UX Designer', id: 'DES002' },
    { name: 'Project Manager', id: 'PM003' },
  ];

  constructor(private fb: FormBuilder) {}

  showAddAnotherFieldButton() {
    return (
      this.orderForm.get('purchaseOrder')?.get('orderType')?.value ===
      'Group PO'
    );
  }

  createTalentDetail() {
    return this.fb.group({
      jobTitle: ['', [Validators.required]],
      jobId: ['', [Validators.required]],
      checkBoxName: [false],
      contactDuration: [''],
      billRate: [''],
      currency: [''],
      standardTimeBR: [''],
      standardTimeCurrency: [''],
      overTimeBR: [''],
      overTimeCurrency: [''],
    });
  }

  addTalentDetail() {
    this.talentDetails.push(this.createTalentDetail());
  }

  removeTalentDetail(index: number) {
    if (this.talentDetails.length > 1) {
      this.talentDetails.removeAt(index);
    }
  }

  onJobTitleChange($event: any, index: number) {
    const selectedJobTitleName = $event.target.value;

    const selectedJob = this.jobTitles.find(
      (job) => job.name === selectedJobTitleName
    );
    if (selectedJob) {
      this.talentDetails.at(index).get('jobId')?.patchValue(selectedJob.id);
    }
  }

  setIsVisible() {
    this.isFieldVisible = !this.isFieldVisible;
  }

  private fieldValidators: any = {
    contactDuration: Validators.required,
    billRate: Validators.required,
    currency: Validators.required,
    standardTimeBR: Validators.required,
    standardTimeCurrency: Validators.required,
    overTimeBR: Validators.required,
    overTimeCurrency: Validators.required,
  };

  updateValidators() {
    this.talentDetails.controls.forEach((control) => {
      const checkbox = control.get('checkBoxName')?.value;
      const fields = Object.keys(this.fieldValidators);

      fields.forEach((field: any) => {
        const fieldControl = control.get(field);
        if (checkbox) {
          fieldControl?.setValidators(this.fieldValidators[field]);
        } else {
          fieldControl?.clearValidators();
        }
        fieldControl?.updateValueAndValidity();
      });
    });
  }

  submitForm() {
    this.orderForm.markAllAsTouched();
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
      this.orderForm.reset();
      const controlsToRemove = this.talentDetails.length - 1;
      for (let i = controlsToRemove; i > 0; i--) {
        this.talentDetails.removeAt(i);
      }
    }
  }

  resetForm() {
    this.orderForm.reset();
  }
}
