import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCheckboxModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatIconModule,
  MatBadgeModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports: [
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatBadgeModule
  ]
})
export class MaterialModule { }
