import KR from './img/krFlag.png';
import JP from './img/jpFlag.png';
import US from './img/usFlag.png';
import CN from './img/cnFlag.png';

export const getCountryImgById = (CountryId) => {
    const targetCountryId = String(CountryId);
    switch (targetCountryId) {
        case 'KR':
            return KR;
        case 'JP':
            return JP;
        case 'US':
            return US;
        case 'CN':
            return CN;
        default:
            return null;
    }
};
export const getFormattedDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();
    if (month < 10) {
        month = `0${month}`;
    }
    if (date < 10) {
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
};

export const getMonthRangeByDate = (date) => {
    const beginTimeStamp = new Date(
        date.getFullYear(),
        date.getMonth(),
        1,
    ).getTime();
    const endTimeStamp = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
        23,
        59,
        59,
    ).getTime();
    return { beginTimeStamp, endTimeStamp };
};

export const getCountryCodeForTranslate = (code) => {
    switch (code) {
        case 'KR':
            return 'KO';
        case 'JP':
            return 'JA';
        case 'US':
            return 'EN';
        case 'CN':
            return 'ZH';
        default:
            return null;
    }
};

export const getCountryCodeToCurrency = (member) => {
    if (member.country.code === 'US') {
        return 'USD';
    } else if (member.country.code === 'JP') {
        return 'JPY';
    } else if (member.country.code === 'CN') {
        return 'CNY';
    } else {
        console.log('user country unknown');
    }
};
