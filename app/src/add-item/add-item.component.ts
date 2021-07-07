import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  action: string;
  name: string;
  description: string;
  price: number;
  position: number;
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  itemName: string = '';
  itemDescription: string = '';
  itemPrice: number = 0;
  action: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.action === 'Update') {
      this.itemName = this.data.name;
      this.itemDescription = this.data.description;
      this.itemPrice = this.data.price;
    }
    this.action = this.data.action;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(f: NgForm) {
    this.dialogRef.close({
      event: this.action,
      position: this.data.position ? this.data.position : 0,
      name: f.value.itemNameValue,
      description: f.value.itemDescriptionValue,
      price: f.value.itemPriceValue,
    });
  }
}
