import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../page_objects/registration_page";
import { ConfirmPage } from "../page_objects/confirm_page";
import { RandomDataGenerator } from "../utils/data_generators";

test.describe("Registration Form ", () => {
	// Arrange
	let registrationPage: RegistrationPage;
	let confirmPage: ConfirmPage;
	let generateUserData: RandomDataGenerator;

	// Act
	test.beforeEach(async ({ page }) => {
		registrationPage = new RegistrationPage(page);
		confirmPage = new ConfirmPage(page);
		generateUserData = new RandomDataGenerator();
		await registrationPage.visit();

		// Assert
		await expect(registrationPage.heading).toBeVisible();
    await expect(registrationPage.firstName).toBeVisible();
    await expect(registrationPage.firstName).toBeVisible();
    await expect(registrationPage.firstName).toBeVisible();
    
	});

	test("should display validation errors for required fields", async () => {
		// Act
		await registrationPage.submitForm();
		const errorMessages = await registrationPage.getErrorMessages();

		// Assert
		expect(errorMessages).toContain("Pole Imię jest wymagane");
		expect(errorMessages).toContain("Pole Nazwisko jest wymagane");
		expect(errorMessages).toContain("Pole E-mail jest wymagane");
		expect(errorMessages).toContain("Pole password jest wymagane");
		expect(errorMessages).toContain("Pole Powtórz hasło jest wymagane");
		expect(errorMessages).toContain("Pole Data urodzenia jest wymagane");
		expect(errorMessages).toContain("To pole jest wymagane");
	});

	test("should register successfully with full form valid data", async () => {
		// Act
		const password = generateUserData.generateRandomPassword(12);

		await registrationPage.fillFirstName();
		await registrationPage.fillLastName();
		await registrationPage.fillEmail();
		await registrationPage.fillPassword(password);
		await registrationPage.fillConfirmPassword(password);
		await registrationPage.fillDob("dob");
		await registrationPage.fillPhoneNumber();
		await registrationPage.selectLanguage("pl");
		await registrationPage.acceptTerms();
		await registrationPage.subscribeNewsletter();
		await registrationPage.submitForm();

		await confirmPage.heading.waitFor({ state: "visible", timeout: 2000 });
		await confirmPage.email_notification.waitFor({
			state: "visible",
			timeout: 2000,
		});

		// Assert
		await expect(confirmPage.heading).toBeVisible();
		await expect(confirmPage.email_notification).toBeVisible();
		await expect(confirmPage.heading).toContainText(confirmPage.message);
	});

	test("should show error for invalid email", async () => {
		// Arrange
		const invalidEmailAddresses: string[] = [
			"invalidemail.com",
			"user@.com",
			"user@domain.",
			"user@@domain.com",
			"user@domain!#$.com",
			"user name@domain.com",
			"user@domain .com",
			"a...a@domain.com",
			"user@domain.##",
			"@domain.com",
			"user@",
			"user.@domain.com",
		];

		// Act
		for (const email of invalidEmailAddresses) {
			await registrationPage.fillEmail(email);
			await registrationPage.submitForm();

			const errorMessages = await registrationPage.getErrorMessages();

			// Assert
			await expect(errorMessages).toContain(
				"Pole E-mail musi być poprawnym adresem email",
			);
		}
	});

	test("should show error for mismatched passwords", async () => {
		// Act
		await registrationPage.fillPassword(
			generateUserData.generateRandomPassword(10),
		);
		await registrationPage.fillConfirmPassword(
			generateUserData.generateRandomPassword(12),
		);
		await registrationPage.submitForm();

		const errorMessages = await registrationPage.getErrorMessages();

		// Assert
		expect(errorMessages).toContain("Hasła nie są jednakowe!");
	});

	test("should register successfully with required fields only", async () => {
		// Act
		await registrationPage.fillFirstName();
		await registrationPage.fillLastName();
		await registrationPage.fillEmail();
		await registrationPage.fillPassword();
		await registrationPage.fillConfirmPassword();
		await registrationPage.fillDob("dob");
		await registrationPage.acceptTerms();
		await registrationPage.submitForm();

		await confirmPage.heading.waitFor({ state: "visible", timeout: 2000 });
		await confirmPage.email_notification.waitFor({
			state: "visible",
			timeout: 2000,
		});

		// Assert
		await expect(confirmPage.heading).toBeVisible();
		await expect(confirmPage.email_notification).toBeVisible();
		await expect(confirmPage.heading).toContainText(confirmPage.message);
		await expect(confirmPage.email_notification).toContainText(
			confirmPage.emailNotification,
		);
	});
});
