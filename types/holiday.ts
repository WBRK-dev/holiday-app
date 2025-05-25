export type HolidayData = {
    title: string;
    schoolyear: string;
    vacations: {
        type: string;
        compulsorydates: boolean;
        regions: HolidayDataDates[];
    }[];
}

export type HolidayDataDates = {
    region: Region;
    startdate: string;
    enddate: string;
};

export type Region = 'noord' | 'midden' | 'zuid';