import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { PhoneFormatPipe } from '../../pipes/phone-format.pipe';
import { DateTimeFormatPipe } from '../../pipes/date-time-format.pipe';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PhoneFormatPipe, DateTimeFormatPipe],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css'
})

export class ContactCardComponent implements OnInit {
  @Input() contact: any;
  @Output() contactUpdated = new EventEmitter<void>();

  contactForm!: FormGroup;
  isModalVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      contactName: [this.contact?.contactName || ''],
      contactEmail: [this.contact?.contactEmail || ''],
      contactCellPhone: [this.contact?.contactCellPhone || ''],
      contactTelephone: [this.contact?.contactTelephone || ''],
      contactYNFavorite: [this.contact?.contactYNFavorite === 1],
      contactYNActive: [this.contact?.contactYNActive === 1],
      contactDtRegistration: [this.contact?.contactDtRegistration || new Date()]
    });
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.initForm();
    this.isModalVisible = false;
  }

  saveChanges(): void {
    const updatedContact = {
      ...this.contactForm.value,
      contactYNFavorite: this.contactForm.value.contactYNFavorite ? 1 : 0,
      contactYNActive: this.contactForm.value.contactYNActive ? 1 : 0
    };

    this.contactService
        .updateContact(this.contact.contactId,updatedContact)
        .subscribe({
          next: (response) => {
            this.toastr.success('Contato atualizado!');
            this.contactUpdated.emit();
            this.closeModal();
          },
          error: (error) => {
            this.toastr.error(error.error.message);
          }
    });
  }

  deleteContact() {
    this.contactService
        .deleteContact(this.contact.contactId)
        .subscribe({
          next: (response) => {
            this.toastr.success('Contato deletado!');
            this.contactUpdated.emit();
            this.closeModal();
          },
          error: (error) => {
            this.toastr.error('Contato não encontrado!');
          }
    });
  }

  onPhoneInput(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, '');

    this.contactForm.get(controlName)?.setValue(digitsOnly);
  }

}
