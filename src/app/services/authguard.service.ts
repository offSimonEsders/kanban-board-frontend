import {Injectable} from '@angular/core';
import {BackendService} from "./backend.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private backendService: BackendService, private router: Router) {
  }

  async canActivate() {
    try {
      let resp = await this.backendService.checkToken();
      if(resp.status !== 200) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

}
