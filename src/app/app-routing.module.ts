import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HomeComponent } from './core/home/home.component';
import { NgModule} from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';


// this is use to reachout to a components
// to load as if another page

// a short form of visiting already declared route
// { path: '', redirectTo: '/recipes', pathMatch: 'full' },

// example of lazyloading
// { path: 'recipe', loadChildren: './recipes/recipe.module#RecipeModule'},


// eager loading example
// {path: 'shopping-list', component: ShoppingComponent},

const appRoutes: Routes = [
{ path: '', component: HomeComponent},
{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipeModule'},
{ path: 'shopping-list', loadChildren: './shopping-list/shopping.module#ShoppingModule'},
{path: 'not-found-page', component: NotFoundPageComponent, data: {message: 'Page not found' }},
{path: '**', redirectTo: '/not-found-page'},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [ RouterModule ]

})

export class AppRoutingModule { }

// default preloading strategy is dont preload
// below will preload all lazy loaded modules
// {preloadingStrategy: PreloadAllModules}
//  after the has been loaded
