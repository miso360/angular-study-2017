class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
Person.FAMILY_NAME = 'Park';
class Employee extends Person {
    constructor(name, age, department, role) {
        super(name, age);
        this.name = name;
        this.age = age;
        this.department = department;
        this.role = role;
        //super();
    }
}
