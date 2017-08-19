import { Component } from '@angular/core';
import { NgModel, NgForm, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '상품등록';
  prodForm: FormGroup;
  
  constructor(public fb: FormBuilder) {
    this.prodForm = this.fb.group({
      name:['', Validators.required],
      listPrice: [0,
        Validators.compose([
          Validators.required,
          Validators.pattern('[1-9]\\d*')
        ])
      ],
      qty: [0,
        Validators.compose([
          Validators.required,
          Validators.pattern('[1-9]\\d*')
        ])
      ],
      desc: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ])
      ],
    });
  }



  onSubmit(){
    alert(`제출\n${JSON.stringify(this.prodForm.value)}`);
  }


}
