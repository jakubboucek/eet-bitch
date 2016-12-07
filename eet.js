(function() {

	// Place corner with run button
	var corner = document.createElement('a');
	corner.id = 'eet-bitch-corner';
	document.body.appendChild(corner);
	var img = document.createElement('img');
	img.src = chrome.extension.getURL('/eet.svg');
	img.title = 'Vyplnit údaje EET';
	corner.appendChild(img);
	// Set listener to click
	img.addEventListener('click', fill, true);

	// Fill all items
	function fill() {
		var upper = randChoose(true, false);

		var datumFields = [
			document.querySelector('#frm\\:datTrzba'),
			document.querySelector('#frm\\:casTrzba'),
		];
		fillDate(datumFields);

		fillPrice(document.querySelector('#frm\\:celkTrzba'));

		var fikFields = [
			document.querySelector('#frm\\:fik_0'),
			document.querySelector('#frm\\:fik_1'),
			document.querySelector('#frm\\:fik_2'),
			document.querySelector('#frm\\:fik_3'),
			document.querySelector('#frm\\:fik_4'),
			document.querySelector('#frm\\:fik_5'),
		];
		fillFik(fikFields, upper);

		var bkpFields = [
			document.querySelector('#frm\\:bkp_0'),
			document.querySelector('#frm\\:bkp_1'),
			document.querySelector('#frm\\:bkp_2'),
			document.querySelector('#frm\\:bkp_3'),
			document.querySelector('#frm\\:bkp_4'),
		];
		fillBkp(bkpFields, upper);
	}

	function fillDate(datumFields) {
		var date = genDate();
		fillField(datumFields[0], date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear());
		fillField(datumFields[1], date.getHours() + ":" + twoZero(date.getMinutes()) + ":" + twoZero(date.getSeconds()));
	}

	function fillPrice(priceField) {
		fillField(priceField, genNumber(0, randChoose(10000, 100, 0.2), randChoose(true, false, 0.8)));
	}

	function fillFik(fikFields, upper) {
		fillField(fikFields[0], randHex(8, upper));
		fillField(fikFields[1], randHex(4, upper));
		fillField(fikFields[2], randHex(4, upper));
		fillField(fikFields[3], randHex(4, upper));
		fillField(fikFields[4], randHex(12, upper));
		fillField(fikFields[5], '01');
	}

	function fillBkp(bkpFields, upper) {
		fillField(bkpFields[0], randHex(8, upper));
		fillField(bkpFields[1], randHex(8, upper));
		fillField(bkpFields[2], randHex(8, upper));
		fillField(bkpFields[3], randHex(8, upper));
		fillField(bkpFields[4], randHex(8, upper));
	}

	function fillField(field, value) {
		field.focus(); // reach original form validation
		field.value = value;
	}

	function genDate() {
		var date = randomDate(new Date(2016, 11, 1), new Date((new Date()).getTime() - 3600*48) );
		//                           ^ 2016-12-01           ^ 48 hours ago
		return date;
	}

	function randomDate(start, end) {
    	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}

	function twoZero(value) {
		return (value < 10 ? '0' : '') + value;
	}

	function genNumber(min, max, round) {
		if(round) {
			// Round number with allow reaching `max` value
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		else {
			// Floor to two decimal
			return Math.floor((Math.random()*(max - min + 1) + min) * 100) / 100;
		}
	}

	function randHex(length, upper) {
		var chars = (upper ? '0123456789abcdef': '0123456789ABCDEF');
		var result = '';
		for(i=0;i<length;i++) {
			result += chars[genNumber(0,15,true)];
		}
		return result;
	}

	// Random choose between two values, theshold move non-uniform distribution
	// [choose1]...........< treshold >...............................[choose2]
	function randChoose(choose1, choose2, treshold) {
		if(treshold == undefined) {
			treshold = 0.5;
		}
		if(Math.random() < treshold) {
			return choose1;
		}
		else {
			return choose2;
		}
	}
})();


