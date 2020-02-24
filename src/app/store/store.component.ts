import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IPayPalConfig } from 'ngx-paypal';
import { StoreItem } from './storeitem';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { StoreService } from './store.service';
import { ViewChild, TemplateRef } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
	selector: 'app-store',
	templateUrl: './store.component.html',
	styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
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

	@ViewChild('errorDialog', {static: false}) errorDialog: TemplateRef<any>;

	constructor(private title: Title,
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
						this.router.navigateByUrl('/thankyou');
					}).catch(errorResponse => {
						console.log('Process FAILED, error:');
						console.log(errorResponse);
					});
			},
			onCancel: (data, actions) => {
				this.storeService.cancelOrder(this.userService.getToken(), data.orderID)
					.then(() => {
						console.log('Cancel successful');
					}).catch(errorResponse => {
						console.log('Cancel failed');
					});
			},
			onError: err => {},
			onClick: (data, actions) => {},
		};
	}

	private createOrder(data): Promise<string> {
		return this.storeService.createOrder(this.selected, this.userService.getToken())
			.catch(errorResponse => {
				const dialogConfig = new MatDialogConfig();

				dialogConfig.data = {
					title: errorResponse.error.error,
					content: errorResponse.error.error
				};

				const dialogRef = this.dialog.open(this.errorDialog, dialogConfig);
				console.log('Spawned dialog');

				return new Promise((resolve, reject) =>
					dialogRef.afterClosed().subscribe(result => {
						if(result == 'retry')
							resolve(this.createOrder(data));
						reject('Cancelled');
					}, (err) => {
						reject(err)
					}));
			});
	}

	public select(item: StoreItem) {
		this.selected = item;
	}
}
