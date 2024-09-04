import { faker } from "@faker-js/faker/locale/pl";
import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./base_page";
import { RandomDataGenerator } from "../utils/data_generators";

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
	private calendarMap: Map<string, Locator>;
	private dataGenerator: RandomDataGenerator;

	public errors = [
		"Pole Imię jest wymagane",
		"Pole Nazwisko jest wymagane",
		"Pole E-mail jest wymagane",
		"Pole E-mail musi być poprawnym adresem email",
		"Pole password jest wymagane",
		"Hasła nie są jednakowe!",
		"Pole Powtórz hasło jest wymagane",
		"Pole Data urodzenia jest wymagane",
		"To pole jest wymagane",
		"To pole może zawierać tylko cyfry i spacje",
		"To pole musi zawierać co najmniej 9 cyfr",
	];

	constructor(page: Page) {
		super(page);
		this.heading = page.locator("h1");
		this.firstName = page.getByPlaceholder("Imię");
		this.lastName = page.getByPlaceholder("Nazwisko");
		this.email = page.locator('input[type="email"]');
		this.password = page.locator('input[type="password"]').first();
		this.confirmPassword = page.locator('input[type="password"]').last();
		this.dateOfBirth = page.locator('input[name="date"]');
		this.language = page.locator("select.input");
		this.phoneNumber = page.locator("input.vti__input");
		this.terms = page.locator("div.fake-input").first();
		this.newsletter = page.locator("div.fake-input").last();
		this.submitButton = page.getByRole("button", { name: "ZAREJESTRUJ" });
		this.errorMessages = page.locator("span.errors");
		this.calendarMap = new Map<string, Locator>([["dob", this.dateOfBirth]]);
		this.dataGenerator = new RandomDataGenerator();
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

	async fillFirstName(firstName?: string): Promise<void> {
		try {
			await this.clearInputField(this.firstName);
			await this.firstName.fill(firstName ?? faker.person.firstName("male"));
		} catch (error) {
			console.error(`Error filling first name with value ${firstName}:`, error);
			throw error;
		}
	}

	async fillLastName(lastName?: string): Promise<void> {
		try {
			await this.clearInputField(this.lastName);
			await this.lastName.fill(lastName ?? faker.person.lastName());
		} catch (error) {
			console.error(`Error filling last name with value ${lastName}:`, error);
			throw error;
		}
	}

	async fillEmail(email?: string): Promise<void> {
		try {
			await this.clearInputField(this.email);
			await this.email.fill(email ?? faker.internet.exampleEmail());
		} catch (error) {
			console.error(`Error filling email with value ${email}:`, error);
			throw error;
		}
	}

	async fillPassword(password?: string): Promise<void> {
		try {
			await this.clearInputField(this.password);
			await this.password.fill(
				password ?? this.dataGenerator.generateRandomPassword(15),
			);
		} catch (error) {
			console.error("Error filling password:", error);
			throw error;
		}
	}

	async fillConfirmPassword(confirmPassword?: string): Promise<void> {
		try {
			await this.clearInputField(this.confirmPassword);
			await this.confirmPassword.fill(
				confirmPassword ?? this.dataGenerator.generateRandomPassword(15),
			);
		} catch (error) {
			console.error("Error filling confirm password:", error);
			throw error;
		}
	}

	async fillDob(calendarName: "dob", dob?: string): Promise<void> {
		try {
			const calendarLocator = this.calendarMap.get(calendarName);
			if (!calendarLocator) {
				throw new Error(`Invalid calendar name:  '${calendarName}'.`);
			}
			await calendarLocator.fill(
				dob ??
					faker.date
						.birthdate({ min: 18, max: 65 })
						.toISOString()
						.split("T")[0],
			);
		} catch (error) {
			console.error(`Error filling date of birth with value ${dob}:`, error);
			throw error;
		}
	}

	async selectLanguage(languageValue: string): Promise<void> {
		try {
			if (
				(await this.language.isVisible()) &&
				(await this.language.isEnabled())
			) {
				await this.language.selectOption({ value: languageValue });
				console.log(`Successfully selected language: ${languageValue}`);
			} else {
				console.warn("Dropdown is not visible or not enabled.");
			}
		} catch (error) {
			console.error(
				`Error selecting language with value ${languageValue}:`,
				error,
			);
			throw error;
		}
	}

	async fillPhoneNumber(phoneNumber?: string): Promise<void> {
		try {
			await this.clearInputField(this.phoneNumber);
			await this.phoneNumber.fill(
				phoneNumber ?? (await this.dataGenerator.generateRandomPhoneNumber()),
			);
		} catch (error) {
			console.error(
				`Error filling phone number with value ${phoneNumber}:`,
				error,
			);
			throw error;
		}
	}

	async acceptTerms(): Promise<void> {
		try {
			await this.terms.click();
		} catch (error) {
			console.error("Error accepting terms and conditions:", error);
			throw error;
		}
	}

	async subscribeNewsletter(): Promise<void> {
		try {
			await this.newsletter.click();
		} catch (error) {
			console.error("Error subscribing to the newsletter:", error);
			throw error;
		}
	}

	async submitForm(): Promise<void> {
		try {
			const isVisible = await this.submitButton.isVisible();
			const isEnabled = await this.submitButton.isEnabled();

			if (isVisible && isEnabled) {
				await this.submitButton.click();
			} else {
				throw new Error("Submit button is neither visible nor enabled.");
			}
		} catch (error) {
			console.error("Error submitting the form:", error);
			throw error;
		}
	}

	async getErrorMessages(): Promise<string[]> {
		try {
			const errorElements = this.page.locator("span.errors");
			const errorMessages: string[] = [];

			for (let index = 0; index < (await errorElements.count()); ++index) {
				const errorElement = errorElements.nth(index);
				if (await errorElement.isVisible()) {
					const text = await errorElement.textContent();
					if (text) {
						errorMessages.push(text);
					}
				}
			}

			if (errorMessages.length === 0) {
				console.warn("No error messages are visible on the page.");
			}

			return errorMessages;
		} catch (error) {
			console.error("Error retrieving error messages:", error);
			throw error;
		}
	}
}
