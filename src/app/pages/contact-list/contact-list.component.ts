import { Component, OnInit } from '@angular/core';
import { ContactCardComponent } from "../../components/contact-card/contact-card.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ContactCardComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit {

  contactForm!: FormGroup;
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  isModalVisible: boolean = false;
  searchTerm: string = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private toastr: ToastrService
  ) {
    this.contactForm = this.fb.group({
      contactName: [''],
      contactEmail: [''],
      contactCellPhone: [''],
      contactTelephone: [''],
      contactYNFavorite: false,
      contactYNActive: true,
    });
  }

  ngOnInit(): void {
    this.getContactList();
  }

  getContactList() {
    this.contactService
        .getContactsByUserId()
        .subscribe({
          next: (response) => {
            this.contacts = response;
            this.filteredContacts = [...response];
          },
          error: (error) => {
            this.toastr.error('Não foi possível carregar os contatos');
          }
    });
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.resetNewContact();
  }

  saveContact(): void {
    const contact = {
      ...this.contactForm.value,
      contactYNFavorite: this.contactForm.value.contactYNFavorite ? 1 : 0,
      contactYNActive: this.contactForm.value.contactYNActive ? 1 : 0
    };

    this.contactService
        .insertContact(contact)
        .subscribe({
          next: (response) => {
            this.toastr.success('Contato cadastrado!');
            this.getContactList();
            this.closeModal();
          },
          error: (error) => {
            this.toastr.error('Erro ao salvar contato.');
          }
    });

    this.closeModal();
  }

  resetNewContact(): void {
    this.contactForm.reset({
      contactName: '',
      contactEmail: '',
      contactCellPhone: '',
      contactTelephone: '',
      contactYNFavorite: false,
      contactYNActive: true,
    });
  }

  onSearchChange() {
    const term = this.removeAccents(this.searchTerm.toLowerCase().trim());

    if (!term) {
      this.filteredContacts = [...this.contacts];
      return;
    }

    this.filteredContacts = this.contacts.filter(contact => {
      const name = this.removeAccents(contact.contactName?.toLowerCase() || '');
      const email = this.removeAccents(contact.contactEmail?.toLowerCase() || '');
      const cellPhone = (contact.contactCellPhone || '').replace(/\D/g, '');
      const telephone = (contact.contactTelephone || '').replace(/\D/g, '');

      return (
        name.includes(term) ||
        email.includes(term) ||
        cellPhone.includes(term) ||
        telephone.includes(term)
      );
    });
  }

  removeAccents(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
