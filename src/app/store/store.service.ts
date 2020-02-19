import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StoreItem } from './storeitem';

@Injectable()
export class StoreService {
	constructor(private http: HttpClient) {}

	public createOrder(item: StoreItem, token: string): Promise<string> {

		let params = new HttpParams();
		params = params.append('token', token);
		params = params.append('offerId', item.offerId.toString());
		params = params.append('quantity', item.quantity.toString());
		params = params.append('itemType', item.itemType);
		params = params.append('price', item.price);

		return this.http.post(environment.server + '/paypalcreateorder', params).toPromise()
			.then((response: any) => {
				return Promise.resolve(response.orderId);
			});
	}

	public processOrder(token: string, orderId: string): Promise<boolean> {

		let params = new HttpParams();
		params = params.append('token', token);
		params = params.append('orderId', orderId);

		return this.http.post(environment.server + '/paypalprocessorder', params).toPromise()
			.then((response: any) => {
				return Promise.resolve(true);
			}).catch((e: any) => {
				console.log(e);
				return Promise.resolve(false);
			});
	}
}
