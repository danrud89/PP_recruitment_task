import { faker } from "@faker-js/faker/locale/pl";
import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./base_page";

export class RegistrationPage extends BasePage {

    readonly heading: Locator;
	readonly firstName: Locator;
	readonly lastName: Locator;
	readonly email: Locator;
	readonly password: Locator;
	readonly confirmPassword: Locator;
	readonly dateOfBirth: Locator;
	readonly language: Locator;
	readonly phoneNumber: Locator;
	readonly terms: Locator;
	readonly newsletter: Locator;
	readonly submitButton: Locator;
	readonly errorMessages: Locator;

	constructor(page: Page) {
		super(page);
        this.heading = page.locator("h1");
		this.firstName = page.getByPlaceholder("Imię");
		this.lastName = page.getByPlaceholder("Nazwisko");
		this.email = page.locator('input[type="email"]');
		this.password = page.locator('input[type="password"]').first();
		this.confirmPassword = page.locator('input[type="password"]').last();
		this.dateOfBirth = page.locator('input[type="date"]');
		this.language = page.locator("select.input");
		this.phoneNumber = page.locator("input.vti__input");
		this.terms = page.locator('input[type="checbox"]').first();
		this.newsletter = page.locator('input[type="checbox"]').last();
		this.submitButton = page.getByRole("button", { name: "ZAREJESTRUJ" });
		this.errorMessages = page.locator("span.errors");
	}

	async visit() {
		try {
			await this.page.goto("/");
		} catch (error) {
			console.error("Error navigating to the page:", error);
			throw error;
		}
	}

	async clearInputField(locator: Locator): Promise<void> {
		await locator.fill("");
	}

	async fillFirstName(firstName: string) {
		try {
			await this.clearInputField(this.firstName);
			await this.firstName.fill(firstName);
		} catch (error) {
			console.error(`Error filling first name with value ${firstName}:`, error);
			throw error;
		}
	}

	async fillLastName(lastName: string) {
		try {
			await this.clearInputField(this.password);
			await this.lastName.fill(lastName);
		} catch (error) {
			console.error(`Error filling last name with value ${lastName}:`, error);
			throw error;
		}
	}

	async fillEmail(email: string) {
		try {
			await this.clearInputField(this.email);
			await this.email.fill(email);
		} catch (error) {
			console.error(`Error filling email with value ${email}:`, error);
			throw error;
		}
	}

	async fillPassword(password: string) {
		try {
			await this.clearInputField(this.password);
			await this.password.fill(password);
		} catch (error) {
			console.error("Error filling password:", error);
			throw error;
		}
	}

	async fillConfirmPassword(confirmPassword: string) {
		try {
			await this.clearInputField(this.confirmPassword);
			await this.confirmPassword.fill(confirmPassword);
		} catch (error) {
			console.error("Error filling confirm password:", error);
			throw error;
		}
	}

	async fillDob(dob: string) {
		try {
			await this.clearInputField(this.dateOfBirth);
			await this.dateOfBirth.fill(dob);
		} catch (error) {
			console.error(`Error filling date of birth with value ${dob}:`, error);
			throw error;
		}
	}

	async selectLanguage(language: string) {
		try {
			await this.language.selectOption(language);
		} catch (error) {
			console.error(`Error selecting language with value ${language}:`, error);
			throw error;
		}
	}

	async fillPhoneNumber(phoneNumber: string) {
		try {
			await this.clearInputField(this.phoneNumber);
			await this.phoneNumber.fill(phoneNumber);
		} catch (error) {
			console.error(
				`Error filling phone number with value ${phoneNumber}:`,
				error,
			);
			throw error;
		}
	}

	async acceptTerms() {
		try {
			await this.terms.check();
		} catch (error) {
			console.error("Error accepting terms and conditions:", error);
			throw error;
		}
	}

	async subscribeNewsletter() {
		try {
			await this.newsletter.check();
		} catch (error) {
			console.error("Error subscribing to the newsletter:", error);
			throw error;
		}
	}

	async submitForm() {
		try {
			await this.submitButton.click();
		} catch (error) {
			console.error("Error submitting the form:", error);
			throw error;
		}
	}

	async getErrorMessages() {
		try {
			return await this.errorMessages.allTextContents();
		} catch (error) {
			console.error("Error retrieving error messages:", error);
			throw error;
		}
	}
}
