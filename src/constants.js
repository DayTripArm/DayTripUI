export const HOST_URL = "http://137.184.128.54:3000";
export const TRAVELER_TYPE = "1";
export const DRIVER_TYPE = "2";

export const PERSONAL = "PERSONAL";
export const LOGIN = "LOGIN";
export const PAYMENTS = "PAYMENTS";

export const GENDER_LIST = ["male", "female"];

export const LANGUAGES = ["Afar", "Abkhazian", "Afrikaans", "Akan", "Amharic", "Aragonese", "Arabic", "Assamese", "Avar", "Aymara", "Azerbaijani", "Bashkir", "Belarusian", "Bulgarian", "Bihari", "Bislama", "Bambara", "Bengali", "Tibetan", "Breton", "Bosnian", "Catalan", "Chechen", "Chamorro", "Corsican", "Cree", "Czech", "Old Church Slavonic / Old Bulgarian", "Chuvash", "Welsh", "Danish", "German", "Divehi", "Dzongkha", "Ewe", "Greek", "English", "Esperanto", "Spanish", "Estonian", "Basque", "Persian", "Peul", "Finnish", "Fijian", "Faroese", "French", "West Frisian", "Irish", "Scottish Gaelic", "Galician", "Guarani", "Gujarati", "Manx", "Hausa", "Hebrew", "Hindi", "Hiri Motu", "Croatian", "Haitian", "Hungarian", "Armenian", "Herero", "Interlingua", "Indonesian", "Interlingue", "Igbo", "Sichuan Yi", "Inupiak", "Ido", "Icelandic", "Italian", "Inuktitut", "Japanese", "Javanese", "Kongo", "Kikuyu", "Kuanyama", "Kazakh", "Greenlandic", "Cambodian", "Kannada", "Korean", "Kanuri", "Kashmiri", "Kurdish", "Komi", "Cornish", "Kirghiz", "Latin", "Luxembourgish", "Ganda", "Limburgian", "Lingala", "Laotian", "Lithuanian", "Latvian", "Malagasy", "Marshallese", "Maori", "Macedonian", "Malayalam", "Mongolian", "Moldovan", "Marathi", "Malay", "Maltese", "Burmese", "Nauruan", "North Ndebele", "Nepali", "Ndonga", "Dutch", "Norwegian Nynorsk", "Norwegian", "South Ndebele", "Navajo", "Chichewa", "Occitan", "Ojibwa", "Oromo", "Oriya", "Ossetian", "Punjabi", "Pali", "Polish", "Pashto", "Portuguese", "Quechua", "Raeto Romance", "Kirundi", "Romanian", "Russian", "Rwandi", "Sanskrit", "Sardinian", "Sindhi", "Sango", "Serbo-Croatian", "Sinhalese", "Slovak", "Slovenian", "Samoan", "Shona", "Somalia", "Albanian", "Serbian", "Swati", "Southern Sotho", "Sundanese", "Swedish", "Swahili", "Tamil", "Telugu", "Tajik", "Thai", "Tigrinya", "Turkmen", "Tagalog", "Tswana", "Tonga", "Turkish", "Tsonga", "Tatar", "Twi", "Tahitian", "Uyghur", "Urdu", "Venda", "Vietnamese", "Volapük", "Walloon", "Wolof", "Xhosa", "Yiddish", "Yoruba", "Zhuang", "Chinese", "Zulu"];

export const LOCATIONS = ["Yerevan", "Gyumri", "Vanadzor", "Vagharshapat", "Abovyan", "Kapan", "Hrazdan", "Armavir", "Dilidjan", "Artashat", "Ijevan", "Sevan", "Charentsavan", "Masis", "Ararat", "Goris", "Gavar", "Ashtarak", "Yeghegnadzor", "Caxkadzor", "Yeghvard", "Agarak", "Alaverdi", "Axtala", "Ayrum", "Aparan", "Artik", "Berd",
                          "Byureghavan", "Chambarak", "Maralik", "Martuni", "Mecamor", "Meghri", "Noyemberyan", "Shamlux", "Jermuk", "Sisian", "Spitak", "Stepanavan", "Vayq", "Vardenis", "Vedi", "Tashir", "Kajaran"];

export const LANGUAGES_BY_COUNTRY = {"en": "English", "am": "Հայերեն", "ru": "Русский"}

export const CURRENCIES = [{"short_name": "EUR", "name": "Euro", "utf_symbol": "\u00A3"}, {"short_name": "USD", "name": "US Dollar", "utf_symbol": "\u0024"}, {"short_name": "AMD", "name": "Armenian Dram", "utf_symbol": "\u058F"},{"short_name": "RUB", "name": "Russian Rubli", "utf_symbol": "\u20BD"}]
export const CURRENCY_LIMIT_RANGES = {
    "eur": [10, 1000],
    "usd": [10, 1000],
    "rub": [500, 50000],
    "amd": [5000, 500000]
}
export const SERVICE_FEES = {
    "eur": 3,
    "usd": 4,
    "rub": 300,
    "amd": 1500,
}

export const MONTH_LIST = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
export const DAYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

export const GET_DATE_YEARS = () => {
    let date = new Date();
    const year_list = [];
    for (var i = 1900; i <= date.getFullYear(); i++) year_list.push(i);
    return year_list;
};


export const CAR_TYPE_LIST  = ["sedan", "hatchback", "wagon", "coupe", "convertible", "suv", "pickup", "van"];
export const COLOR_LIST = ["black", "blue", "brown", "gold", "gray", "green", "orange", "purple", "red", "silver", "tan", "white", "yellow"];
export const CAR_YEAR_LIST = () => {
    let date = new Date();
    const year_list = [];
    for (var i = 1980; i <= date.getFullYear(); i++) year_list.push(i);
    return year_list;
};

export const AVAILABILITY_WINDOW = {
    'all_dates': 12,
    '9_months': 9,
    '6_months': 6,
    '3_months': 3,
    'all_unavialable': 0
};
export const DRIVER_NOTICE = [1, 2, 3, 7];

export const CAR_SPECS = {"air_conditioning": "Air Condition", "car_seat" : "Car Seat", "pets_allowed": "Pets Allowed", "smoking_allowed": "Smoke Allowed", "snacks": "Snacks", "water": "Water", "wifi": "Wifi"};

export const HOURS = () => {
    var times = [];
    for (var i = 1; i < 24; i++) times.push(("0" + i).slice(-2));
    return times;
};

export const MINUTES = () => {
    var times = [];
    for (var i = 0; i < 60; i++) times.push(("0" + i).slice(-2));
    return times;
};
