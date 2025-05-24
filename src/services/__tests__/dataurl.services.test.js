import { rgbDataURL } from '../dataurl.services'

describe('rgbDataURL function', () => {
	test('should generate correct data URL for black (0, 0, 0)', () => {
		const expectedDataURL =
			'data:image/gif;base64,R0lGODlhAQABAPAAAAAAAP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
		expect(rgbDataURL(0, 0, 0)).toBe(expectedDataURL)
	})

	test('should generate correct data URL for white (255, 255, 255)', () => {
		const expectedDataURL =
			'data:image/gif;base64,R0lGODlhAQABAPAAAP///////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
		expect(rgbDataURL(255, 255, 255)).toBe(expectedDataURL)
	})

	test('should generate correct data URL for red (255, 0, 0)', () => {
		const expectedDataURL =
			'data:image/gif;base64,R0lGODlhAQABAPAAAP8AAP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
		expect(rgbDataURL(255, 0, 0)).toBe(expectedDataURL)
	})

	test('should generate correct data URL for grey (128, 128, 128)', () => {
		const expectedDataURL =
			'data:image/gif;base64,R0lGODlhAQABAPAAAICAgP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
		expect(rgbDataURL(128, 128, 128)).toBe(expectedDataURL)
	})

	test('should generate correct data URL for blue (0, 0, 255)', () => {
		const expectedDataURL =
			'data:image/gif;base64,R0lGODlhAQABAPAAAAAA/////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
		expect(rgbDataURL(0, 0, 255)).toBe(expectedDataURL)
	})

	test('should generate correct data URL for green (0, 255, 0)', () => {
		const expectedDataURL =
			'data:image/gif;base64,R0lGODlhAQABAPAAAAD/AP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==' // Corrected from ADD/ to AAD/
		expect(rgbDataURL(0, 255, 0)).toBe(expectedDataURL)
	})
})
