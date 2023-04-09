import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css'],
})
export class HomeBodyComponent implements OnInit {
  products: any[] = [];

  constructor(
    public homeService: HomeService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.homeService.getProducts();

    this.homeService.productsStatus$.subscribe((status) => {
      status.maybeMap({
        succeeded: (products: any[]) => {
          console.warn(products);
          this.products = products;
        },
        failed: (_) => {
          this.snackBarService.showError({
            message: 'Erro ao carregar produtos',
          });
        },
      });
    });
  }

  buyProduct(productId: string) {
    let product = this.products.find((product) => product.id === productId);

    if (!!product) {
      // TODO: Add to cart
    }
  }
}
