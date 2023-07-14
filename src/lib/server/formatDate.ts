export const  formaterDate = (dateStr: string) => {
    const dateParts = dateStr.split("/");
    const month = parseInt(dateParts[0]) - 1;
    const day = parseInt(dateParts[1]) + 1;
    const year = parseInt(dateParts[2]);

    const date = new Date(year, month, day);
    return date;
  };

