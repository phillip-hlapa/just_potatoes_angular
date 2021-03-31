import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/products/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }

  Products;
  Order: Array<any> = [];
  OrderedProducts: Array<any> = [];
  OrderTotal = 0;
  isThereOrder = false;
  quantity = 1;
  previousQuantity = 0;

  //submitting order
   submitButtonAvailable = true;

  ngOnInit(): void {
    this.GetProducts();
  }

  private GetProducts() {
    this.productService.getProducts().subscribe(response => {
      console.log(response)
      this.Products = response;
    }, err => {
      console.log(err)
    });
  }

  public add_product(product_id: any){
      this.Order.push(product_id);
      if(this.Order.length > 0) {
          this.isThereOrder = true;
      }
      this.doOrder(product_id);
  }

  private doOrder(product_id) {
          this.productService.getProduct(product_id).subscribe(productOrdered => {
              let orderedProduct: any = productOrdered;
              this.submitButtonAvailable = true;
              this.OrderTotal = this.OrderTotal + parseInt(orderedProduct.product_price);
              this.OrderedProducts.push(productOrdered);
              console.log(this.OrderTotal)
          })
  }
  private deleteProdFromOrder(product_id: any) {
      for(let i = 0; i < this.Order.length; i++) {
          let myProduct: any;
          if(this.Order[i] === product_id) {
              this.productService.getProduct(product_id).subscribe(product => {
                  myProduct = product;
                  this.OrderTotal = this.OrderTotal - (parseInt(myProduct.product_price) * this.quantity)
                  this.OrderedProducts.splice(this.OrderedProducts.indexOf(myProduct), 1)
                  this.Order.splice(this.Order.indexOf(product_id), 1)

                  if(this.Order.length === 0) {
                      this.OrderTotal = 0;
                      this.submitButtonAvailable = false;
                  } else {

                  }
              });


          }
      }
  }

   private quantityTotalCalculate(product_id: any) {
        let myProduct: any;
        this.productService.getProduct(product_id).subscribe(product => {
            myProduct = product;
            console.log(this.quantity)
            if(this.quantity >= 1) {
                if(this.quantity > this.previousQuantity) {
                    this.previousQuantity = this.quantity;
                    this.OrderTotal = this.OrderTotal + (parseInt(myProduct.product_price) * this.quantity)
                } else {
                    this.previousQuantity = this.quantity;
                    this.OrderTotal = this.OrderTotal - (parseInt(myProduct.product_price) * this.quantity)
                }
            }

        })
    }

    private removeProduct(product_id: any) {

    }

    private onSubmitOrder() {
        let orderDetails = {
            order_total: this.OrderTotal,
            order_products: this.Order,
            order_by: localStorage.getItem("userId")
        }
        this.productService.submitOrder(orderDetails).subscribe(result => {
            this.submitButtonAvailable = false;
            if(result) {
                console.log(result)
            }
        })
    }
}
