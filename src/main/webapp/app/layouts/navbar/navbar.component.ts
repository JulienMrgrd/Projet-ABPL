import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { VERSION } from 'app/app.constants';
import { Principal, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from '../profiles/profile.service';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.css']
})
export class NavbarComponent implements OnInit {
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;

  constructor(
    private loginService: LoginService,
    private principal: Principal,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    private config: NgbPopoverConfig
  ) {
    this.version = VERSION ? 'v' + VERSION : '';
    this.isNavbarCollapsed = true;

    // customize default values of popovers used by this component tree
    this.config.placement = 'left-bottom';
    this.config.triggers = 'hover';
  }

  ngOnInit() {
    // FIXME re-disabled feature
    this.profileService.getProfileInfo().then(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  logout() {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl() {
    return this.isAuthenticated() ? this.principal.getImageUrl() : null;
  }
}
