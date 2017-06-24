import $ from "jquery";

interface Check{
    validate(): boolean;

    getInputName(): string;
}

class CheckNumber{
    constructor(
         private min: number,
         private max: number,
         private inputName: string
    ){
    }

    validate(): boolean {
        let val: string = $('#' + this.inputName).val() as string;
        let intVal: number = parseInt(val);

        if(intVal >= this.min &&
           intVal <= this.max ) {
            return true;
        }

        return false;
    }

    getInputName(): string {
        return this.inputName;
    }
}

class CheckString{
    constructor(
        private min: number,
        private max: number,
        private inputName: string
    ) {
    }

    validate(): boolean {
        var reg = new RegExp('^[0-9a-zA-Z\-\(\),.+# ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{' + this.min + ',' + this.max + '}$');
        return reg.test($('#' + this.inputName).val() as string);
    }

    getInputName(): string {
        return this.inputName;
    }
}

class CheckEmail{
    constructor(
        private inputName: string
    ){
    }

    validate(): boolean {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
            .test($('#' + this.inputName).val() as string);
    }

    getInputName(): string {
        return this.inputName;
    }
}

class CheckSelect{
    constructor(
        private inputName: string
    ){
    }

    validate(): boolean {
        var $input = $('#' + this.inputName);
        if( $('option:selected', $input).val() == '') {
           return false;
        }

        return true;
    }
}

class CheckSame{
    constructor(
        private inputName: string,
        private compareTo: string
    ){

    }

    validate(): boolean {
        let val = $('#' + this.inputName).val() as string;
        let compareVal = $('#' + this.compareTo).val() as string;

        return val === compareVal;
    }
            
}

class CheckDate{
    constructor(
        private inputName: string
    ){

    }

    validate(): boolean{
        return /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/
        .test($('#' + this.inputName).val() as string);
    }
}


        

/**
 * input 및 select box Validation Class
 * @param appendClass validation이 실패했을때 해당 input에 추가할 class
 * @param callback validation이 실패했을때 수행할 함수
 * @constructor
 */
class Validator {
    constructor(
        private appendClass: string,
        private checkList: Check[], 
        private callback: ()=>any,
    ) {
    }

    /**
     * 검사할 객체 추가
     * @param check 검사할 객체
     */
    add( check: Check ) {
        this.checkList.push( check );
    };

    validate() {
        $('.' + this.appendClass).removeClass(this.appendClass);

        let invalidInputList: Check[];

        invalidInputList = 
            this.checkList.filter( (check: Check, index: number) => !check.validate() );

        if( invalidInputList.length > 0 && this.callback != null ) {
            this.callback();
        }

        invalidInputList.forEach((check: Check, index: number) => $('#' + check.getInputName()).addClass(this.appendClass));

        return invalidInputList;
    };
}

$(function (){
    let validator = new Validator(
        "error",
        [
            new CheckEmail("exampleInputEmail1"),
            new CheckString(1, 5, "name")
        ],
        () => alert("error")
    );

    $('form').submit(function (){
        validator.validate();
        return false;
    });
});