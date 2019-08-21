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

  invalidFormControls = '';
  formVal$: Observable<string>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      form1: this.fb.group({
        firstName: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
        password: ['', { validators: Validators.required, updateOn: 'blur' }]
      })
      ,
      form2: this.fb.group({
        firstName2: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
        password2: ['', { validators: Validators.required, updateOn: 'blur' }]
      })
      ,
      form3: this.fb.group({
        firstName3: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
        password3: ['', { validators: Validators.required, updateOn: 'blur' }],
        form31: this.fb.group({
          firstName: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
          password: ['', { validators: Validators.required, updateOn: 'blur' }]
        })
      })
    });

    this.formVal$ = this.form.valueChanges.pipe(map(val => {
      console.log(val);
      this.formModel = val;
      console.log(this.form);
      this.invalidFormControls = Object.keys(this.form.controls).filter(key => this.form.controls[key].invalid === true).join(',');
      return this.syntaxHighlight(val);
    }));

    // this.form.valueChanges.subscribe(val => {
    //   this.formModel = val;
    // });
    // this.formVal$
  }

  private syntaxHighlight(json): string {
    if (typeof json !== 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // tslint:disable-next-line:max-line-length
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  private updateForm(model: Partial<Login>): void {
    this.form.patchValue(model);
  }

  onSubmit() {

  }

  // validate() {
  //   console.log(this.form);
  //   alert('form valid: ' + this.form.valid);

  //   if (this.form.invalid) {
  //     this.invalidFormControls = Object.keys(this.form.controls).filter(key => this.form.controls[key].invalid === true).join(',');
  //   }
  // }

  test(f) {
    console.log(f);
  }

  validate() {
    this.form.markAllAsTouched();
  }

  reset() {
    this.form.reset();
  }
}
