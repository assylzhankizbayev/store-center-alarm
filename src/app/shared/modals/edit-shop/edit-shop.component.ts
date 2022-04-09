import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IShop } from '../../../models/building.model';
import { BuildingService } from '../../../services/building.service';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.scss'],
})
export class EditShopComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  form = this.fb.group({
    electricityUsage: [null],
    number: [null],
    owner: [null],
    square: [null],
  });

  constructor(
    private fb: FormBuilder,
    private buildingService: BuildingService,
    private dialogRef: MatDialogRef<EditShopComponent>,
    @Inject(MAT_DIALOG_DATA) public shopNumber: string
  ) {}

  ngOnInit(): void {
    this.buildingService
      .getShopByNumber(this.shopNumber)
      .pipe(
        tap((res) => {
          if (res?.success) {
            this.form.patchValue(res.result);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  close(data?: IShop): void {
    this.dialogRef.close(data);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
