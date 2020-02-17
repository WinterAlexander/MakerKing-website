import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class StoreService {
    constructor(private http: HttpClient) {}

    public validatePurchase(token: string, orderId: string): Promise<boolean> {

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
