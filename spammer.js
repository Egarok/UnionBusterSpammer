import process from 'process'
import puppeteer from 'puppeteer'
import fetch from 'node-fetch'

(async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users')
	const data = await response.json()
	const randomUser = data[Math.floor(Math.random() * data.length)]

	const browser = await puppeteer.launch({
		headless: false
	})
	const page = await browser.newPage()

	const contactUsLink = 'https://lrionline.com/contact-us/'
	await page.goto(contactUsLink)

	// Fill in name
	await page.click('[id=et_pb_contact_name_0]')
	await page.keyboard.type(randomUser.name)

	// Fill in email
	await page.click('[id=et_pb_contact_email_0]')
	await page.keyboard.type(randomUser.email)

	// Fill in message
	await page.click('[id=et_pb_contact_message_0]')
	await page.keyboard.type(randomUser.company.catchPhrase)

	await page.click('[name=et_builder_submit_button]')
	await page.waitForTimeout(8000)
	await browser.close()

	// Close program
	process.exit(1)
})()