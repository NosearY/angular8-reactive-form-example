import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, Form, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export interface Login {
  firstName: string;
  password: string;
  firstName2: string;
  password2: string;
  firstName3: string;
  password3: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private v: string;
  form: FormGroup;
  title = 'form-app';

  formModel: Login = {
    firstName: null,
    password: null,
    firstName2: null,
    password2: null,
    firstName3: null,
    password3: null
  };

  formVal$: Observable<string>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      password: ['', { validators: Validators.required, updateOn: 'blur' }],
      firstName2: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      password2: ['', { validators: Validators.required, updateOn: 'blur' }],
      firstName3: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      password3: ['', { validators: Validators.required, updateOn: 'blur' }]
    });

    this.formVal$ = this.form.valueChanges.pipe(map(val => {
      console.log(val);
      this.formModel = val;
      console.log(this.form);
      return JSON.stringify(val);
    }));

    // this.formVal$
  }

  private updateForm(model: Partial<Login>): void {
    this.form.patchValue(model);
  }



  test(f) {
    console.log(f);
  }
}
