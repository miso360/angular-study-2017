8 폼 다루기
======================

>    - 앵귤러에서 제공하는 폼의 모델 클래스와 폼 지시자 이해
>    - 템플릿과 NgModel 지시자를 활용한 폼 개발 방법
>    - 컴포넌트에서 모델과 FormBuilder를 사용한 반응형 폼 개발 방법





### 4장 복습

##### 지시자란?

> DOM을 다루기 위한 모든 것



#### 구조지시자

> DOM요소를 추가하거나 삭제하는 등 DOM트리를 동적으로 조작하여 화면의 구조를 변경할때 사용하는 지시자
> NgIf, NgFor, NgSwitch



#### 속성지시자

>지시자가 선언된 DOM의 모습이나 동작을 조작하는데 사용하는 지시자
>NgClass, NgStyle





### 8.1 폼의 구성

앵귤러에서는 폼의 모든 요소를 추상화하여 모델 클래스와 지시자의 조합으로 구성하여 제공



#### 8.1.1 폼 모델

폼을 다루는 요소의 핵심은 FormControl 클래스이다.

FormControl은 폼에서 사용자 입력을 받는 모든 요소에 일대일로 대응하는 모델 클래스이다.

앵귤러는 폼의 요소를 모델링하여 AbstractControl을 상속받는 FormControl, FormGroup, FormArray로 클래스화 

하여 템플릿안에서 NgModel, FormControlName과 같은 지시자에서 사용한다.



![8-1](/Users/Soonhyun/GoogleDrive/workspace/study/angular-study-2017/8장/image/8-1.jpeg )

> FormControl은 AbstractControl 클래스를 상속받는다. 
>
> 사용자가 입력한 값의 상태 및 변경 이벤트의 기본적인 구현부는 AbstractControl에 있다.
>
> AbstractControl를 상속받는 FormGroup과 FormArray는 입력폼을 묶어서 관리할 때 사용하는 클래스이다.



![8-2](/Users/Soonhyun/GoogleDrive/workspace/study/angular-study-2017/8장/image/8-2.jpeg)

> 주소를 입력받는 각 입력 요소가 FormControl 객체가 되고, 주소라는 의미로 모아서 FormGroup으로 묶을 수 있다.



### 8.2 템플릿 주도폼

템플릿 주도 폼은 템플릿 안에서 지시자를 사용하여 NgModel을 폼으로 구성하는 방식



#### 8.2.1 실습

- 프로젝트 생성

`ng new product-manager`



- app.module.ts

  > NgModel 지시자는 FormsModule에 포함되어 있기 때문에 NgModel로 양방향 바인딩을 사용하려면
  >
  > FormsModule를 임포트 해야한다.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```





- app.component.ts

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '상품등록';
  product: any;
  
  constructor() {
    this.initProduct();
  }

  initProduct(){
    this.product = {name:'', listPrice: '', qty:0, desc:''}
  }

  onSubmit(){
    alert(`제출\n${JSON.stringify(this.product)}`);
  }

  onReset(){
    this.initProduct();
  }
}
```




- app.component.html

```typescript
<h4 class="p-4">{{title}}</h4>
<form (ngSubmit)="onSubmit()" (ngReset)="onReset" #prodForm="ngForm" novalidate>
  <div class="input-group pl-5 my-3">
    <span class="input-group-addon" id="product-name">상품명</span>
    <input type="text" name="prod-name" class="form-control col-4" [(ngModel)]="product.name" required/>
  </div>

  <div class="input-group pl-5 my-3">
    <span class="input-group-addon" id="product-price">상품가격</span>
    <input type="text" name="prod-price" class="form-control col-4" [(ngModel)]="product.price" required pattern="[1-9]\d*"/>
  </div>

  <div class="input-group pl-5 my-3">
    <span class="input-group-addon" id="product-qty">상품수량</span>
    <input type="number" name="prod-qty" class="form-control col-4" [(ngModel)]="product.qty" required pattern="[1-9]\d*"/>
  </div>

  <div class="input-group pl-5 my-3">
    <textarea class="form-control col-6" name="prod-desc" rows="4" placeholder="상품설명" [(ngModel)]="product.desc" required minlength="5" maxlength="20"></textarea>
  </div>

  <div class="row m-3 p-3">
    <button type="submit" class="btn btn-info btn-sm mr-2" [disabled]="!prodForm.form.valid">상품등록</button>
    <button type="reset" class="btn btn-warning btn=sm">초기화</button>
  </div>
</form>
```



- 실행

`ng serve`

[http://localhost:4200/](http://localhost:4200/)



### 8.3 반응형 폼(모델 주도 폼)

폼을 구성하는 구현 코드를 템플릿이 아닌 컴포넌트에 작성



#### 8.3.1 템플릿 주도폼 -> 반응형 폼 변경 

- app.module.ts

  > ReactiveFormsModule 임포트

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```



- app.component.ts

```typescript
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
```





- app.component.html

```typescript
<h4 class="p-4">{{title}}</h4>
<form (ngSubmit)="onSubmit()" [formGroup]="prodForm" novalidate>
  <div class="input-group pl-5 my-3">
    <span class="input-group-addon" id="product-name">상품명</span>
    <input type="text" formControlName="name" class="form-control"/>
  </div>

  <div class="input-group pl-5 my-3">
    <span class="input-group-addon" id="product-price">상품가격</span>
    <input type="number" formControlName="listPrice" class="form-control"/>
  </div>

  <div class="input-group pl-5 my-3">
    <span class="input-group-addon" id="product-qty">상품수량</span>
    <input type="number" formControlName="qty" class="form-control"/>
  </div>

  <div class="input-group pl-5 my-3">
      <textarea formControlName="desc" rows="4" placeholder="상품 상세 설명" class="form-control"></textarea>
  </div>

  <div class="row m-3 p-3">
    <button type="submit" class="btn btn-info mr-2" [disabled]="!prodForm.valid">등록</button>
    <button type="reset" class="btn btn-warning btn=sm">초기화</button>
  </div>
</form>
```



- 실행

`ng serve`

[http://localhost:4200/](http://localhost:4200/)