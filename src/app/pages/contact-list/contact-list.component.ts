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
  isModalVisible: boolean = false;


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
            console.log(error)
            this.toastr.error('erro');
          }
    });

    this.closeModal();
  }

  resetNewContact(): void {
    this.contactForm = this.fb.group({
      contactName: [''],
      contactEmail: [''],
      contactCellPhone: [''],
      contactTelephone: [''],
      contactYNFavorite: false,
      contactYNActive: true,
    });
  }
}
