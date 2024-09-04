import { faker } from '@faker-js/faker';

export const generateUserData = () => {
  const password = faker.internet.password(8);

  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: password,
    confirmPassword: password,
    dob: faker.date.birthdate({ min: 18, max: 65 }).toISOString().split('T')[0],
    phoneNumber: faker.phone.number('+48 ### ### ###')
  };
};
