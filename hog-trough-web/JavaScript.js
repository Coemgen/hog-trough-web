/*jslint browser, devel, es6, maxlen: 80, this*/
/*global $, jQuery*/

const restaurants = (function ($) {
    "use strict";

    const restaurantsObj = {
        "--TBD--": "https://www.google.com/",
        "BERTUCCI'S": "http://www.bertuccis.com/",
        "PAPA GINOS": "https://www.papaginos.com/menu"
    };

    function changeUrl() {
        $("form#newGroupOrder a").attr("href", restaurantsObj[this.value]);
    }

    function get() {
        return restaurantsObj;
    }

    return {
        changeUrl,
        get
    };

}(jQuery));

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

    Object.keys(restaurants.get()).forEach(function (key) {
        $("select#restaurant").append(
            "<option>" + key + "</option>"
        );
    });

    function displayForm() {
        $(function () {
            $("button#newGroupOrder").hide();
            $("form#newGroupOrder").show();
            $("form#newGroupOrder").submit(function (event) {
                event.preventDefault();
                $("form#newGroupOrder").hide();
                $("button#newGroupOrder").show();
                formArr = $("form#newGroupOrder").serializeArray();
                formObj = formArr.reduce(formArrToObj, {});
            });
            $("select#restaurant option").click(restaurants.changeUrl);
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
    $("button#newGroupOrder").click(enterEdit.displayForm);
});