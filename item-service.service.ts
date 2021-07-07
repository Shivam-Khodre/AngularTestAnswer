import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const url = 'item/service';
@Injectable({
  providedIn: 'root',
})
export class ItemServiceService {
  constructor(private http: HttpClient) {}

  addItem(item: any) {
    let options = {
      headers: {
        'Content-Type': 'text/plain',
        Acccept: 'application/json',
      },
    };
    this.http.post(url, item, options).subscribe(
      (response) => {
        console.log('Item Added Successfully');
      },
      (err) => {
        console.log('Failed to add Item');
      }
    );
  }
  UpdateItem(item: any) {
    let options = {
      headers: {
        'Content-Type': 'text/plain',
        Acccept: 'application/json',
      },
    };
    this.http.put(url, item, options).subscribe(
      (response) => {
        console.log('Item Updated Successfully');
      },
      (err) => {
        console.log('Failed to Update Item');
      }
    );
  }
  DeleteItem(item: any) {
    let options = {
      headers: {
        'Content-Type': 'text/plain',
        Acccept: 'application/json',
      },
    };
    this.http.post(url, item, options).subscribe(
      (response) => {
        console.log('Item Deleted Successfully');
      },
      (err) => {
        console.log('Failed to Delete Item');
      }
    );
  }
}
