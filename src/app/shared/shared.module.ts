import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
declarations: [
    DropdownDirective
],
exports: [
    CommonModule,
    DropdownDirective
],
})

export class SharedModule {

}

// placing dropdownDirective in a shared module make it accessible to other parts
// of the application since we can only reference apipes,declarative or component
// in one module then import it to any module where its needed
// for pipes,declarative or component have to be declared
// in the declarations column of the @Ng Module

