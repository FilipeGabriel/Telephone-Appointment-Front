import { Component, OnInit } from '@angular/core';
import { ContactCardComponent } from "../../components/contact-card/contact-card.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ContactCardComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];
  isModalVisible: boolean = false;
  newContact: Contact = {
    contactId: 0,
    contactName: '',
    contactEmail: '',
    contactCellPhone: '',
    contactTelephone: '',
    contactYNFavorite: 0,
    contactYNActive: 1,
    contactDTRegistration: new Date().toISOString()
  };

  constructor() {}

  ngOnInit(): void {
    this.contacts = [
      {
        contactId: 1,
        contactName: 'João Silva',
        contactEmail: 'joao.silva@example.com',
        contactCellPhone: '1234567890',
        contactTelephone: '9876543210',
        contactYNFavorite: 1,
        contactYNActive: 0,
        contactDTRegistration: new Date().toISOString()
      },
      {
        contactId: 2,
        contactName: 'Maria Oliveira',
        contactEmail: 'maria.oliveira@example.com',
        contactCellPhone: '2345678901',
        contactTelephone: '8765432109',
        contactYNFavorite: 0,
        contactYNActive: 0,
        contactDTRegistration: new Date().toISOString()
      },
      {
        contactId: 3,
        contactName: 'Carlos Souza',
        contactEmail: 'carlos.souza@example.com',
        contactCellPhone: '3456789012',
        contactTelephone: '7654321098',
        contactYNFavorite: 0,
        contactYNActive: 1,
        contactDTRegistration: new Date().toISOString()
      },
      {
        contactId: 4,
        contactName: 'Carlos Souza',
        contactEmail: 'carlos.souza@example.com',
        contactCellPhone: '3456789012',
        contactTelephone: '7654321098',
        contactYNFavorite: 1,
        contactYNActive: 1,
        contactDTRegistration: new Date().toISOString()
      }
    ];
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.resetNewContact();
  }

  saveContact(): void {
    const newContactId = this.contacts.length + 1;
    const newContact = { ...this.newContact, contactId: newContactId };
    this.contacts.push(newContact);
    this.closeModal();
  }

  resetNewContact(): void {
    this.newContact = {
      contactId: 0,
      contactName: '',
      contactEmail: '',
      contactCellPhone: '',
      contactTelephone: '',
      contactYNFavorite: 0,
      contactYNActive: 1,
      contactDTRegistration: new Date().toISOString()
    };
  }

  handleContactUpdated(updatedContact: Contact): void {
    console.log('Contato atualizado:', updatedContact);
  }
}
