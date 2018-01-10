let statusText = ['ΝΕΑ ΠΑΡΑΓΓΕΛΙΑ','ΕΤΟΙΜΑΖΕΤΑΙ', 'ΕΤΟΙΜΑΣΤΗΚΕ', 'ΣΤΟΝ ΔΡΟΜΟ'];
statusText[10] = 'ΟΛΟΚΛΗΡΩΘΗΚΕ';
statusText[99] = 'ΑΠΟΡΡΙΦΘΗΚΕ';

let lineColor = ['','', 'table-primary', 'table-info'];
lineColor[10] = 'table-success';
lineColor[99] = 'table-danger';

const gainMultiplier = 0.15;
const extraCharge = 0.50;
const alertDelay = 10;

export default {
	alertDelay,
	lineColor,
	statusText,
	gainMultiplier,
	extraCharge
}