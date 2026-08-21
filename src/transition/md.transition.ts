import type { Animation } from '@ionic/core';
import { createAnimation } from '@ionic/core';
import type { TransitionOptions } from './index';
import { getIonPageElement } from './index';

export const mdTransitionAnimation = (_: HTMLElement, opts: TransitionOptions): Animation => {
  const OFF_RIGHT = 40;
  const CENTER = 0;

  const backDirection = opts.direction === 'back';
  const enteringEl = opts.enteringEl;
  const leavingEl = opts.leavingEl;

  const ionPageElement = getIonPageElement(enteringEl);
  const enteringToolbarEle = ionPageElement.querySelector('ion-toolbar');
  const rootTransition = createAnimation();

  rootTransition.addElement(ionPageElement).fill('both').beforeRemoveClass('ion-page-invisible');

  // animate the component itself
  if (backDirection) {
    rootTransition
      .duration((opts.duration ?? 0) || 200)
      .easing('cubic-bezier(0.47,0,0.745,0.715)')
      .fromTo('transform', `translateX(${OFF_RIGHT * -1}px)`, `translateX(${CENTER}px)`);
  } else {
    rootTransition
      .duration((opts.duration ?? 0) || 280)
      .easing('cubic-bezier(0.36,0.66,0.04,1)')
      .fromTo('transform', `translateX(${OFF_RIGHT}px)`, `translateX(${CENTER}px)`)
      .fromTo('opacity', 0.01, 1);
  }

  // Animate toolbar if it's there
  if (enteringToolbarEle) {
    const enteringToolBar = createAnimation();
    enteringToolBar.addElement(enteringToolbarEle);
    rootTransition.addAnimation(enteringToolBar);
  }

  if (leavingEl && !backDirection) {
    const stackedTransition = createAnimation();
    const stackedElement = getIonPageElement(leavingEl);
    const stackedAnimationElement = stackedElement.querySelectorAll('ion-toolbar, ion-content > *');
    stackedTransition.addElement(stackedAnimationElement);
    stackedTransition
      .duration((opts.duration ?? 0) || 280)
      .easing('cubic-bezier(0.36,0.66,0.04,1)')
      .fromTo('transform', `translateX(${CENTER}px)`, `translateX(${OFF_RIGHT * -1}px)`);
    rootTransition.addAnimation(stackedTransition);
  }

  // setup leaving view
  if (leavingEl && backDirection) {
    // leaving content
    rootTransition.duration((opts.duration ?? 0) || 200).easing('cubic-bezier(0.47,0,0.745,0.715)');

    const leavingPage = createAnimation();
    leavingPage
      .addElement(getIonPageElement(leavingEl))
      .onFinish((currentStep) => {
        if (currentStep === 1 && leavingPage.elements.length > 0) {
          leavingPage.elements[0].style.setProperty('display', 'none');
        }
      })
      .fromTo('transform', `translateX(${CENTER}px)`, `translateX(${OFF_RIGHT}px)`)
      .fromTo('opacity', 1, 0);

    rootTransition.addAnimation(leavingPage);
  }

  return rootTransition;
};
