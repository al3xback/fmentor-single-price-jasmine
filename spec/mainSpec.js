import jsdom from 'jsdom';
import fetch from 'node-fetch';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-single-price-jasmine/';

const getData = async () => {
	return fetch(url)
		.then((res) => {
			return res.text();
		})
		.then((body) => {
			const { document } = new JSDOM(body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have a string type of card mark content element', () => {
		const cardMarkContent =
			document.querySelector('.card__mark').textContent;

		expect(cardMarkContent).toBeInstanceOf(String);
	});

	it("should have a title element that contains 'Join our community' word in first section element", () => {
		const sectionEls = document.querySelectorAll('section');
		const firstSectionEl = sectionEls[0];
		const cardTitleEl = firstSectionEl.querySelector('.card__title');
		const cardTitle = cardTitleEl.textContent.trim();

		expect(cardTitle).toMatch(/Join our community/);
	});

	it('should have three section elements', () => {
		const sectionEls = document.querySelectorAll('section');

		expect(sectionEls).toHaveSize(3);
	});

	it("should have a word 'Coding exercises' as one of why us points", () => {
		const whyUsPointEls = document.querySelectorAll('.card__list li');

		const whyUsPoints = [];

		for (let i = 0; i < whyUsPointEls.length; i++) {
			const whyUsPoint = whyUsPointEls[i].textContent;
			whyUsPoints.push(whyUsPoint);
		}

		expect(whyUsPoints).toContain('Coding exercises');
	});
});
