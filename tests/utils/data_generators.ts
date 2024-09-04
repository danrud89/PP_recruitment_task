import { faker } from '@faker-js/faker';

export const generateUserData = () => {
  const password = faker.internet.password(8);

  return {
    firstName: faker.person.firstName("male"),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: password,
    confirmPassword: password,
    dob: faker.date.birthdate({ min: 18, max: 65 }).toISOString().split('T')[0],
    phoneNumber: faker.phone.number('+48 ### ### ###')
  };
};

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

	async generateRandomPhoneNumber(): Promise<string> {
		const randomThreeDigits = () =>
			Math.floor(100 + Math.random() * 900).toString();

		const phoneNumber = `${
			RandomDataGenerator.COUNTRY_CODE
		} ${randomThreeDigits()} ${randomThreeDigits()} ${randomThreeDigits()}`;
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
