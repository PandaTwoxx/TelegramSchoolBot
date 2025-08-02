const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

import dotenv from 'dotenv';



dotenv.config();



async function getAssignments() {

// Configure Chrome options for headless mode

let options = new chrome.Options();

options.addArguments('--headless=new'); // The recommended way to run headless mode in modern Chrome



let driver = await new Builder()

.forBrowser(Browser.CHROME)

.setChromeOptions(options) // Set the headless options

.build();



try {

await driver.get('https://dalton.myschoolapp.com/app/student?svcid=edu#login');

const usernameField = await driver.wait(until.elementLocated(By.id('Username')), 5000);

await usernameField.sendKeys('c31wg@dalton.org', Key.RETURN);

await driver.wait(until.titleIs('Sign in to your account'), 5000);

const passwordField = await driver.wait(until.elementLocated(By.id('i0118')), 5000);

await passwordField.sendKeys(process.env.PASSWORD!, Key.RETURN);

await driver.wait(until.titleIs('Sign in to your account'), 5000);

await driver.sleep(1000);

await driver.findElement(By.id("idSIButton9")).click();

await driver.wait(until.titleIs('Student : My Day'), 5000);

await driver.get('https://dalton.myschoolapp.com/lms-assignment/assignment-center/student?svcid=edu');

const activeAssignmentsElement = await driver.wait(

until.elementLocated(By.xpath("//*[contains(text(), 'Active assignments')]")),

5000

);

return await activeAssignmentsElement.getAttribute('innerHTML');

} finally {

await driver.quit();

}

}



export { getAssignments };