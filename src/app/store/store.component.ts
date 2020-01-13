import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { StoreItem } from './storeitem.component';

@Component({
	selector: 'app-store',
	templateUrl: './store.component.html',
	styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
	public payPalConfig?: IPayPalConfig;
	storeItems: StoreItem[] = [
		new StoreItem('1 100', 'frisbee coins', '../../assets/store/coins.png', '$3.49 USD'),
		new StoreItem('1 900', 'frisbee coins', '../../assets/store/coins.png', '$6.49 USD'),
		new StoreItem('4 900', 'frisbee coins', '../../assets/store/coins.png', '$15.99 USD'),
		new StoreItem('7 300', 'frisbee coins', '../../assets/store/coins.png', '$22.99 USD'),
		new StoreItem('14 700', 'frisbee coins', '../../assets/store/coins.png', '$43.99 USD'),
		new StoreItem('35 000', 'frisbee coins', '../../assets/store/coins.png', '$91.99 USD')
	];

	selected?: StoreItem;

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

	public select(item: StoreItem) {
		this.selected = item;
	}
}
