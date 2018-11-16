import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Principal, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from '../profiles/profile.service';
import { Category } from 'app/quiz/shared/categories-info/categories-info.model';
import { QuizService } from 'app/quiz/shared/services/quiz.service';

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

  quizCategories: Category[];

  constructor(
    private loginService: LoginService,
    private principal: Principal,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    private config: NgbPopoverConfig,
    private quizService: QuizService
  ) {
    // this.version = VERSION ? 'v' + VERSION : '';
    this.isNavbarCollapsed = true;

    // customize default values of popovers used by this component tree
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }

  async ngOnInit() {
    this.profileService.getProfileInfo().then(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });

    // load quizes categories
    this.quizCategories = (await this.quizService.getCategories()).categories;
    this.quizService.getCategoriesNameWithQuizes().then(value => {
      debugger;
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
