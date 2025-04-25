import { Contact } from "./contact";

export interface User {
  userId?: number;
  userEmail: string;
  userPassword: string;
  userDTRegistration?: string;
  userContacts?: Contact[];
}
