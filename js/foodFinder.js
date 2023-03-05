let restaurants = null;

async function createFoodList() {

    let restaurants = null;

    await $.getJSON("data/foodFinder.json", function (result)
    {
        restaurants = result.restaurants;
    });

    for (let i = 0; i < restaurants.length; i++) {

        let id = "row_" + i;

        let html =
            '<tr id="' + id + '">' +
            '<td>' + restaurants[i].id + '</td>' +
            '<td>' + restaurants[i].name + '</td>' +
            '<td>' + restaurants[i].address + '</td>' +
            '<td>' +
            '<button type="button" class="btn" onclick="removeFood(event)">Remove</button>' +
            '</td>' +
            '</tr>';

        $("#food-list-table").append(html);
    }

}

function removeFood(e) {
    let row = e.target.parentNode.parentNode;
    let rowId = '#' + row.id;

    $(rowId).fadeOut(function () {
        $(rowId).remove();
    });


}

async function pickFoodPlace(e) {

    let tableRows = document.getElementById("food-list-table").rows;

    let idList = [];

    for (let i = 1; i < tableRows.length; i++) {
        idList.push(tableRows[i].firstChild.outerText);
    }

    let foodChoice = Math.floor(Math.random() * idList.length);

    let restaurantId = idList[foodChoice];

    let restaurants = null;

    await $.getJSON("data/foodFinder.json", function (result)
    {
        restaurants = result.restaurants;
    });

    let restaurant = restaurants[restaurantId - 1];
    let html = "";

    try {
        html =
            '<div style="display: grid">' +
            '<h2 id="locationName">' + restaurant.name + '</h2>' +
            '<label for="address">Address:</label>' +
            '<a id="address" href="' + restaurant.mapLink + '" target="_blank" rel="noopener noreferrer">' +
            restaurant.address + '</a>' +
            '<a id="website" href="' + restaurant.website + '">Website</a>' +
            '<a id="menu" href="' + restaurant.menu+ '">Menu</a>' +
            '<label for="phone">Phone:</label    <span id="phone">' + restaurant.phoneNumber + '</span>' +
            '</div>'
        ;

    }
    catch (e) {
        console.log("There are no places in the list. You must refresh the page to refill the list.")
        return;
    }

    $("body").append(html)

}

/*
async function pickFoodPlace(e) {

    let tableRows = document.getElementById("foodListTable").rows;

    let idList = [];

    for (let i = 0; i < tableRows.length; i++) {
        idList.push(tableRows[i].firstChild.outerText);
        //console.log((tableRows[i].childNodes[0]));
    }

    let foodChoice = Math.floor(Math.random() * (idList.length - 1)) + 1;

    //console.log(idList[foodChoice]);

    let restaurantId = tableRows[foodChoice].childNodes[0].outerText;
    let restaurants = null;

    await $.getJSON("data/foodFinder.json", function (result)
    {
        restaurants = result.restaurants;
    });

    let restaurant = restaurants[restaurantId];
    console.log(restaurant);

    let html =
        '<div>' +
        '<h2 id="locationName">' + tableRows[foodChoice].childNodes[1].outerText + '</h2>' +
        '<label for="address">Address:</label>' +
       '<span id="address">' + tableRows[foodChoice].childNodes[2].outerText + '</span>' +
        '<label for="website">Website:</label>' +
        '<span id="website">Default Website</span>' +
        '<label for="menu">Menu:</label> <span id="menu">Default Menu</span>' +
        '<label for="phone">Phone:</label    <span id="phone">Default Phone</span>' +
        '</div>'
    ;

    $("body").append(html)

}

 */