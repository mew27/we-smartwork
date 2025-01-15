import { createContext} from "react";

import { Department, Employee } from "../interface/db_schema";

interface UserContextType {
    user : Employee | null,
    setUser : (newUser : Employee) => void, 
}

interface DepartmentContextType {
    department : Department | null,
    setDepartment : (newDepartment : Department) => void
}

export const UserContext       = createContext<UserContextType>({user : null, setUser : () => {}});
export const DepartmentContext = createContext<DepartmentContextType>({department : null, setDepartment : () => {}});
