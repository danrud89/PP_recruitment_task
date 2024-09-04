import { faker } from '@faker-js/faker';

export class RandomDataGenerator {
	private static readonly COUNTRY_CODE = "+48";
	private static readonly STREET_NAMES = [
		"Mickiewicza",
		"Słowackiego",
		"Kościuszki",
		"Piłsudskiego",
		"Długa",
		"Krótka",
		"Wąska",
		"Szeroka",
	];

	public invalidPhoneNumbers: string[] = [
		"123456",               
		"12-34-56",            
		"1234567abc",           
		"+1234567890!",         
		"123 456 789",         
		"(123) 456-7890",       
		"123-456-78a",          
		"+48 123 456 7890",     
		"123-456-789-0123",     
		"+1-800-FLOWERS",       
		"12345!@#$%",           
		"++123456789",          
		"00123456789",  
	  ];
	
	  public invalidEmailAddresses: string[] = [
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

	generateRandomPassword(length: number): string {
		if (length < 4) {
		  throw new Error("Password length must be at least 4 characters to include all required character types.");
		}
	  
		const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const smallLetters = "abcdefghijklmnopqrstuvwxyz";
		const numbers = "0123456789";
		const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
		
		const requiredChars = [
		  capitalLetters[Math.floor(Math.random() * capitalLetters.length)],
		  smallLetters[Math.floor(Math.random() * smallLetters.length)],
		  numbers[Math.floor(Math.random() * numbers.length)],
		  specialChars[Math.floor(Math.random() * specialChars.length)],
		];
	  
		const allChars = capitalLetters + smallLetters + numbers + specialChars;
		
		for (let index = requiredChars.length; index < length; ++index) {
		  requiredChars.push(allChars[Math.floor(Math.random() * allChars.length)]);
		}

		for (let index = requiredChars.length - 1; index > 0; --index) {
		  const j = Math.floor(Math.random() * (index + 1));
		  [requiredChars[index], requiredChars[j]] = [requiredChars[j], requiredChars[index]];
		}
		return requiredChars.join('');
	  }

	async generateRandomPhoneNumber(): Promise<string> {
		const randomThreeDigits = () =>
			Math.floor(100 + Math.random() * 900).toString();

		const phoneNumber = `${randomThreeDigits()} ${randomThreeDigits()} ${randomThreeDigits()}`;
		return phoneNumber;
	}

	async generateRandomStreetName(): Promise<string> {
		const randomIndex = Math.floor(
			Math.random() * RandomDataGenerator.STREET_NAMES.length,
		);
		return RandomDataGenerator.STREET_NAMES[randomIndex];
	}

	
	private generateRandomString(length: number, characters: string): string {
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	private getRandomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
