import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import {
  MatExpansionModule,
  MatChipsModule,
  MatButtonModule,
  MatTableModule,
  MatCheckboxModule,
  MatIconModule,
  MatMenuModule,
  MatGridListModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatBadgeModule,
  MAT_DATE_LOCALE

} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatChipsModule,
    MatExpansionModule,
    MatTabsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatBadgeModule

  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatChipsModule,
    MatExpansionModule,
    MatTabsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatBadgeModule

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
})

export class MaterialModule { }
