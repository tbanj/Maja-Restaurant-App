import { FooterComponent } from './footer/footer.component';
import { DataStorageService } from './../shared/data-storage.service';
import { AuthService } from './../auth/auth.service';
import { AuthGuard } from './../auth/auth-guard.service';
import { RecipesService } from './../services/recipes.service';
import { ShoppingListService } from './../services/shopping-list.service';
import { HomeComponent } from './../core/home/home.component';
import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './../core/header/header.component';
import { NgModule } from '@angular/core';
import { LoginModelComponent } from './header/login-model/login-model.component';
import { FormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        FooterComponent,
        LoginModelComponent
    ],
    imports: [
        SharedModule,
        FormsModule,

        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        FooterComponent,
        HomeComponent
    ],
    providers: [ShoppingListService, RecipesService,
        DataStorageService, AuthGuard, AuthService]
})

export class CoreModule {}
