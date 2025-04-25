import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css'
})

export class ContactCardComponent implements OnInit {
  @Input() contact: any;
  @Output() contactUpdated = new EventEmitter<Contact>();

  contactForm!: FormGroup;
  isModalVisible: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      contactName: [this.contact.contactName || ''],
      contactEmail: [this.contact.contactEmail || ''],
      contactCellPhone: [this.contact.contactCellPhone || ''],
      contactTelephone: [this.contact.contactTelephone || ''],
      contactYNFavorite: [this.contact.contactYNFavorite || false],
      contactYNActive: [this.contact.contactYNActive || false],
      contactDtRegistration: [this.contact.contactDtRegistration || new Date()]
    });
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  saveChanges(): void {
    const updatedContact = this.contactForm.value;
    console.log('Contato atualizado:', updatedContact);
    this.closeModal();
  }

  updateContact(): void {
    this.contactUpdated.emit(this.contact);
  }

}
