---
title: Migration
---

# Migration

Review every section newer than the version currently installed, in ascending order. For example, when upgrading from 1.x to 9.0.0, complete the 2.0.0 migration steps before reviewing 9.0.0.

Each section lists only the changes that require application code or configuration updates.

## Migrating to 9.0.0

Version 9 aligns the theme's major version with Ionic Framework 9. It does not introduce additional breaking changes beyond those documented in the earlier migration sections.

Both Ionic 8 and Ionic 9 remain supported. Version 9 requires `@ionic/core >=8.8.0 <10`.

## Migrating to 2.0.0

### Rename `.header-item-group` to `.item-group-header`

The class for an `ion-item-group` used as a section header has been renamed for consistency with the element it modifies. Replace every occurrence of `.header-item-group` in application templates and styles.

```diff
- <ion-item-group class="header-item-group">
+ <ion-item-group class="item-group-header">
    ...
  </ion-item-group>
```

The old class is no longer styled by the theme. This rename applies to markup shared with `@rdlabo/ionic-theme-ios26` as well.
