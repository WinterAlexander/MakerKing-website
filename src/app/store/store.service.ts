import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'
import { environment } from '../../environments/environment'
import { StoreItem } from './storeitem'

@Injectable({ providedIn: 'root' })
export class StoreService {
	constructor(private http: HttpClient) {}

	public createOrder(item: StoreItem, token: string): Promise<string> {
		let params = new HttpParams()
		params = params.append('token', token)
		params = params.append('offerId', item.offerId.toString())

		return lastValueFrom(this.http.post(environment.server + '/paypal/order/create', params))
			.then((response: any) => {
				return response.orderId
			})
	}

	public processOrder(token: string, orderId: string): Promise<void> {

		let params = new HttpParams()
		params = params.append('token', token)
		params = params.append('orderId', orderId)

		return lastValueFrom(this.http.post(environment.server + '/paypal/order/process', params))
			.then((response: any) => {
				return Promise.resolve()
			})
	}

	public cancelOrder(token: string, orderId: string): Promise<void> {

		let params = new HttpParams()
		params = params.append('token', token)
		params = params.append('orderId', orderId)

		return lastValueFrom(this.http.post(environment.server + '/paypal/order/cancel', params))
			.then((response: any) => {
				return Promise.resolve()
			})
	}

	public fetchOffers(currency: string) : Promise<StoreItem[]> {
		let params = new HttpParams()
		params = params.append('currency', currency)

		return lastValueFrom(this.http.post(environment.server + '/paypal/offers', params))
			.then((response: any) => {
				const result = []
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
