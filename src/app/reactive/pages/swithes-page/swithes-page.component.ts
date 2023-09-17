import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './swithes-page.component.html',
  styles: [
  ]
})
export class SwithesPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) { }

  ngOnInit(): void {
    this.myForm.reset(this.persona);
  }

  public persona = {
    gender: 'M',
    warnNotifications: true
  }

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    warnNotifications: [true, Validators.required],
    termsndConditiones: [false, Validators.requiredTrue],
  });

  onSave():void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched()
      return;
    }
    console.log(this.myForm.value)
    //newPerson contiene todo los valores del objeto mejos termsndConditiones
    const {termsndConditiones,... newPerson} = this.myForm.value
    this.persona = newPerson;
  }

  isValidField(field: string): boolean {
    return this.validatorsService.isValidField(field, this.myForm);
  }
}
