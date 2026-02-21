let booksJSON = [];
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "task8.xml",
        dataType: "xml",
        success: function (xml) {
            convertXMLtoJSON(xml);
            fillGenreDropdown();
            displayTable(booksJSON);
        },
        error: function () {
            alert("Error loading XML file!");
        }
    });

    $("#applyFilter").click(function () {
        applyFilters();
    });
});

function convertXMLtoJSON(xml) {
    $(xml).find("book").each(function () {
        let book = {
            title: $(this).find("title").text(),
            author: $(this).find("author").text(),
            genre: $(this).find("genre").text(),
            price: parseFloat($(this).find("price").text()),
            date: $(this).find("date").text()
        };

        booksJSON.push(book);
    });

    console.log("Converted JSON:", booksJSON);
}

function fillGenreDropdown() {
    let genres = new Set();

    booksJSON.forEach(book => {
        genres.add(book.genre);
    });

    genres.forEach(genre => {
        $("#genreFilter").append(`<option value="${genre}">${genre}</option>`);
    });
}

function displayTable(data) {
    let tbody = $("#bookTable tbody");
    tbody.empty();

    if (data.length === 0) {
        tbody.append("<tr><td colspan='5'>No books found</td></tr>");
        return;
    }

    data.forEach(book => {
        let row = `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.price}</td>
                <td>${book.date}</td>
            </tr>
        `;
        tbody.append(row);
    });
}

function applyFilters() {
    let selectedGenre = $("#genreFilter").val();
    let authorText = $("#authorFilter").val().toLowerCase();
    let minPrice = $("#minPriceFilter").val();
    let maxPrice = $("#priceFilter").val();

    let filteredBooks = booksJSON.filter(book => {

        let genreMatch = (selectedGenre === "all" || book.genre === selectedGenre);

        let authorMatch = (authorText === "" || book.author.toLowerCase().includes(authorText));

        let minPriceMatch = (minPrice === "" || book.price >= parseFloat(minPrice));

        let maxPriceMatch = (maxPrice === "" || book.price <= parseFloat(maxPrice));

        return genreMatch && authorMatch && minPriceMatch && maxPriceMatch;
    });

    displayTable(filteredBooks);
}