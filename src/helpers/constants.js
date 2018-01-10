const alertDelay = 10,
    extraCharge = 0.50,
    gainMultiplier = 0.15,
    lineColor = [
        '',
        '',
        'table-primary',
        'table-info'
    ],
    statusText = [
        'ΝΕΑ ΠΑΡΑΓΓΕΛΙΑ',
        'ΕΤΟΙΜΑΖΕΤΑΙ',
        'ΕΤΟΙΜΑΣΤΗΚΕ',
        'ΣΤΟΝ ΔΡΟΜΟ'
    ];

statusText[10] = 'ΟΛΟΚΛΗΡΩΘΗΚΕ';
statusText[99] = 'ΑΠΟΡΡΙΦΘΗΚΕ';

lineColor[10] = 'table-success';
lineColor[99] = 'table-danger';

export default {
    alertDelay,
    extraCharge,
    gainMultiplier,
    lineColor,
    statusText
};
