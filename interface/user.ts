export interface Employee {
    name          : string,
    role          : "employee" | "manager",
    smart_working : {
        current   : string[]
    },
}

export interface Department {
    name      : string,
    employees : Employee[]
}