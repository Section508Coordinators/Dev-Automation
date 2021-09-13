import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'radio-button-component',
  template: `
  <form [formGroup]="radioGroupForm">
  <div class="btn-group btn-group-toggle" ngbRadioGroup name="radioBasic">

    <span ngbButtonLabel class="btn-primary">
      <input ngbButton type="radio" [value]="1"> Left
    </span>

    <label ngbButtonLabel class="btn-primary">
      <input ngbButton type="radio" value="middle"> Middle
    </label>
    <label ngbButtonLabel class="btn-primary">
      <input ngbButton type="radio" [value]="false"> Right
    </label>
  </div>
</form>
  `,
})
export class RadioButtonComponent implements OnInit {
  public radioGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.radioGroupForm = this.formBuilder.group({
      'model': 1
    });
  }
}

