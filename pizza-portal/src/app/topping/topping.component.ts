import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from '../service/http-client.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Topping} from '../service/topping';

@Component({
  selector: 'app-topping',
  templateUrl: './topping.component.html',
  styleUrls: ['./topping.component.css']
})
export class ToppingComponent implements OnInit {
  toppingForm: FormGroup;
  private submitted: boolean;
 // private temp: boolean;
  private toppingData: Topping[];
   loading: false;

  constructor(
    private formBuilder: FormBuilder,
    private toppingService: HttpClientService,
    private modalService: NgbModal
  ) {
  }

  // convenience getter for easy access to form fields
  get f() { return this.toppingForm.controls; }

  ngOnInit() {
    this.toppingForm = this.formBuilder.group({
      topping_Name: ['', Validators.required],
      topping_Quantity: ['', Validators.required],
      topping_Price: ['', Validators.required]
    });
    this.loadTable();
  }

  onSubmit() {
    this.submitted = true;
    if (this.toppingForm.invalid) {
      return;
    }

    this.toppingService.saveTopping(this.toppingForm.value)
      .subscribe(data => {
        this.loadTable();
      });
    this.modalService.dismissAll();
    this.toppingForm.reset();
  }

  private loadTable() {
    this.toppingService.getTopping().subscribe(data => {
      this.toppingData = data;
      // this.temp = true;
    });
  }

  editTopping(toppingData: Topping) {
    this.toppingService.updateTopping(toppingData).subscribe(res => {
        if(res === 'true') {
          alert('success');
        } else {
          alert('failure');
        }
    });
    toppingData.isEditable = false;
    return;
  }

  open(content: any) {
    this.modalService.open(content);
  }
}
