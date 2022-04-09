import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, switchMap, take } from 'rxjs/operators';
import { EditShopComponent } from '../../shared/modals/edit-shop/edit-shop.component';
import { IShop } from '../../models/building.model';
import { TimerAlarmType } from '../../models/alarm.model';
import { BuildingService } from '../../services/building.service';
import { AlarmService } from '../../services/alarm.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  styleUrls: ['./top-view.component.scss'],
})
export class TopViewComponent implements OnInit {
  TIMER_ALARM = TimerAlarmType;
  alarm$ = this.alarmService.alarm;
  apartments = this.buildingService.apartments;
  apartmentsInRow = this.buildingService.apartmentsInRow;
  rows = this.buildingService.rows;
  rowsCount = this.buildingService.rowsCount;
  floorNumber: number | null = null;

  row1$ = this.route.paramMap.pipe(
    mergeMap((params) => {
      const floorNumber = params.get('floorNumber');
      this.floorNumber = floorNumber ? +floorNumber : 1;

      return this.buildingService.shopList.pipe(
        map((shops) =>
          shops.filter((shop) => {
            if (this.floorNumber) {
              const shopNumber = +shop.number;
              const start =
                (this.floorNumber - 1) * this.apartmentsInRow * this.rowsCount +
                1;
              const end =
                (this.floorNumber - 1) * this.apartmentsInRow * this.rowsCount +
                this.apartmentsInRow;

              return shopNumber >= start && shopNumber <= end;
            }

            return false;
          })
        )
      );
    })
  );

  row2$ = this.route.paramMap.pipe(
    mergeMap((params) => {
      const floorNumber = params.get('floorNumber');
      this.floorNumber = floorNumber ? +floorNumber : 1;

      return this.buildingService.shopList.pipe(
        map((shops) =>
          shops.filter((shop) => {
            if (this.floorNumber) {
              const shopNumber = +shop.number;
              const start =
                (this.floorNumber - 1) * this.apartmentsInRow * this.rowsCount +
                this.apartmentsInRow +
                1;
              const end =
                (this.floorNumber - 1) * this.apartmentsInRow * this.rowsCount +
                2 * this.apartmentsInRow;

              return shopNumber >= start && shopNumber <= end;
            }

            return false;
          })
        )
      );
    })
  );

  getFloorRate$ = this.route.paramMap.pipe(
    mergeMap((params) => {
      const floorNumber = params.get('floorNumber');
      this.floorNumber = floorNumber ? +floorNumber : 1;

      return this.buildingService.shopList.pipe(
        map((shops) =>
          shops
            .filter((shop) => {
              if (this.floorNumber) {
                const shopNumber = +shop.number;
                const start =
                  (this.floorNumber - 1) *
                    this.apartmentsInRow *
                    this.rowsCount +
                  1;
                const end =
                  (this.floorNumber - 1) *
                    this.apartmentsInRow *
                    this.rowsCount +
                  2 * this.apartmentsInRow;

                return shopNumber >= start && shopNumber <= end;
              }

              return false;
            })
            .reduce((sum, shop) => sum + shop.electricityUsage, 0)
        )
      );
    })
  );

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private buildingService: BuildingService,
    private alarmService: AlarmService
  ) {}

  ngOnInit(): void {}

  reset() {
    this.alarmService.resetAlarm();
  }

  back() {
    this.router.navigate(['/home']);
  }

  editShop(shopNumber: string) {
    const dialogRef = this.dialog.open(EditShopComponent, { data: shopNumber });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        switchMap((shop: IShop) => {
          return shop?.number
            ? this.buildingService.updateShopByNumber(shop)
            : of(null);
        })
      )
      .subscribe();
  }
}
