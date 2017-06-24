#2 앵귤러 시작하기

## 2.1 타입스크립트
1. 타입스크립트란?
`TypeScript is typed superset of JavaScript that compiles to plain JavaScript`


### 2.1.1 타입 언어
1. 타입을 이용한 변수 선언
```javascript
var age: number;
let name: string;
```
  - number, string과 같은 타입을 선언하는 스크립트 언어.

2. 자바스크립트의 타입캐스팅 문제
```javascript
var unknownTypedVal = 1 + "1";
if ( unknownTypedVal === 2 ) {
    console.log("비교 성공");
}else{
	console.log("여긴 들어오면 안된다구요");
}
```
 - javascript에서 문자열 자료형과 숫자 자료형의 덧셈 연산은 숫자 자료형을 문자열로 캐스팅 후 수행된다.
 - unknownTypeVal = "11"
 - [Play](http://www.typescriptlang.org/play/index.html)

3. 상위 언어
 - 자바스크립트 언어에 타입정보가 추가
4. 열린 언어
 - 설정에 따라 ES3, ES4, ES5 등등으로 변환할 수 있다.
5. 타입스크립트 사용
 - 설치: `npm install -g typescript`
 - 버전 확인: `tsc --version`
 - 컴파일: `tsc filename.ts` => ES3
 - 컴파일 자바스크립트 버전 지정: `tsc filename.ts --target es6` `tsc filename.ts -t es6`
6. 예제 [2-2](./class-extend.ts)
7. 예제 [2-3](./class-extend2.ts)

## 2.2 Hello, Angular
1. Angular CLI
 - 앵귤러 개발에 필요한 코드 자동 생성, 개발 서버, 배포, 테스트등의 툴을 제공해 준다.
 - Vue, Node Express, Springboot등도 CLI가 있음
 - 소스를 수정하면 'hot reload'를 수행한다.

2. Angular CLI 명령
 - 생성: `ng new PackageName`
 - 실행: `ng serve`

 **Polyfill VS Babel**
  - Polyfill
    브라우저에서 지원하지 않는 기능을 구현해놓은 유틸( ex: promise )
  - Babel
    EcmaScript6의 자바스크립트를 ES5, ES4등으로 변환해주는 transpiler(typescript)

3. ng test
 - Angular 테스트 도구

### Typescript 타입선언 정보
```javascript
const words = "1,2,3,4".split(",");
let sum = 0;
words.forEach(w => sum += parseInt(w));

console.log(`sum: ${sum}`);
```
- javascript에서의 결과는?
- parseInt를 제거한 상태에서 javascript에서의 결과는?
- typescript에서의 결과는?
- parseInt를 제거한 typescrpt에서의 결과는? 왜?

[typescript의 타입정보](https://github.com/Microsoft/TypeScript/tree/master/lib)
[type 정보를 모아 놓은곳](http:/microsoft/github.io/TypeSearch)