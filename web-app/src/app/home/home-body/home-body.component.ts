import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { SnackBarService } from '../../services/snack-bar.service';
import ProductModel from '../../models/product.model';
import { currencyFormatterBR } from '../../shared/utils/currency-formatter';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css'],
})
export class HomeBodyComponent implements OnInit {
  products: ProductModel[] = [];

  constructor(
    public homeService: HomeService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.homeService.getProducts();

    this.homeService.productsStatus$.subscribe((status) => {
      status.maybeMap({
        succeeded: (products: ProductModel[]) => {
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

  formatPrice(price: string) {
    return currencyFormatterBR(parseInt(price));
  }

  buyProduct(productId: string) {
    let product = this.products.find((product) => product.id === productId);

    if (!!product) {
      this.homeService.buyProduct(product);
    }
  }
}
