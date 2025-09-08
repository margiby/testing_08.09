import { test, expect } from '@playwright/experimental-ct-react';
import LanguageDropdown from '../../src/components/Header/LanguageDropdown';
import { LocaleContextProvider } from '../../src/hooks/Context';

test.use({ viewport: { width: 500, height: 500 } });

test('sollte die Sprach-Buttons anzeigen', async ({ mount }) => {
  // 1. "Montiere" die Komponente innerhalb des Kontext-Providers
  const component = await mount(
    <LocaleContextProvider>
      <LanguageDropdown />
    </LocaleContextProvider>
  );

  // 2. Überprüfe, ob die Buttons sichtbar sind (Deutsch und Englisch)
  await expect(component.getByRole('button', { name: 'DE' })).toBeVisible();
  await expect(component.getByRole('button', { name: 'EN' })).toBeVisible();
});