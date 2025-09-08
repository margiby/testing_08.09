import { test, expect } from '@playwright/test';

// Gruppiert alle Tests für die Startseite
test.describe('HomePage', () => {

  test('sollte die Willkommensnachricht anzeigen', async ({ page }) => {
    // 1. Navigiere zur Startseite (verwendet die baseURL aus deiner Konfiguration)
    await page.goto('/');

    // 2. Suche nach der Überschrift mit dem Willkommenstext
    const welcomeHeading = page.getByRole('heading', { name: 'BET - Bio Energy Technology Database' });

    // 3. Überprüfe, ob die Überschrift sichtbar ist
    await expect(welcomeHeading).toBeVisible();
  });

  test('sollte das interaktive Diagramm rendern', async ({ page }) => {
    // 1. Navigiere zur Startseite
    await page.goto('/');

    // 2. Suche nach dem Container des Diagramms
    // ***Diese CSS-Klasse kommt aus 'DiagramContainer.tsx'
    const diagramContainer = page.locator('.diagram-layout-container');

    // 3. Überprüfe, ob der Container sichtbar ist
    await expect(diagramContainer).toBeVisible();
  });

});