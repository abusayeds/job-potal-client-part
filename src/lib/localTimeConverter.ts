// Function to determine whether the system uses a 12-hour or 24-hour format dynamically
function getTimeFormat(): boolean {
    const testDate: Date = new Date(2025, 0, 1, 13, 30); // Test time: 1:30 PM
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

    // Using DateTimeFormat with hour12:true to check if the format includes "AM" or "PM"
    const time12: string = new Intl.DateTimeFormat(navigator.language, options).format(testDate);

    // If the output includes "AM" or "PM", it is a 12-hour format
    return time12.includes('AM') || time12.includes('PM') ? false : true;
}
export const is24HourFormat: boolean = getTimeFormat();

// Function to convert time string to local time in either 12-hour or 24-hour format
export function convertToLocalTime(timeStr: string): string {
    const timeParts: string[] = timeStr.split(' ');
    const [hours, minutes]: string[] = timeParts[0].split(':');
    const amPm: string = timeParts[1];

    // Convert to 24-hour format if AM/PM and is24HourFormat is true
    let hours24: number = parseInt(hours, 10);
    if (amPm === 'PM' && hours24 < 12) {
        hours24 += 12; // Convert PM to 24-hour time
    }
    if (amPm === 'AM' && hours24 === 12) {
        hours24 = 0; // Convert 12 AM to 00:00
    }

    const date: Date = new Date();
    date.setHours(hours24, parseInt(minutes, 10), 0, 0); // Set time on the current date

    // Format time based on whether it's 12-hour or 24-hour format
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: !is24HourFormat, // Set true for 12-hour format, false for 24-hour format
    };

    return new Intl.DateTimeFormat(navigator.language, options).format(date);
}

export const getTimezone = (date: string) => {
    const match = new Date(date).toString().match(/\(([^)]+)\)/);
    return match ? match[1] : '';
}