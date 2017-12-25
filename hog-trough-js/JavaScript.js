/*jslint browser, devel, es6, maxlen: 80, this*/
/*global $, jQuery*/

(function () {
    "use strict";

    const restaurants = (function ($) {
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
        let ordersArr = [];

        function add(newOrder) {
            ordersArr.push(newOrder);
        }

        function display(formDataObj) {
            $("table tbody").append(
                "<tr>" +
                "<td>" + 1 + "</td>" +
                "<td>" + "Griffin,Kevin" + "</td>" +
                "<td>" + formDataObj.orderText + "</td>" +
                "<td>" + formDataObj.orderPrice + "</td>" +
                "<td>" + formDataObj.orderPrice * 0.07 + "</td>" +
                "<td>" + formDataObj.orderPrice + "</td>" +
                "</tr>"
            );

            $("table").show();
        }

        return {
            add,
            display
        };

    }());

    const enterEdit = (function ($, restaurants) {
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
                    orders.display(formObj);
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
        $("button#newGroupOrder").click(enterEdit.displayForm);
    });

}());