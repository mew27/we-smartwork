import { createContext} from "react";

import { Employee } from "../interface/user";

export const UserContext = createContext<Employee | null>(null);