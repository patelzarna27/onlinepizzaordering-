export class Order {
    order_id: string;
    user_id: string;
    order_total: string;
    order_status: string;
    createdAt: Date;
    isEditable:boolean = false;

  constructor(){
    this.order_id = "";
    this.order_total = "";
    this.user_id = "";
    this.order_status = "";
    this.createdAt = new Date();
  }

}
