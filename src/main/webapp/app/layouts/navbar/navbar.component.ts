import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalService, LoginService, Principal } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { Category } from 'app/quiz/shared/categories-info/categories-info.model';
import { QuizService } from 'app/quiz/shared/services/quiz.service';
import { noop } from 'rxjs';
import { FileObject } from 'app/shared/models/file-object.model';
import { Data } from 'app/shared/models/data.model';

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

  subMenus: Map<Category, FileObject[]>;

  constructor(
    private loginService: LoginService,
    private principal: Principal,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    private config: NgbPopoverConfig,
    private quizService: QuizService,
    private sharedData: Data
  ) {
    // this.version = VERSION ? 'v' + VERSION : '';
    this.isNavbarCollapsed = true;

    // customize default values of popovers used by this component tree
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }

  async ngOnInit() {
    this.profileService
      .getProfileInfo()
      .then(profileInfo => {
        this.inProduction = profileInfo.inProduction;
        this.swaggerEnabled = profileInfo.swaggerEnabled;
      })
      .catch(noop);

    // load quizes categories
    this.subMenus = await this.quizService.getCategoriesNameWithQuizes();
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

  getSubMenusCat() {
    if (this.subMenus) {
      return Array.from(this.subMenus.keys());
    }
  }

  getSubMenusQuizes(key: Category): FileObject[] {
    if (key && this.subMenus.has(key)) {
      return this.subMenus.get(key);
    }
  }

  goToQuiz(category: Category): void {
    const quiz: FileObject = this.getSubMenusQuizes(category)[0];
    this.sharedData.choosenQuiz = quiz;

    this.router.navigate(['quiz/training/', category.folder]);
  }
}
