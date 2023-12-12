function searchData() {
    // Fetch selected details
    var region = $('#selectRegion').val();
    var site = $('#selectSite').val();
    var date = $('#datepicker').val();

    // Check if all fields are filled
    if (!region || !site || !date) {
        alert('Please select Region, Site, and Date before searching.');
        return;
    }

    // Update details section
    $('#regionDetail').text(region);
    $('#siteDetail').text(site);
    $('#dateDetail').text(date);

    // Simulate fetching data (replace this with actual AJAX call)
    var simulatedData = '<table><thead><tr><th>Column 1</th><th>Column 2</th></tr></thead><tbody><tr><td>Data 1</td><td>Data 2</td></tr></tbody></table>';

    // Open a new window with the data
    var newWindow = window.open('', '_blank');
    newWindow.document.write('<html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Search Result</title>');
    newWindow.document.write('<style>');
    newWindow.document.write('body { font-family: "Arial", sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; height: 100vh; }');
    newWindow.document.write('.scrollable-container { width: 80%; overflow-x: auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px; background-color: #fff; margin-top: 20px; padding: 20px; }');
    newWindow.document.write('h3 { color: #333; margin: 10px 0; }');
    newWindow.document.write('ul { list-style: none; padding: 0; margin: 0; }');
    newWindow.document.write('li { margin-bottom: 10px; }');
    newWindow.document.write('li strong { color: #007BFF; }');
    newWindow.document.write('table { width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 20px; }');
    newWindow.document.write('th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }');
    newWindow.document.write('th { background-color: #f8f8f8; }');
    newWindow.document.write('</style>');
    newWindow.document.write('</head><body>');
    newWindow.document.write('<div class="scrollable-container">');
    newWindow.document.write('<h3>Searched details:</h3>');
    newWindow.document.write('<ul>');
    newWindow.document.write('<li><strong>Region:</strong> ' + region + '</li>');
    newWindow.document.write('<li><strong>Site:</strong> ' + site + '</li>');
    newWindow.document.write('<li><strong>Date:</strong> ' + date + '</li>');
    newWindow.document.write('</ul>');
    newWindow.document.write('<table><thead><tr>');
    // ใส่ column headers ที่ได้จาก column_names
    newWindow.document.write('<tr>');
    for (var i = 0; i < column_names.length; i++) {
        newWindow.document.write('<th>' + column_names[i] + '</th>');
    }
    newWindow.document.write('</tr></thead><tbody>');
    // ใส่ข้อมูลแต่ละแถวที่ได้จาก data
    for (var i = 0; i < data.length; i++) {
        newWindow.document.write('<tr>');
        for (var j = 0; j < data[i].length; j++) {
            newWindow.document.write('<td>' + data[i][j] + '</td>');
        }
        newWindow.document.write('</tr>');
    }
    newWindow.document.write('</tbody></table></div></body></html>');
    newWindow.document.close();
}
