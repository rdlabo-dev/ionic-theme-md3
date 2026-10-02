import { Component, DestroyRef, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonMenu,
  IonProgressBar,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonThumbnail,
  IonToolbar,
  ViewDidEnter,
  ViewDidLeave,
} from '@demo/ionic';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { enableTabAccessory, type TabAccessoryHandle } from '../../../../src';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonItemGroup,
    IonItem,
    IonToolbar,
    IonThumbnail,
    IonButton,
    IonButtons,
    IonProgressBar,
  ],
})
export class TabsPage implements OnInit, OnDestroy, ViewDidEnter, ViewDidLeave {
  readonly #router = inject(Router);
  readonly #el = inject(ElementRef);
  readonly #destroyRef = inject(DestroyRef);
  #accessory?: TabAccessoryHandle;
  playing = true;
  showAccessory = false;
  accessoryActivated = false;

  ngOnInit() {
    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((params) => {
        const tabBar = this.#el.nativeElement.querySelector('ion-tab-bar');
        if (!tabBar) {
          return;
        }
        const path = params.urlAfterRedirects.split(/[?#]/, 1)[0];
        const hideTabs = ['/main/settings'].includes(path);
        if (hideTabs) {
          tabBar.classList.add('tab-bar-hidden');
        } else {
          tabBar.classList.remove('tab-bar-hidden');
        }
        this.showAccessory = !hideTabs && (path === '/main/album' || /[?&]miniPlayer(?:=|$|&)/.test(params.urlAfterRedirects));
      });
  }

  ngOnDestroy() {
    this.ionViewDidLeave();
  }

  togglePlay(event: Event) {
    event.stopPropagation();
    this.playing = !this.playing;
  }

  onAccessoryActivate() {
    this.accessoryActivated = true;
  }

  ionViewDidEnter() {
    this.#accessory = enableTabAccessory();
  }

  ionViewDidLeave() {
    this.#accessory?.destroy();
    this.#accessory = undefined;
  }
}
