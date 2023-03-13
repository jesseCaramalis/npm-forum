// this utility function accepts a date string from the API and returns an array of strings containing the day, month and year, respectively.
// it is used in the Post and Comment components to display the date of the post in the desired format.

const parseDate = (dateString: string): [string, string, string] => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
  
    return [day, month, year];
  };

export default parseDate;
