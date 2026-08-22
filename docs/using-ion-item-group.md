---
title: Using ion-item-group
---

# Using `ion-item-group` in inset lists

The MD3 theme uses the same inset-list structure as `@rdlabo/ionic-theme-ios26`, allowing one template to work across Ionic modes. When an `ion-list` uses `inset="true"`, wrap its items in `ion-item-group` and keep `ion-list-header` outside the group.

The examples use framework-neutral Web Component markup. In React or Vue, use the equivalent component and property syntax.

```html
<ion-list inset="true">
  <ion-list-header><ion-label>Connections</ion-label></ion-list-header>
  <ion-item-group>
    <ion-item>...</ion-item>
    <ion-item>...</ion-item>
  </ion-item-group>
</ion-list>
```

No wrapper is required for lists that do not use `inset="true"`.

## Checking Angular templates

In Ionic Angular applications, the [`@rdlabo/rules/require-ion-item-group`](https://docs.rdlabo.dev/projects/eslint-plugin-rules/docs/rules/require-ion-item-group) ESLint rule checks that each `ion-item` in an `ion-list` is wrapped by the group component that matches its behavior. The rule is included in the recommended preset and can automatically fix some violations.

## Why the wrapper is required

The shared structure keeps `ion-list-header` separate from the item surface. This matches the iOS 26 layout while allowing MD3 to style the same markup without platform-specific templates.

The theme therefore:

- makes the inset `ion-list` background transparent;
- applies the item surface to `ion-item-group`; and
- leaves `ion-list-header` outside that surface.

For two-line items and section-header groups, see [Special markup](./special-markup.md).
