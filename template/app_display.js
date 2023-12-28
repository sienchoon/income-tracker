//app_display.js

document.addEventListener('DOMContentLoaded', function () {
    const incomeInput = document.getElementById('income');
    const dateInput = document.getElementById('date');
    const jobSelect = document.getElementById('jobSelect');
    const otherJobInputBox = document.getElementById('otherJobInputBox');
    const otherJobInput = document.getElementById('otherJob');
    // const incomeList = document.getElementById('income-list');
    const incomeTable = document.getElementById('income-table');
    const incomeTableBody = document.getElementById('income-table-body'); 
    const addButton = document.getElementById('add-income');
    const exportButton = document.getElementById('export-data');

        // Function to toggle the visibility of the otherJobInputBox based on the selected value
        function toggleOtherJobInput() {
            const selectedJob = jobSelect.value;
            if (selectedJob === 'Other') {
                otherJobInputBox.style.display = 'block';
            } else {
                otherJobInputBox.style.display = 'none';
            }
        }

        // Attach the toggleOtherJobInput function to the change event of the jobSelect element
        jobSelect.addEventListener('change', toggleOtherJobInput);

    // Initialize an empty object to store monthly incomes by job
    const monthlyIncomesByJob = {};

        addButton.addEventListener('click', function () {
        const incomeValue = parseFloat(incomeInput.value.trim());
        const dateValue = dateInput.value.trim();
        let jobValue;

        if (jobSelect.value === 'Other') {
            // Use the value from the otherJobInput if 'Other' is selected
            jobValue = otherJobInput.value.trim();
        } else {
            jobValue = jobSelect.value.trim();
        }

        if (!incomeValue || isNaN(incomeValue) || !dateValue || !jobValue) {
            alert('Invalid value. Please enter a valid income and fill in all fields.');
            return;
        }

        // Update the monthlyIncomesByJob object
        const monthYear = new Date(dateValue).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const key = `${monthYear}-${jobValue}`;

        if (monthlyIncomesByJob[key]) {
            monthlyIncomesByJob[key] += incomeValue;
        } else {
            monthlyIncomesByJob[key] = incomeValue;
        }


        // THIS CODE FOR LISTING INCOMES-----------------------------------------------------------------------------------------------
        // const listItem = document.createElement('li');
        // listItem.textContent = `Income: $${incomeValue.toFixed(2)}, Date: ${dateValue}, Job: ${jobValue}`;
        // incomeList.appendChild(listItem);

        // incomeInput.value = '';
        // dateInput.value = '';
        // jobSelect.value = '';
        //--------------------------------------------------------------------------------------------------------------------------------

        // Create a new row in the table
        const newRow = incomeTableBody.insertRow();
        
        // Add cells to the row
        // const indexCell = newRow.insertCell(0);
        const dateCell = newRow.insertCell(0);
        const incomeCell = newRow.insertCell(1);
        const jobCell = newRow.insertCell(2);

        // Assign values to the cells
        // indexCell.textContent = incomeTableBody.children.length;
        incomeCell.textContent = `$${incomeValue.toFixed(2)}`;
        dateCell.textContent = monthYear;
        jobCell.textContent = jobValue;

        incomeInput.value = '';
        dateInput.value = '';
        jobSelect.value = '';
        otherJobInput.value = ''; // Clear the otherJobInput value
    });

 
// // export the data when it is in the list format <ol> tag
// exportButton.addEventListener('click', function () {
//     // Create a string with the content and indices
//     let content = '';
//     const items = incomeList.children;

//     for (let i = 0; i < items.length; i++) {
//         content += `${i + 1}. ${items[i].textContent}\n`;
//     }
//     // Create a Blob with the content
//     const blob = new Blob([content], { type: 'text/plain' });

//     // Create a link element
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);

//     // Set the filename for the download
//     link.download = 'income_data.txt';

//     // Append the link to the document
//     document.body.appendChild(link);

//     // Trigger a click on the link to start the download
//     link.click();

//     // Remove the link from the document
//     document.body.removeChild(link);

//     });
// });

exportButton.addEventListener('click', function () {
    console.log('Button clicked!'); 
    // Create a string with the content and indices from the table
    let content = 'Date\tIncome\tJob\n'; // Add column headers

    const rows = incomeTableBody.children;
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        const date = cells[0].textContent;
        const income = cells[1].textContent.slice(1); // Remove the "$" sign
        const job = cells[2].textContent;

        content += `${date}\t${income}\t${job}\n`;
    }

        // Create a data URI for the text file
        const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);

        // Create a link element
        const link = document.createElement('a');
        link.href = dataUri;

        // Set the filename for the download
        link.download = 'income_data.txt';

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger a click on the link to start the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    });
});