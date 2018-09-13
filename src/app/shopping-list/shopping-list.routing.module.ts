import { AuthGuard } from './../auth/auth-guard.service';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const shoppingRoutes: Routes = [
    {path: '', component: ShoppingListComponent, canActivate: [AuthGuard]},
  {path: 'users', component: ShoppingEditComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(shoppingRoutes)
    ],
    exports: [RouterModule],

} )
export class ShoppingListRoutingModule {}

