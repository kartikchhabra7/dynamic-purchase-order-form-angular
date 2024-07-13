# Dynamic Purchase Order Form

This Angular application is designed to handle dynamic purchase orders with a focus on proper form validation and dynamic form handling. The application includes a comprehensive purchase section and a talent section where users can dynamically add multiple form fields.

## Features

### Purchase Section
1. **Validation:**
   - All fields in the purchase section have validation.
   - Required fields to ensure data completeness.
   - Max length limit for the budget field.

2. **Order Type Specific Behavior:**
   - If the order type is set to "Group PO", a button is displayed.
   - This button allows users to add dynamic form fields in the talent section.

### Talent Section
1. **Dynamic Form Fields:**
   - Users can create multiple form fields dynamically.
   - Each form field includes various input fields such as job title, job ID, contact duration, bill rate, etc.

2. **Checkbox for Validation:**
   - A checkbox is available to toggle validation for certain fields.
   - When checked, additional fields such as contact duration, bill rate, currency, standard time BR, and over time BR become required.

3. **Field Removal:**
   - Each dynamic form field includes a checkbox to remove the field.

### Custom Validation
1. **Maximum Character Limit:**
   - The budget field includes a custom validation for maximum characters allowed.

2. **Date Validation:**
   - Custom validation ensures that the start and end dates are not the same.
   - End date must always be later than the start date.

### Fully Responsive
- The application is fully responsive, ensuring a seamless user experience across various devices and screen sizes.

## Usage

1. **Add Talent Detail:**
   - Click the button to add a new talent detail form.

2. **Remove Talent Detail:**
   - Check the checkbox next to the form field you wish to remove.

3. **Submit Form:**
   - On submitting, the form data is displayed in each field in read-only mode.
   - To reset the form, click the reset button which clears all fields and resets the form.
