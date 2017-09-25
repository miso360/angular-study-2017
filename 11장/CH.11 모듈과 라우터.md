# CH.11 모듈과 라우터

- 모듈 : 컴포턴트, 서비스, 지시자, 파이프를 하나로 묶어서 제공하는 기능

  앵귤러는 BrowserModule, HttpModule, FormsModule 등으로 구성되어 있음.

- 라우터 : 뷰의 전환과 이동을 담당함. URL이 변경되면 매핑된 컴포넌트 뷰로 전환시킴.

  URL이 변경되어 매핑된 컴포넌트 뷰로 전환할 때 뷰에 필요한 고유의 지시자, 파이프, 서비스도 함께 사용됨. 

  각 뷰마다 달리 사용되는 요소들을 모듈화하여 관리하면 편리함.

### 11.1 모듈의 분리

10장 예제와 같이 `AppModule`에 모든 요소를 등록하면

1.  AppModule의 크기가 커짐 -> 관리 힘듬
2. 이름이 중복될 확률이 높음
3. 모듈 단위 지연로딩이 불가능. 최초 뷰가 렌더링 될 때 최초 뷰에서 사용하지 않는 요소까지 모두 컴파일 됨 -> 속도

모듈은 역할에 따라 크게 세 가지 유형으로 나눌 수 있음

- 기능 모듈 : 관련된 기능 및 목적 혹은 특정 페이지를 기준으로 요소를 구성한 모듈
- 공유 모듈 : 여러 모듈에서 공통으로 사용되는 요소로 구성한 모듈
- 핵심 모듈 : 최초 부트스트래핑에서 아요할 요소를 AppModule에서 분리하여 관리할 용도로 만든 모듈



### 11.1.1 기능 모듈

특정 페이지나 화면에 필요한 요소들을 페이지나 화면 단위로 모듈화

10장 SCM 예제를 활용하여 기능 모듈을 구성하기

==기능 모듈 생성==

```shell
ng g module product
ng g module category
```

폴더구조

```  
src
|--app
|  |--product
|  |--category
```

**src/app/product/product.module.ts**

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ProductModule { }

```

기본적으로 `CommonModule`을 임포트 함. `CommonModule`은 템플릿에서 빈번하게 사용되는 ngIf, ngFor와 같은 기본 지시자와 내장 파이프를 담고 있기 때문에 기본으로 임포트해야 하는 모듈임

지금까지는 `AppModule`에서 `BrowswerModule`을 임포트해서 사용했고 `BrowserModule`이 `CommonModule`을 내장하고 있었음

`BrowswerModule`은 웹브라우저에서 애플리케이션을 구동시키는 데 필요한 기능을 담고 있음

Product 화면에서는 이 기능이 필요 없기 때문에 `CommonModule`을 임포트

==생성한 product, category 모듈을 `AppModule`에 임포트하기==

imports 배열 안에서 기본 앵귤러 모듈과 구분되어 있음을 확인

**src/app/app.module.ts**

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    /* Angular Modules */
    BrowserModule, FormsModule, HttpModule,

    /* App Modules */
    ProductModule, CategoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 11.1.2 핵심 모듈

(계속해서 위 app.module.ts 참고)

기능 모듈에는 포함되지 않은 요소들을 `AppModule`과 분리하여 모듈화

`AppModule`은 순수하게 루트 모듈로서 앵귤러 제공 모듈, 외부 라이브러리 모듈, 애플리케이션에서 생성한 모듈을 임포트 하는 역할로 한정할 수 있음

최초 애플리케이션 화면을 위한 AppComponent를 제외하고 전역적으로 사용되는 요소들을 핵심 모듈로 분리

(여기서는 NavbarComponent, SidebarComponent, FooterComponent를 분리 가능)

이후 공통으로 사용할 서비스는 핵심 모듈에 선언하면 됨.

==핵심 모듈 생성==

```shell
ng g module scm-main
```

==navbar, sidebar, footer 폴더 통째로 이동==

app/navbar, sidebar, footer -> app/scm-main/navbar, sidebar, footer

```
app
|-- scm-main
|     |-- navbar
|     |-- sidebar
|     |-- footer
```

==`ScmMainModule`에 이동시킨 컴포넌트 등록==

**src/app/scm-main/scm-main.module.ts**

```typescript

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavbarComponent, SidebarComponent, FooterComponent]
})
export class ScmMainModule { }

```

```typescript
#src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ScmMainModule } from './scm-main/scm-main.module'

import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    /* Angular Modules */
    BrowserModule, FormsModule, HttpModule,

    /* App Modules */
    ScmMainModule, ProductModule, CategoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### 11.1.3 모듈의 imports, exports

위 상태로 실행하면 에러가 발생함

 `AppModule`에서 `ScmMainModule`에서 선언한 컴포넌트를 참조할 수 없기 때문

모듈에 `imports`로 선언한 요소들은 해당 모듈에서만 사용 가능

==외부에서 사용하도록 하려면 `exports`로 노출시킴==

**src/app/scm-main/scm-main.module.ts**

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavbarComponent, SidebarComponent, FooterComponent],
  exports: [NavbarComponent, SidebarComponent, FooterComponent]
})
export class ScmMainModule { }

```

==책에 누락된 내용==

**src/app/app.component.ts**

```typescript
import { Component } from '@angular/core';
import { SidebarMenu } from './scm-main/sidebar/sidebar.component'

@Component({
  selector: 'scm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentMenu: SidebarMenu;
}

```

### 11.1.4 프로젝트 구현 2: 도메인별 기본 구현

이후 라우터 실습에 사용할 각 도메인의 메인 뷰 컴포넌트를 생성

변경내역 확인 : http://bit.ly/hb-af-final5

**기능 모듈로 분리되어 있기 때문에 컴포넌트를 생성할 폴더 위치를 주의해야 함**

==폴더 이동 및 컴포넌트 생성==

```shell
cd src/app/product
ng g component product-management
```

==import 경로 수정 및 exports 선언==

**src/app/product/product.module.ts**

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management/product-management.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductManagementComponent],
  exports: [ProductManagementComponent]
})
export class ProductModule { }

```

==AppComponent 템플릿에서 생성한 컴포넌트 보이게 하기==

**src/app/app.component.html**

```html
<div *ngSwitchCase="'product'">
      <scm-product-management></scm-product-management>
</div>
```

==category-management 컴포넌트도 동일한 절차==

product -> category



추가로 최초 메인 대시보드 뷰 컴포넌트와 찾을 수 없는 페이지 컴포넌트를 생성

특정 도메인에 속하지 않으므로 별도의 기능 모듈이 아닌 핵심 모듈에 두 컴포넌트를 등록

==컴포넌트 생성 및 모듈에 선언==

```
cd src/app/scm-main
ng g component main-dashboard
ng g component page-not-found
```

`declarations`와 `exports`의 내용이 중복되므로 공용으로 사용할 배열을 생성하여 이용

**src/app/scm-main.module.ts**

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const CORE_COMPONENTS = [NavbarComponent, SidebarComponent, FooterComponent, MainDashboardComponent, PageNotFoundComponent];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: CORE_COMPONENTS,
  exports: CORE_COMPONENTS
})
export class ScmMainModule { }
```

==`app.component.html` 수정==

**src/app/app.component.html**

```html
    <div *ngSwitchDefault>
      <scm-main-dashboard></scm-main-dashboard>
    </div>
```



