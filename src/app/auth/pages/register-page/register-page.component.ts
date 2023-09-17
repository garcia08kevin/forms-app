import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator
  ) { }

  public myForm: FormGroup = this.fb.group({
    //validators llamados dsde la clase validators.ts
    //name: ['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    //Opcion favorable para el performance de la aplicacion
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
    // email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [new EmailValidator()]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  },{
    //Validator a nivel del formulario
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  })

  onSubmit(): void {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value)
  }

  isValidFile(field: string): boolean {
    return this.validatorsService.isValidField(field, this.myForm);
  }
}
