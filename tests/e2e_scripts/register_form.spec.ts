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
		await expect(registrationPage.form).toBeVisible();
		await expect(registrationPage.firstName).toBeEnabled();
	});

	test("should display validation errors for required fields", async () => {

		// Arrange
		const expectedErrors = registrationPage.errors;

		// Act
		await registrationPage.submitForm();
		const errorMessages = await registrationPage.getErrorMessages();

		// Assert
		for (const error of errorMessages) {
			expect(expectedErrors).toContain(error);
		}
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
		const invalidEmailAddresses = generateUserData.invalidEmailAddresses;

		// Act
		for (const email of invalidEmailAddresses) {
			await registrationPage.fillEmail(email);
			await registrationPage.submitForm();

			const errorMessages = await registrationPage.getErrorMessages();

			// Assert
			await expect(errorMessages).toContain(
				registrationPage.errors[3],
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
		expect(errorMessages).toContain(registrationPage.errors[5]);
	});

	test("should show phone number error for invalid syntax", async () => {

		// Arrange
		const invalidPhoneNumbers = generateUserData.invalidPhoneNumbers;

		// Act
		for (const phone_number of invalidPhoneNumbers) {
			await registrationPage.fillPhoneNumber(phone_number);
			await registrationPage.submitForm();
			await registrationPage.wait(1000);
			await registrationPage.submitForm();
			const errorMessages = await registrationPage.getErrorMessages();

			// Assert
      for (const error of errorMessages){
        expect(registrationPage.errors).toContain(error);
      }
		}
	});

	test("should register successfully with required fields only", async () => {
    
		// Act
		const password = generateUserData.generateRandomPassword(12);

		await registrationPage.fillFirstName();
		await registrationPage.fillLastName();
		await registrationPage.fillEmail();
		await registrationPage.fillPassword(password);
		await registrationPage.fillConfirmPassword(password);
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
