import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  Platform,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
} from '@demo/ionic';

@Component({
  selector: 'app-docs-page',
  templateUrl: './docs-page.component.html',
  styleUrls: ['./docs-page.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonIcon,
    IonButton,
    IonButtons,
    IonItemGroup,
    IonList,
    IonListHeader,
    IonLabel,
    IonNote,
    IonItem,
  ],
})
export class DocsPage {
  readonly platform = inject(Platform);
}
