
function updateStatus(selectElement) {
    const row = selectElement.closest('tr');
    const nameCell = row.cells[0];
    const status = selectElement.value;

    console.log(`${nameCell.textContent} is marked as ${status}`);
}

function downloadAttendance() {
    const rows = document.querySelectorAll('#attendanceList tr');
    let csvContent = "data:text/csv;charset=utf-8,Name,Phone Number,Status\n";

    rows.forEach(row => {
        const name = row.cells[0].textContent;
        const phone = row.cells[1].textContent;
        const status = row.cells[2].querySelector('select').value || 'Not selected';
        csvContent += `${name},${phone},${status}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function sendSms() {
    const rows = document.querySelectorAll('#attendanceList tr');
    const messages = [];

    rows.forEach(row => {
        const name = row.cells[0].textContent;
        const phone = row.cells[1].textContent;
        const status = row.cells[2].querySelector('select').value || 'Not selected';
        messages.push({ name, phone, status });
    });

    try {
        const response = await fetch('/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messages),
        });

        if (response.ok) {
            alert('SMS sent successfully!');
        } else {
            alert('Failed to send SMS.');
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
}
