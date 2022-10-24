const playwright = require("playwright");

module.exports = async (request) => {
	const browser = await playwright.chromium.launch({
		headless: true,
	});

	try {
		//init context and page
		const context = await browser.newContext();
		const page = await context.newPage();
		const url = "https://www.agoda.com/pagenotfound.html"; //seems that this url has least logic behind it (no pop-ups etc.)

		if (request.hotelName === undefined) {
			await browser.close();
			return {
				err: "Hotel name missing",
			};
		}

		//navigation flow
		await page.goto(url);
		await page
			.locator('input[data-selenium="textInput"]')
			.first()
			.fill(
				request.hotelName.concat(
					", ",
					isValid(request.location),
					", ",
					isValid(request.country)
				)
			);
		await page
			.locator('li[data-element-name="search-box-sub-suggestion"]')
			.first()
			.click();
		await page
			.locator('button[data-element-name="search-button"]')
			.first()
			.click();
		const [hotelPage] = await Promise.all([
			context.waitForEvent("page"),
			page.locator('span:has-text("Select room")').first().click(),
		]);
		await hotelPage.waitForLoadState();

		if (!checkRegion(hotelPage.url(), request.location)) {
			await browser.close();
			return {
				err: "Hotel not found",
			};
		}

		//construct new url with matching hotel name
		const finalUrl = adjustUrl(hotelPage.url(), request);

		//navigation flow
		hotelPage.goto(finalUrl);
		const cheapestDeal = await hotelPage
			.locator(".StickyNavPrice__priceDetail--lowerText > span")
			.last()
			.innerText();
		const fullPrice =
			parseInt(cheapestDeal) *
			getNumberOfDays(request.checkIn, request.checkOut);

		//return final price and url
		await browser.close();
		return {
			price: fullPrice,
			url: finalUrl,
		};
	} catch (err) {
		await browser.close();
		return {
			err: err.message,
		};
	}
};

function adjustUrl(url, request) {
	const splitUrl = url.split("?");
	return splitUrl[0].concat(parseHotelParams(request));
}

function parseHotelParams(request) {
	return `?adults=${isValid(request.adults)}&children=${isValid(
		request.children.length
	)}&rooms=${isValid(request.rooms)}&checkIn=${isValid(
		request.checkIn
	)}&currencyCode=${isValid(request.currency)}&los=${getNumberOfDays(
		isValid(request.checkIn),
		isValid(request.checkOut)
	)}`;
}

function getNumberOfDays(checkIn, checkOut) {
	const checkInDate = new Date(checkIn);
	const checkOutDate = new Date(checkOut);
	return (checkOutDate - checkInDate) / (1000 * 3600 * 24);
}

function checkRegion(url, location) {
	const splitUrl = url.split("/");
	let splitRegion = splitUrl[5].split(".");
	splitRegion.pop();
	const splitLocation = splitRegion.toString().split("-");
	let finalLocation = "";

	//if city is multi-word -> format string accordingly
	if (splitLocation.length > 2) {
		for (let i = 0; i < splitLocation.length - 1; i++) {
			finalLocation = finalLocation.concat(splitLocation[i], "-");
		}
		finalLocation = finalLocation.slice(0, -1); //remove remaining - at the end
	} else {
		finalLocation = splitLocation[0];
	}
	return finalLocation === location.split(" ").join("-").toLowerCase(); //check if found hotel location matches request location
}

function isValid(param) {
	if (param != undefined) {
		return param;
	} else {
		return "";
	}
}
