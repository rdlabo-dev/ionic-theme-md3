export const actionSheetUtil = () => ({
  header: 'Actions',
  subHeader: 'Action Sheet',
  buttons: [
    {
      text: 'Delete',
      role: 'destructive',
      icon: 'trash-outline',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Confirm',
      role: 'preferred',
      icon: 'checkmark-outline',
      data: {
        action: 'confirm',
      },
    },
    {
      text: 'Share',
      icon: 'share-outline',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ],
});
