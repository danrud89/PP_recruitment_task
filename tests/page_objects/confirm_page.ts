import { faker } from "@faker-js/faker/locale/pl";
import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./base_page";

export class ConfirmPage extends BasePage {

    readonly heading: Locator;
    private static message = 'dziękujemy za rejestrację!';
    private static emailNotification = 'Na Twój adres email wysłaliśmy wiadomość z linkiem aktywującym konto';
	

	constructor(page: Page) {
		super(page);
        this.heading = page.locator("h1");
		
	}

	
}
