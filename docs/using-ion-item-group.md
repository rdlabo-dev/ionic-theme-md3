---
title: Using ion-item-group
---

# Using `ion-item-group` with the MD3 theme

The MD3 theme supports the same inset-list markup as `@rdlabo/ionic-theme-ios26`, so an application can share one template across Ionic modes. Add `ion-item-group` when you opt in to that shared pattern.

## When is `ion-item-group` required?

It is only required when both of the following conditions are met:

- You have enabled the `inset` property on `ion-list`
- You import the iOS 26 package's optional `md-ion-list-inset.css` stylesheet

When these conditions apply, wrap the list items—but not the list header—with `ion-item-group`.

## Implementation Example

```diff
  <ion-list inset=true>
    <ion-list-header><ion-label>Label</ion-label></ion-list-header>
+   <ion-item-group>
      <ion-item>...</ion-item>
      <ion-item>...</ion-item>
+   </ion-item-group>
  </ion-list>
```

## Why is this change necessary?

### Background: Challenges in iOS Design Reproduction

By default in Ionic Framework, `ion-list` has a background color, and `ion-list-header` is treated as part of the list. However, with this structure, it's impossible to accurately reproduce **iOS's native design patterns**.

![Inset list background comparison](https://raw.githubusercontent.com/rdlabo-dev/ionic-theme-ios26/v2.3.2/screenshots/why-ion-list-inset.png)

### Solution: Background Color Separation

To faithfully reproduce iOS design, this theme makes the following changes:

- Set `ion-list` background color to transparent
- Delegate background color to `ion-item-group`

This change allows `ion-list-header` to be treated as an independent element, achieving the native iOS appearance.

## Using the Same Design with Material Design

If you want to use the same design pattern with Material Design theme, import the following CSS:

```css
@import '@rdlabo/ionic-theme-ios26/dist/css/md-ion-list-inset.css';
```

This will apply the same `ion-item-group` pattern to the Material Design theme as well.

## Summary

- **Most cases**: You can use your existing Ionic code as-is
- **Specific conditions only**: `ion-item-group` is required when using the optional shared inset-list stylesheet
- **Purpose**: To accurately reproduce iOS 26's native design patterns
