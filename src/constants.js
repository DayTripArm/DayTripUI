export const TRAVELER_TYPE = "1";
export const DRIVER_TYPE = "2";

export const PERSONAL = "PERSONAL";
export const LOGIN = "LOGIN";
export const PAYMENTS = "PAYMENTS";

export const STRING_NUMBERS = ["First", "Second", "Third", "Fourth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"];

export const GENDER_LIST = ["Male", "Female"];

export const LANGUAGES = ["Chinese", "Spanish", "French", "English", "Hindi", "Arabic", "Armenian", "Russian", "Japanese"];
export const LOCATIONS = ["Yerevan", "Gyumri", "Vanadzor", "Vagharshapat", "Abovyan", "Kapan", "Hrazdan", "Armavir", "Dilidjan", "Artashat", "Ijevan", "Sevan", "Charentsavan", "Masis", "Ararat", "Goris", "Gavar", "Ashtarak", "Yeghegnadzor", "Caxkadzor", "Yeghvard", "Agarak", "Alaverdi", "Axtala", "Ayrum", "Aparan", "Artik", "Berd",
                          "Byureghavan", "Chambarak", "Maralik", "Martuni", "Mecamor", "Meghri", "Noyemberyan", "Shamlux", "Jermuk", "Sisian", "Spitak", "Stepanavan", "Vayq", "Vardenis", "Vedi", "Tashir", "Kajaran"];

export const MONTH_LIST = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const DAYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

export const GET_DATE_YEARS = () => {
    let date = new Date();
    const year_list = [];
    for (var i = 1900; i <= date.getFullYear(); i++) year_list.push(i);
    return year_list;
};


export const CAR_TYPE_LIST  = ["Sedan", "Hatchback", "Wagon", "Coupe", "Convertible", "SUV", "Pickup Truck", "Van"];
export const COLOR_LIST = ["Black", "Blue", "Brown", "Gold", "Gray", "Green", "Orange", "Purple", "Red", "Silver", "Tan", "White", "Yellow"];
export const CAR_YEAR_LIST = () => {
    let date = new Date();
    const year_list = [];
    for (var i = 1980; i <= date.getFullYear(); i++) year_list.push(i);
    return year_list;
};
