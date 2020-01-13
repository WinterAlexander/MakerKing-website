import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';

@Component({
	selector: 'app-store',
	templateUrl: './store.component.html',
	styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
	public payPalConfig?: IPayPalConfig;

	constructor(private title: Title) {}

	ngOnInit() {
		this.title.setTitle('Jumpaï - Buy coins for cosmetics');

		this.payPalConfig = {
			currency: 'USD',
			clientId: 'sb',
			createOrderOnClient: (data) => <ICreateOrderRequest>{
				intent: 'CAPTURE',
				purchase_units: [
					{
						amount: {
							currency_code: 'USD',
							value: '9.99',
							breakdown: {
								item_total: {
									currency_code: 'USD',
									value: '9.99'
								}
							}
						},
						items: [
							{
								name: 'Enterprise Subscription',
								quantity: '1',
								category: 'DIGITAL_GOODS',
								unit_amount: {
									currency_code: 'USD',
									value: '9.99',
								},
							}
						]
					}
				]
			},
			advanced: {
				commit: 'true'
			},
			style: {
				label: 'paypal',
				layout: 'vertical'
			},
			onApprove: (data, actions) => {
				console.log('onApprove - transaction was approved, but not authorized', data, actions);
				actions.order.get().then(details => {
					console.log('onApprove - you can get full order details inside onApprove: ', details);
				});
			},
			onClientAuthorization: (data) => {
				console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
			},
			onCancel: (data, actions) => {
				console.log('OnCancel', data, actions);
			},
			onError: err => {
				console.log('OnError', err);
			},
			onClick: (data, actions) => {
				console.log('onClick', data, actions);
			},
		};
	}
}
