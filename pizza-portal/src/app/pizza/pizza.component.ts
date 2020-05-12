import { Component, OnInit } from '@angular/core';
import {Pizza} from '../service/pizza';
import {HttpClientService} from '../service/http-client.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})

export class PizzaComponent implements OnInit {
  pizzaData: Pizza[] ;
  temp = false;
  closeResult: string;
  pizzaForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  public editData: Pizza;
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pizzaService: HttpClientService,
    private modalService: NgbModal
  ) { }

  open(content: any) {
    /*this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });*/
    console.log(content);
    this.modalService.open(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {

    this.pizzaForm = this.formBuilder.group({
      // id: [''],
      pizza_Type: ['', Validators.required],
      pizza_Size: ['', Validators.required],
      pizza_Price: ['', Validators.required]
    });

    this.loadTable();
  }

  loadTable() {
    this.pizzaService.getPizza().subscribe(data => {
      this.pizzaData = data;
      this.temp = true;
    });
  }

  editPizza(editData: Pizza) {
    this.pizzaService.updatePizza(editData).subscribe(res => {
      if (res === true) {
        console.log('success');
      } else {
        console.log('failure');
      }
    });
    editData.isEditable = false;
   // this.pizzaForm.setValue({id: 10, pizza_Type: 'Brooklyn Style', pizza_Size: 'Small', pizza_Price: '5'});
   // this.modalService.open(content);
   }

   deletePizza(deleteData: Pizza) {
     this.pizzaService.deletePizza(deleteData).subscribe(res => {
         if (res === true) {
           this.loadTable();
         }
       });
   }

  // convenience getter for easy access to form fields
  get f() { return this.pizzaForm.controls; }

  onSubmit() {
     this.submitted = true;
     console.log('i passed line 43');
    // stop here if form is invalid
     if (this.pizzaForm.invalid) {
       return;
     }

     this.pizzaService.savePizza(this.pizzaForm.value)
       .subscribe(data => {
           this.loadTable();
       });
     this.modalService.dismissAll();
     this.pizzaForm.reset();
  }
}
