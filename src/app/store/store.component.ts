import { Component, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IPayPalConfig } from 'ngx-paypal';
import { StoreItem } from './storeitem';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { StoreService } from './store.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: 'app-store',
	templateUrl: './store.component.html',
	styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

	private static errorMap: Record<string, string> = {
		'paypal_unreachable': 'Error code #1 Communication with paypal is not possible. Please refresh the page and try again or retry later.',
		'invalid_token': 'Error code #2 You are no longer properly logged in. Please logout and login again.',
		'invalid_offer': 'Error code #3 There is currently an issue with the store. Please try again later.',
		'order_not_completed': 'Error code #4 The order is not yet complete or the payment hasn\'t been received. Please contact us so we can help you fix this problem.',
		'order_cancelled': 'Error code #5 The order has been cancelled. No fund should have been deducted from your account. If this is not the case please contact us as soon as possible.',
		'order_already_processed': 'Error code #6 The order has already been processed. This is not normal, please contact us.',
		'order_doesnt_exists': 'Error code #7 The order couldn\'t be processed because it doesn\'t exist on our servers. Please contact us to signal this anormality.',
		'order_already_cancelled': 'Error code #8 The order was already cancelled when trying to cancel it. This is not normal please contact us.'
	};

	private static unknownError = 'Error code #0 an unexpected error occurred with our servers.';

	public payPalConfig?: IPayPalConfig;
	storeItems: StoreItem[] = [
		new StoreItem(0, 700, 'frisbee coins', '../../assets/store/coins.png', '3.49'),
		new StoreItem(1, 1350, 'frisbee coins', '../../assets/store/coins.png', '6.49'),
		new StoreItem(2, 3200, 'frisbee coins', '../../assets/store/coins.png', '14.99'),
		new StoreItem(3, 5400, 'frisbee coins', '../../assets/store/coins.png', '24.99'),
		new StoreItem(4, 10000, 'frisbee coins', '../../assets/store/coins.png', '39.99'),
		new StoreItem(5, 25000, 'frisbee coins', '../../assets/store/coins.png', '99.99')
	];

	selected?: StoreItem;
	error?: string;

	@ViewChild('errorDialog', {static: false}) errorDialog: TemplateRef<any>;

	constructor(private ngZone: NgZone,
				private title: Title,
				private userService: UserService,
				private storeService: StoreService,
				private router: Router,
				private dialog: MatDialog) {}

	ngOnInit() {
		this.title.setTitle('Jumpaï - Buy coins for cosmetics');

		this.payPalConfig = {
			currency: 'USD',
			clientId: 'AX91wn4oiEHoD-g0bL2yFguc1WC4PMcffleEPMOTEoyln_G5f0C99doFsSFIPoIzh2KDrwYT0P7KPBGN',
			createOrderOnServer: data => this.createOrder(data),
			advanced: {
				commit: 'true'
			},
			style: {
				label: 'paypal',
				layout: 'vertical'
			},
			onApprove: (data, actions) => {},
			onClientAuthorization: (data) => {
				this.storeService.processOrder(this.userService.getToken(), data.id)
					.then(() => {
						this.ngZone.run(() => this.router.navigateByUrl('/thankyou'));
					})
					.catch(errorResponse => {
						this.handle(errorResponse);
						return Promise.reject(errorResponse);
					});
			},
			onCancel: (data, actions) => {
				this.storeService.cancelOrder(this.userService.getToken(), data.orderID)
					.then(() => {
						console.log('Order cancelled');
					})
					.catch(errorResponse => {
						this.handle(errorResponse);
						return Promise.reject(errorResponse);
					});
			},
			onError: err => {},
			onClick: (data, actions) => {},
		};
	}

	private createOrder(data): Promise<string> {
		return this.storeService.createOrder(this.selected, this.userService.getToken())
			.catch(errorResponse => {
				this.handle(errorResponse);
				return Promise.reject(errorResponse);
			});
	}

	private handle(errorResponse: HttpErrorResponse): void {
		if (errorResponse.status === 400) {
			this.error = StoreComponent.errorMap[errorResponse.error.error];
		} else {
			this.error = StoreComponent.unknownError;
		}
		this.dialog.open(this.errorDialog);
	}

	public select(item: StoreItem) {
		this.selected = item;
	}
}
