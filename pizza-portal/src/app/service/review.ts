export class Review {
  review_Id: string;
  comments: string;
  order_Id: string;
  user_Id: string;

  constructor(){
    this.comments = "";
    this.order_Id = "";
    this.review_Id = "";
    this.user_Id = "";
  }

}
