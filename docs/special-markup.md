---
title: Special markup
---

# Special markup

Most Ionic markup works without changes. The combination below is an explicit opt-in demonstrated in `demo/src/app/docs` and is useful when the same template also uses `@rdlabo/ionic-theme-ios26`.

## Two-line inset list items

Place an unslotted `ion-label` immediately alongside an unslotted `ion-note` to render a two-line item. Use `slot="end"` on `ion-note` when you want the standard trailing-note layout instead.

```html
<ion-list inset="true">
  <ion-item>
    <ion-label>Network &amp; internet</ion-label>
    <ion-note>Mobile, Wi-Fi, hotspot</ion-note>
  </ion-item>
</ion-list>
```

If the application imports `@rdlabo/ionic-theme-ios26/dist/css/md-ion-list-inset.css`, wrap list items in `ion-item-group` and keep `ion-list-header` outside the group:

```html
<ion-list inset="true">
  <ion-list-header><ion-label>Connections</ion-label></ion-list-header>
  <ion-item-group>
    <ion-item>
      <ion-label>Network &amp; internet</ion-label>
      <ion-note>Mobile, Wi-Fi, hotspot</ion-note>
    </ion-item>
  </ion-item-group>
</ion-list>
```

See [Using `ion-item-group`](./using-ion-item-group.md) for the required import and background model.
