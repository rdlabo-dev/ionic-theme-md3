---
title: Special markup
---

# Special markup

Most Ionic markup works without changes. The combinations below are explicit opt-ins and are useful when the same template also uses `@rdlabo/ionic-theme-ios26`.

## Two-line inset list items

Place an unslotted `ion-label` immediately alongside an unslotted `ion-note` to render a two-line item. Use `slot="end"` on `ion-note` when you want the standard trailing-note layout instead.

```html preview
<ion-list inset="true">
  <ion-item-group>
    <ion-item>
      <ion-label>Network &amp; internet</ion-label>
      <ion-note>Mobile, Wi-Fi, hotspot</ion-note>
    </ion-item>
  </ion-item-group>
</ion-list>
```

## Square buttons

Add `.button-square` when a button should use more squared corners. It works with text buttons and icon-only buttons.

```html preview
<ion-button class="button-square" fill="solid">Continue</ion-button>
<ion-button class="button-square" fill="solid">
  <ion-icon name="add" slot="icon-only"></ion-icon>
</ion-button>
```

## Inset-list section headers

Add `.item-group-header` to an `ion-item-group` to create the centered icon, title, and description used at the top of the component demo pages.

This is an introductory group. Place regular list items in a separate `ion-item-group` that follows it.

```html preview
<ion-list inset="true">
  <ion-item-group class="item-group-header">
    <ion-item>
      <ion-label>
        <ion-icon name="list" style="background: var(--ion-color-primary)"></ion-icon>
        <h2>Lists</h2>
        <ion-text>Inset-list examples</ion-text>
      </ion-label>
    </ion-item>
  </ion-item-group>
  <ion-item-group>
    <ion-item><ion-label>First item</ion-label></ion-item>
  </ion-item-group>
</ion-list>
```

## Tab accessory mini-player

Add `.tab-accessory` to an `ion-toolbar` above `ion-tab-bar` (not inside `ion-content`). This theme styles the Material capsule. The same markup works with `@rdlabo/ionic-theme-ios27` (`ios-theme-tab-accessory` is kept as an alias). `.md3-disabled` opts an individual toolbar out. Call `enableTabAccessory()` once from this package for swipe-up; do not also call the ios27 copy.

```html preview
<ion-toolbar class="tab-accessory">
  <ion-thumbnail slot="start">
    <img data-tab-accessory="artwork" src="cover.jpg" alt="" />
  </ion-thumbnail>
  <ion-label>
    <h2 data-tab-accessory="title">Now Playing</h2>
    <p data-tab-accessory="subtitle">Artist</p>
  </ion-label>
  <ion-button slot="end" data-tab-accessory="play" fill="clear">
    <ion-icon slot="icon-only" name="pause"></ion-icon>
  </ion-button>
  <ion-progress-bar value="0.4"></ion-progress-bar>
</ion-toolbar>
```

Override layout with `--md3-tab-accessory-height`, `--md3-tab-accessory-inset`, `--md3-tab-accessory-radius`, and `--md3-tab-accessory-bottom`. Hosts that swipe the bar can wrap it in `.accessory-slide-clip`.

## Opting out

Add `.md3-disabled` to an individual Ionic component when it must retain Ionic's standard Material styling.

```html preview
<ion-button fill="solid">MD3 theme</ion-button> <ion-button class="md3-disabled" fill="solid">Standard Ionic</ion-button>
```
