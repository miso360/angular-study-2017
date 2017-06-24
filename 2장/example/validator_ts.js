class CheckNumber {
    constructor(min, max, inputName) {
        this.min = min;
        this.max = max;
        this.inputName = inputName;
    }
    validate() {
        let val = $('#' + this.inputName).val();
        let intVal = parseInt(val);
        if (intVal >= this.min &&
            intVal <= this.max) {
            return true;
        }
        return false;
    }
    getInputName() {
        return this.inputName;
    }
}
class CheckString {
    constructor(min, max, inputName) {
        this.min = min;
        this.max = max;
        this.inputName = inputName;
    }
    validate() {
        var reg = new RegExp('^[0-9a-zA-Z\-\(\),.+# ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{' + this.min + ',' + this.max + '}$');
        return reg.test($('#' + this.inputName).val());
    }
    getInputName() {
        return this.inputName;
    }
}
class CheckEmail {
    constructor(inputName) {
        this.inputName = inputName;
    }
    validate() {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
            .test($('#' + this.inputName).val());
    }
    getInputName() {
        return this.inputName;
    }
}
class CheckSelect {
    constructor(inputName) {
        this.inputName = inputName;
    }
    validate() {
        var $input = $('#' + this.inputName);
        if ($('option:selected', $input).val() == '') {
            return false;
        }
        return true;
    }
}
class CheckSame {
    constructor(inputName, compareTo) {
        this.inputName = inputName;
        this.compareTo = compareTo;
    }
    validate() {
        let val = $('#' + this.inputName).val();
        let compareVal = $('#' + this.compareTo).val();
        return val === compareVal;
    }
}
class CheckDate {
    constructor(inputName) {
        this.inputName = inputName;
    }
    validate() {
        return /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/
            .test($('#' + this.inputName).val());
    }
}
/**
 * input 및 select box Validation Class
 * @param appendClass validation이 실패했을때 해당 input에 추가할 class
 * @param callback validation이 실패했을때 수행할 함수
 * @constructor
 */
class Validator {
    constructor(appendClass, checkList, callback) {
        this.appendClass = appendClass;
        this.checkList = checkList;
        this.callback = callback;
    }
    /**
     * 검사할 객체 추가
     * @param check 검사할 객체
     */
    add(check) {
        this.checkList.push(check);
    }
    ;
    validate() {
        $('.' + this.appendClass).removeClass(this.appendClass);
        let invalidInputList;
        invalidInputList =
            this.checkList.filter((check, index) => !check.validate());
        if (invalidInputList.length > 0 && this.callback != null) {
            this.callback();
        }
        invalidInputList.forEach((check, index) => $('#' + check.getInputName()).addClass(this.appendClass));
        return invalidInputList;
    }
    ;
}
$(function () {
    let validator = new Validator("error", [
        new CheckEmail("exampleInputEmail1"),
        new CheckString(1, 5, "name")
    ], () => alert("error"));
    $('form').submit(function () {
        validator.validate();
        return false;
    });
});
