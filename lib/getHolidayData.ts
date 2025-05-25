import { HolidayData } from "@/types/holiday";

export default async function (year: number = 2025): Promise<HolidayData> {
    const response = await fetch(
        `https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/${yearToString(year)}?output=json`
    );

    const data = await response.json();
    return data.content[0] as HolidayData;
}

function yearToString(year: number): string {
    return `${year}-${year + 1}`;
}