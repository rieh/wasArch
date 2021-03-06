import { PaginationContext } from './pagination-context.class';
import { PageResponse } from 'src/app/interfaces/page-response.interface';
import { ProductsService } from '../../providers/http/products.service';
import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { GenericHttpRequestService } from 'src/app/providers/http/generic.service';

@Injectable({
  providedIn: SharedModule
})
export class ApplicationProductsSourceContext extends PaginationContext<any> {

  public pageSize = 10;

  constructor(public productsService: ProductsService) {
    super();
  }

  service(): GenericHttpRequestService {
    return this.productsService;
  }

  pageChangeSubscription(pageNumber: number, queryData: any): void {
    this.search(pageNumber, queryData);
  }

  private search(pageNumber: number, queryData: any): void {
    this.productsService.queryAplicativosNormalizados(pageNumber, this.pageSize, queryData).subscribe((data: PageResponse<any>) => {
      this.subject$.next(data);
    });
  }

}
