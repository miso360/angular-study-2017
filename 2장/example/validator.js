/**
 * input 및 select box Validation Class
 * @param appendClass validation이 실패했을때 해당 input에 추가할 class
 * @param callback validation이 실패했을때 수행할 함수
 * @constructor
 */
function Validator(appendClass, callback) {
    // 검사 목록
    this.checkList = [];
    this.appendClass = appendClass;
    this.callback = callback;

    /**
     *
     * @param input 검사할 객체
     * @param option type => email, number, string
     *               min => type == number 최소값
     *                      type == string 문자열 최소 길이
     *               max => type == number 최대값
     *                      type == string 문자열 최대 길이
     */
    this.add = function (input, option) {
        var check = {
            input: input,
            option: option
        };

        if (check.option.type == 'email') {
            check.test = this.testEmail;
        } else if (check.option.type == 'number') {
            check.test = this.testNumber;
        } else if (check.option.type == 'string') {
            check.test = this.testString;
        } else if (check.option.type == 'select') {
            check.test = this.testSelect;
        } else if (check.option.type == 'same') {
            check.test = this.testSame;
        } else if (check.option.type == 'date') {
            check.test = this.testDate;
        }

        this.checkList.push(check);
    };

    this.validate = function () {
        $('.' + appendClass).removeClass(appendClass);

        var invalidInputList = [];

        for (var i = 0; i < this.checkList.length; i++) {
            var check = this.checkList[i];

            if (check.test(check) == false) {
                var $input = $('#' + check.input);

                invalidInputList.push(check.input);
                $input.addClass(this.appendClass);
            }
        }

        if (invalidInputList.length > 0 && this.callback != null) {
            callback();
        }

        return invalidInputList;
    };

    this.testEmail = function () {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
            .test($('#' + this.input).val());
    };

    this.testNumber = function () {
        var val = $('#' + this.input).val();
        var intVal = parseInt(val);

        if (intVal >= this.option.min &&
            intVal <= this.option.max) {
            return true;
        }

        return false;
    };

    this.testString = function () {
        var reg = new RegExp('^[0-9a-zA-Z\-\(\),.+# ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{' + this.option.min + ',' + this.option.max + '}$');
        return reg.test($('#' + this.input).val());
    };

    this.testSelect = function () {
        var $input = $('#' + this.input);
        if ($('option:selected', $input).val() == '') {
            return false;
        }

        return true;
    };

    this.testSame = function () {
        var val = $('#' + this.input).val();
        var compareVal = $('#' + this.option.compareTo).val();

        return val === compareVal;
    }

    this.testDate = function () {
        return /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/
            .test($('#' + this.input).val());
    }
}

$(function () {
    var validator = new Validator('error');
    validator.add('exampleInputEmail1', { type: 'email' });
    validator.add('name', { type: 'string', min: 1, max: 5 });



    $('form').submit(function () {
        validator.validate();

        return false;
    });
});