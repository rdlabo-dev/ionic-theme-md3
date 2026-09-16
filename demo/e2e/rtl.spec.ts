import { expect, test } from '@playwright/test';

for (const direction of ['ltr', 'rtl'] as const) {
  test(`${direction} mirrors range geometry`, async ({ page }) => {
    await page.goto('/main/index', { waitUntil: 'networkidle' });
    await page.evaluate((dir) => {
      const fixture = document.createElement('div');
      fixture.id = 'rtl-range-probe';
      fixture.dir = dir;

      const range = document.createElement('ion-range');
      range.id = 'single-range';
      range.mode = 'md';
      range.min = 0;
      range.max = 100;
      range.value = 50;

      const dual = document.createElement('ion-range');
      dual.id = 'dual-range';
      dual.mode = 'md';
      dual.dualKnobs = true;
      dual.min = 0;
      dual.max = 100;
      dual.value = { lower: 0, upper: 100 };

      fixture.append(range, dual);
      document.body.append(fixture);
    }, direction);

    await expect(page.locator('#single-range')).toHaveClass(/hydrated/);
    await expect(page.locator('#dual-range')).toHaveClass(/hydrated/);

    const normalOffset = await page.locator('#single-range').evaluate((range) => {
      const knob = range.shadowRoot!.querySelector<HTMLElement>('[part~="knob"]')!;
      return new DOMMatrixReadOnly(getComputedStyle(knob).transform).e;
    });
    expect(normalOffset).toBeCloseTo(direction === 'ltr' ? 20 : -20, 1);

    await page.locator('#single-range').evaluate((range) => range.classList.add('range-pressed'));
    await expect
      .poll(() =>
        page.locator('#single-range').evaluate((range) => {
          const knob = range.shadowRoot!.querySelector<HTMLElement>('[part~="knob"]')!;
          return new DOMMatrixReadOnly(getComputedStyle(knob).transform).e;
        }),
      )
      .toBeCloseTo(direction === 'ltr' ? 21 : -21, 1);

    const dualMargins = await page.locator('#dual-range').evaluate((range) => {
      const bar = range.shadowRoot!.querySelector<HTMLElement>('[part~="bar"]')!;
      const style = getComputedStyle(bar);
      return { start: style.marginInlineStart, end: style.marginInlineEnd };
    });
    expect(dualMargins).toEqual({ start: '6px', end: '6px' });
  });

  test(`${direction} mirrors Material forward and back transitions`, async ({ page }) => {
    await page.goto('/main/index', { waitUntil: 'networkidle' });
    await page.evaluate((dir) => {
      document.documentElement.dir = dir;
      const originalAnimate = Element.prototype.animate;
      (window as any).__RTL_ANIMATIONS__ = [];
      Element.prototype.animate = function (keyframes, options) {
        const frames = Array.isArray(keyframes) ? keyframes : [];
        (window as any).__RTL_ANIMATIONS__.push({
          tag: this.localName,
          transforms: frames.map((frame) => frame.transform).filter(Boolean),
        });
        return originalAnimate.call(this, keyframes, options);
      };
    }, direction);
    await page.getByRole('button', { name: 'button', exact: true }).click();

    const expected = direction === 'ltr' ? 'translateX(40px)' : 'translateX(-40px)';
    const stacked = direction === 'ltr' ? 'translateX(-40px)' : 'translateX(40px)';
    await expect
      .poll(() =>
        page.evaluate(
          ({ expected, stacked }) => {
            const calls = (window as any).__RTL_ANIMATIONS__ as { tag: string; transforms: string[] }[];
            return {
              entering: calls.some((call) => call.tag === 'app-button' && call.transforms.includes(expected)),
              stacked: calls.some((call) => call.transforms.includes(stacked)),
            };
          },
          { expected, stacked },
        ),
      )
      .toEqual({ entering: true, stacked: true });

    await page.evaluate(() => ((window as any).__RTL_ANIMATIONS__ = []));
    await page.locator('app-button > ion-header ion-back-button').click();
    await expect
      .poll(() =>
        page.evaluate((expectedTransform) => {
          const calls = (window as any).__RTL_ANIMATIONS__ as { tag: string; transforms: string[] }[];
          return calls.some((call) => call.tag === 'app-button' && call.transforms.includes(expectedTransform));
        }, expected),
      )
      .toBe(true);
  });
}
