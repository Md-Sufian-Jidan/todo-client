import { useContext } from "react";
import { AuthContext } from "../Routes/AuthProvider";

export const useAuth = () => useContext(AuthContext);
