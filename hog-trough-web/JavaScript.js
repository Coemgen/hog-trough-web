/*jslint browser, devel, es6, maxlen: 80*/
/*global $, jQuery*/

const restaurants = (function () {
    "use strict";
    const restaurantsObj = {
        "BERTUCCI'S": "http://www.bertuccis.com/",
        "PAPA GINOS": "https://www.papaginos.com/menu"
    };

    function get() {
        return restaurantsObj;
    }
    return {
        get
    };
}());

const orders = (function () {
    "use strict";
    let ordersArr = [];

    function add(newOrder) {
        ordersArr.push(newOrder);
    }

    return {
        add
    };
}());

const enterEdit = (function ($, restaurants) {
    "use strict";
    let formArr = [];
    let formObj = {};

    function formArrToObj(total, curVal) {
        total[curVal.name] = curVal.value;
        return total;
    }

    $("select#restaurant").append("<option>--TBD--</option>");
    Object.keys(restaurants.get()).forEach(function (key) {
        $("select#restaurant").append(
            "<option>" + key + "</option>"
        );
    });

    function displayForm() {
        $(function () {
            $("form#newOrder").show();
            $("form#newOrder").submit(function (event) {
                event.preventDefault();
                $("form#newOrder").hide();
                formArr = $("form#newOrder").serializeArray();
                formObj = formArr.reduce(formArrToObj, {});
                debugger;
            });
        });
    }

    function getFormData() {
        return formObj;
    }

    return {
        displayForm,
        getFormData
    };
}(jQuery, restaurants));

// onload
$(function driver() {
    "use strict";
    $("button#newOrder").click(enterEdit.displayForm);
});