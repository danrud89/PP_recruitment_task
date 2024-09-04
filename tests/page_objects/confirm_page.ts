import { faker } from "@faker-js/faker/locale/pl";
import { type Locator, type Page, expect } from "@playwright/test";
import { RegistrationPage } from "./registration_page";

export class ConfirmPage extends RegistrationPage {
	readonly heading: Locator;
	readonly email_notification: Locator;
	public readonly message = "dziękujemy za rejestrację!";
	public readonly emailNotification =
		"Na Twój adres email wysłaliśmy wiadomość z linkiem aktywującym konto";

	constructor(page: Page) {
		super(page);
		this.heading = page.locator("h1");
		this.email_notification = page.locator("p");
	}
}
