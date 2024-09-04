import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../page_objects/registration_page';
import { generateUserData } from '../utils/data_generators';

test.describe('Registration Form', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.visit();
    await expect(registrationPage.heading).toBeVisible();
  });

  test('should display validation errors for required fields', async () => {
    await registrationPage.submitForm();

    const errorMessages = await registrationPage.getErrorMessages();
    expect(errorMessages).toContain('Pole Imię jest wymagane');
    expect(errorMessages).toContain('Pole Nazwisko jest wymagane');
    expect(errorMessages).toContain('Pole E-mail jest wymagane');
    expect(errorMessages).toContain('Pole Hasło jest wymagane');
    expect(errorMessages).toContain('Pole Powtórz hasło jest wymagane');
    expect(errorMessages).toContain('Pole Data urodzenia jest wymagane');
    expect(errorMessages).toContain('To pole jest wymagane');
  });

  test('should register successfully with valid data', async () => {
    const userData = generateUserData();

    await registrationPage.fillFirstName(userData.firstName);
    await registrationPage.fillLastName(userData.lastName);
    await registrationPage.fillEmail(userData.email);
    await registrationPage.fillPassword(userData.password);
    await registrationPage.fillConfirmPassword(userData.confirmPassword);
    await registrationPage.fillDob(userData.dob);
    await registrationPage.acceptTerms();
    await registrationPage.submitForm();
  });

  test('should show error for invalid email', async () => {
    const userData = generateUserData();
    userData.email = 'invalid-email';

    await registrationPage.fillFirstName(userData.firstName);
    await registrationPage.fillLastName(userData.lastName);
    await registrationPage.fillEmail(userData.email);
    await registrationPage.fillPassword(userData.password);
    await registrationPage.fillConfirmPassword(userData.confirmPassword);
    await registrationPage.fillDob(userData.dob);
    await registrationPage.acceptTerms();
    await registrationPage.submitForm();

    const errorMessages = await registrationPage.getErrorMessages();
    expect(errorMessages).toContain('Podaj prawidłowy adres e-mail');
  });

  test('should show error for mismatched passwords', async () => {
    const userData = generateUserData();
    userData.confirmPassword = 'DifferentPassword123';

    await registrationPage.fillFirstName(userData.firstName);
    await registrationPage.fillLastName(userData.lastName);
    await registrationPage.fillEmail(userData.email);
    await registrationPage.fillPassword(userData.password);
    await registrationPage.fillConfirmPassword(userData.confirmPassword);
    await registrationPage.fillDob(userData.dob);
    await registrationPage.acceptTerms();
    await registrationPage.submitForm();

    const errorMessages = await registrationPage.getErrorMessages();
    expect(errorMessages).toContain('Hasła muszą być identyczne');
  });

  test('should register with optional phone number and language', async () => {
    const userData = generateUserData();

    await registrationPage.fillFirstName(userData.firstName);
    await registrationPage.fillLastName(userData.lastName);
    await registrationPage.fillEmail(userData.email);
    await registrationPage.fillPassword(userData.password);
    await registrationPage.fillConfirmPassword(userData.confirmPassword);
    await registrationPage.fillDob(userData.dob);
    await registrationPage.fillPhoneNumber(userData.phoneNumber);
    await registrationPage.selectLanguage('Polski');
    await registrationPage.acceptTerms();
    await registrationPage.submitForm();

  });
});
