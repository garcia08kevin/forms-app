import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) { }

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['The legend of Zelda', Validators.required]
    ])
  })

  get favoriteGamesControl() {
    return this.myForm.get('favoriteGames') as FormArray
  }

  public newFavorite: FormControl = new FormControl('', [Validators.required])

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
    console.log(this.myForm.value)
  }

  onAddFavorite():void{
    if (this.newFavorite.invalid) return;
    console.log(this.newFavorite.value)
    this.favoriteGamesControl.push(
      this.fb.control(this.newFavorite.value, Validators.required)
    );
    this.newFavorite.reset();
  }

  onDeleteFavorite(index:number):void{
    this.favoriteGamesControl.removeAt(index);
  }

  isValidField(field: string): boolean {
    return this.validatorsService.isValidField(field, this.myForm);
  }

  isValidFieldArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors && formArray.controls[index].touched
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`
      }
    }
    return null
  }

}
