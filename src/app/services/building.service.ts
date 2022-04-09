import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  IShop,
  IShopByNumber,
  IShopList,
  ISuccess,
} from '../models/building.model';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  floorsCount = 3;
  rowsCount = 2;
  apartmentsInRow = 4;
  apartmentsSquare = 40;
  private shopList$ = new BehaviorSubject<IShop[]>([]);
  url = environment.host;

  constructor(private http: HttpClient) {}

  getShopList(): Observable<IShopList> {
    return this.http.get<IShopList>(this.url + '/shop').pipe(
      filter((res) => res?.success && res?.result?.length > 0),
      tap((res) => this.setShopList(res.result))
    );
  }

  getShopByNumber(shopNumber: string): Observable<IShopByNumber> {
    return this.http.get<IShopByNumber>(this.url + `/shop/${shopNumber}`);
  }

  updateShopByNumber(data: IShop): Observable<ISuccess> {
    return this.http
      .put<ISuccess>(this.url + `/shop`, data)
      .pipe(switchMap(() => this.getShopList()));
  }

  setShopList(data: IShop[]) {
    this.shopList$.next(data);
  }

  get shopList() {
    return this.shopList$.asObservable();
  }

  get floors() {
    return Array(this.floorsCount);
  }

  get apartments() {
    return Array(this.apartmentsInRow);
  }

  get rows() {
    return Array(this.rowsCount);
  }

  get totalApartments() {
    return Array(this.rowsCount * this.floorsCount * this.apartmentsInRow);
  }
}
