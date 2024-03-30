const mixin = {
    updateDateFormat: (dateString:string) => {
        // Input date string in the format "YYYY-MM-DD"
// Create a Date object from the input date string
const dateObject = new Date(dateString);

// Get the time in milliseconds since the Unix epoch
const updatedFormat = dateObject.getTime();
return updatedFormat

    }
}

export default mixin;