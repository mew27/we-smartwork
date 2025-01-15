export interface Employee {
    _id           : string,
    name          : string,
    role          : "employee" | "manager",
    department?   : Department,
    smart_working : {
        current   : string[]
    },
}

export interface Department {
    _id       : string,
    name      : string,
    employees? : Employee[]
}