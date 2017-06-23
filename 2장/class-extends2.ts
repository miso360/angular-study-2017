class Person {
    static FAMILY_NAME: string = 'Park'; 

    constructor(
        public name: string,
         public age: number
    ) {

    }
}

class Employee extends Person{
    constructor(
        public name: string, 
        public age: number, 
        public department: string, 
        public role: string
    ) {
        super(name, age);
        //super();
    }

}