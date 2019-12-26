import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { NavComponent } from './components/nav/nav.component';
import { TreeComponent } from './components/tree/tree.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';


const routes: Routes = [

  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'home',
        component: DashboardComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/create',
        component: FormProductComponent
      },
      {
        path: 'products/edit/:id',
        component: ProductEditComponent
      },
      {
        path: 'create',
        component: ProductFormComponent
      },
      {
        path: 'tree',
        component: TreeComponent
      },
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'drag-drop',
        component: DragDropComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
