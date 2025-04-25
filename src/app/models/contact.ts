import { User } from "./user";

export interface Contact {
  contactId?: number;
  contactName: string;
  contactEmail?: string;
  contactCellPhone: string;
  contactTelephone?: string;
  contactYNFavorite: number;
  contactYNActive: number;
  contactDTRegistration?: string;
  contactUser?: User;
}
