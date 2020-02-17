import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { StoreItem } from './storeitem';
import { UserService } from '../user/user.service';
import {Router} from "@angular/router";
import {StoreService} from "./store.service";

@Component({
	selector: 'app-store',
	templateUrl: './store.component.html',
	styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
	public payPalConfig?: IPayPalConfig;
	storeItems: StoreItem[] = [
		new StoreItem('700', 'frisbee coins', '../../assets/store/coins.png', '3.49'),
		new StoreItem('1 350', 'frisbee coins', '../../assets/store/coins.png', '6.49'),
		new StoreItem('3 200', 'frisbee coins', '../../assets/store/coins.png', '14.99'),
		new StoreItem('5 400', 'frisbee coins', '../../assets/store/coins.png', '24.99'),
		new StoreItem('10 000', 'frisbee coins', '../../assets/store/coins.png', '39.99'),
		new StoreItem('25 000', 'frisbee coins', '../../assets/store/coins.png', '99.99')
	];

	selected?: StoreItem;

	constructor(private title: Title,
				private userService: UserService,
				private storeService: StoreService,
				private router: Router) {}

	ngOnInit() {
		this.title.setTitle('Jumpaï - Buy coins for cosmetics');

		this.payPalConfig = {
			currency: 'USD',
			clientId: 'AX91wn4oiEHoD-g0bL2yFguc1WC4PMcffleEPMOTEoyln_G5f0C99doFsSFIPoIzh2KDrwYT0P7KPBGN',
			createOrderOnClient: data => this.createOrder(data),
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
				this.storeService.validatePurchase(this.userService.getToken(), data.id).then(success => {
					if(success)
						this.router.navigateByUrl('/thankyou');
					else
						console.log("FAILED");
				});
			},
			onCancel: (data, actions) => {},
			onError: err => {},
			onClick: (data, actions) => {},
		};
	}

	private createOrder(data): ICreateOrderRequest {
		return {
			intent: 'CAPTURE',
			purchase_units: [
				{
					amount: {
						currency_code: 'USD',
						value: this.selected.price,
						breakdown: {
							item_total: {
								currency_code: 'USD',
								value: this.selected.price
							}
						}
					},
					items: [
						{
							name: this.selected.getName(),
							quantity: '1',
							category: 'DIGITAL_GOODS',
							unit_amount: {
								currency_code: 'USD',
								value: this.selected.price,
							},
						}
					]
				}
			]
		};
	}

	public select(item: StoreItem) {
		this.selected = item;
	}
}
