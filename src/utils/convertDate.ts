


export const dateConvert = (dateValue: string) => {
    const date = new Date(dateValue);

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };

    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
};
