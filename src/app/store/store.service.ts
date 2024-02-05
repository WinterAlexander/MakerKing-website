import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { StoreItem } from './storeitem'

@Injectable()
export class StoreService {
	constructor(private http: HttpClient) {}

	public createOrder(item: StoreItem, token: string): Promise<string> {
		let params = new HttpParams()
		params = params.append('token', token)
		params = params.append('offerId', item.offerId.toString())

		return this.http.post(environment.server + '/paypal/order/create', params)
			.toPromise()
			.then((response: any) => {
				return response.orderId
			})
	}

	public processOrder(token: string, orderId: string): Promise<void> {

		let params = new HttpParams()
		params = params.append('token', token)
		params = params.append('orderId', orderId)

		return this.http.post(environment.server + '/paypal/order/process', params)
			.toPromise()
			.then((response: any) => {
				return Promise.resolve()
			})
	}

	public cancelOrder(token: string, orderId: string): Promise<void> {

		let params = new HttpParams()
		params = params.append('token', token)
		params = params.append('orderId', orderId)

		return this.http.post(environment.server + '/paypal/order/cancel', params)
			.toPromise()
			.then((response: any) => {
				return Promise.resolve()
			})
	}

	public fetchOffers(currency: string) : Promise<StoreItem[]> {
		let params = new HttpParams()
		params = params.append('currency', currency)

		return this.http.post(environment.server + '/paypal/offers', params)
			.toPromise()
			.then((response: any) => {
				let result = []
				let index = 0
				response.offers.forEach((offer) => {
					result.push(new StoreItem(offer.id,
							offer.frisbeeCoins,
							'frisbee coins',
							'../../assets/store/coins' + index.toString() + '.png',
							(offer.centPrice / 100.0).toString()))
					index++
				})

				return Promise.resolve(result)
			})
	}
}
