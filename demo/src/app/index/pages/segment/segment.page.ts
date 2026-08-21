import { Component, ElementRef, inject, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  Gesture,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonToolbar,
  ViewDidEnter,
  ViewDidLeave,
} from '@demo/ionic';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    FormsModule,
    IonBackButton,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonText,
    IonSegment,
    IonSegmentButton,
    IonButtons,
    IonButton,
  ],
})
export class SegmentPage {}
