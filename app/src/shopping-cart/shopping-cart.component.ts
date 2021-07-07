import { AddItemComponent } from './../add-item/add-item.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemServiceService } from '../item-service.service';

export interface PeriodicElement {
  name: string;
  position: number;
  description: string;
  price: number;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(public dialog: MatDialog,
    public service: ItemServiceService) {}

  ngOnInit(): void {}

  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Item1', description: 'Hello', price: 100 },
    { position: 2, name: 'Item2', description: 'Hello', price: 200 },
  ];

  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'price',
    'action',
  ];
  dataSource = this.ELEMENT_DATA;

  openDialog(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '400px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.event == 'Add') {
          this.addData(result);
        } else if (result.event == 'Update') {
          this.updateRowData(result);
        }
      }
    });
  }

  addData(result: any) {
    let item = {
      position: this.ELEMENT_DATA.length + 1,
      name: result.name,
      description: result.description,
      price: result.price,
    };
    this.dataSource = [...this.dataSource, item];
    this.service.addItem(item);
  }

  updateRowData(result: any) {
    this.dataSource = this.dataSource.filter((value) => {
      if (value.position == result.position) {
        value.name = result.name;
        value.description = result.description;
        value.price = result.price;
      }
      return true;
    });
    this.service.UpdateItem(result);
  }

  deleteItem(result: any) {
    this.dataSource = this.dataSource.filter((value)=>{
      return value.position != result;
    });
    this.service.DeleteItem(result);
  }
}
