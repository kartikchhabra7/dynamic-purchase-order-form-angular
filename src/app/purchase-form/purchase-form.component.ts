import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidationService } from '../services/custom.validation.service';
import { TalentDetailsComponent } from '../talent-details/talent-details.component';
import { ValidationMessage } from '../config/Constants';

@Component({
  selector: 'app-purchase-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TalentDetailsComponent],
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss'],
})
export class PurchaseFormComponent {
  ValidationMessage:any=ValidationMessage
  orderForm!: FormGroup;
  
  clients = [
    { name: 'Collabera - Collabera Inc', value: 'Collabera - Collabera Inc' },
  ];
  orderTypes = [
    { name: 'Individual PO', value: 'Individual PO' },
    { name: 'Group PO', value: 'Group PO' },
  ];
 
  constructor(
    private fb: FormBuilder,
    private dateService: CustomValidationService
  ) {
    this.orderForm = this.fb.group({
      purchaseOrder: this.fb.group(
        {
          clientName: ['', [Validators.required]],
          orderType: ['', [Validators.required]],
          orderNumber: ['', [Validators.required]],
          receivedOn: ['', [Validators.required]],
          receivedFromName: ['', [Validators.required]],
          receivedFromEmail: ['', [Validators.required]],
          orderStartDate: ['', [Validators.required]],
          orderEndDate: ['', [Validators.required]],
          budget: [
            '',
            [
              Validators.required,
              this.dateService.validateBudget(5),
            ],
          ],
          currency: ['', [Validators.required]],
        },
        {
          validators: [
            this.dateService.endDateAfterStartDateValidator(
              'orderStartDate',
              'orderEndDate'
            ),
            this.dateService.startDateEndDateMatchValidator(
              'orderStartDate',
              'orderEndDate'
            ),
          ],
        }
      ),
      talentDetails: this.fb.array([this.createTalentDetail()]),
    });
  }

  get purchaseOrder() {
    return this.orderForm.get('purchaseOrder') as FormGroup;
  }

  get talentDetails() {
    return this.orderForm.get('talentDetails') as FormArray;
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

  isMatchedStartDateWithEndDate() {
    return this.dateService.startAndEndDateMatchValidator(
      this.purchaseOrder,
      'orderStartDate',
      'orderEndDate'
    );
  }
}

// we can direct call this function but if we need same form for multiple components then it will be the bad approach for every component if we create same function then it wil create the duplicancy
// isMatchedStartDateWithEndDate() {
//   const startDate = this.purchaseOrder.get('orderStartDate')?.value;
//   const endDate = this.purchaseOrder.get('orderEndDate')?.value;
//   return startDate && endDate && startDate === endDate;
// }