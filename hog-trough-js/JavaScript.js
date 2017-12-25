/*jslint browser, devel, es6, maxlen: 80, this*/
/*global $, jQuery*/

(function () {
    "use strict";

    const restaurants = (function () {
        const restaurantsObj = {
            "--TBD--": "https://www.google.com/",
            "BERTUCCI'S": "http://www.bertuccis.com/",
            "PAPA GINOS": "https://www.papaginos.com/menu"
        };

        function changeUrl() {
            $("form#newGroupOrder a").attr(
                "href",
                restaurantsObj[this.value]
            );
        }

        function get() {
            return restaurantsObj;
        }

        return {
            changeUrl,
            get
        };

    }());

    const orders = (function () {
        let ordersArr = [];

        function add(newOrder) {
            ordersArr.push(newOrder);
        }

        function display(formDataObj) {
            let iter = [];
            let orderPrice = 0;
            let orderTotal = 0;
            let str = "a";
            let tax = 0;
            iter = str.repeat(+formDataObj.numberOfOrders).split("");
            $("table caption").text(formDataObj.restaurant);
            iter.forEach(function (ignore, index) {
                $("table tbody").append(
                    "<tr>" +
                    "<td>" + (index + 1) + "</td>" +
                    "<td></td>" +
                    "<td></td>" +
                    "<td></td>" +
                    "<td></td>" +
                    "<td></td>" +
                    "</tr>"
                );
            });

            orderPrice = Number(formDataObj.orderPrice);
            tax = orderPrice * 0.07;
            orderTotal = orderPrice + tax;

            $("table tbody tr:eq(0) td:eq(1)").text("Griffin,Kevin");
            $("table tbody tr:eq(0) td:eq(2)").text(formDataObj.orderText);
            $("table tbody tr:eq(0) td:eq(3)").text(
                orderPrice.toLocaleString(
                    "en-US",
                    {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )
            );
            $("table tbody tr:eq(0) td:eq(4)").text(
                tax.toLocaleString(
                    "en-US",
                    {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )
            );
            $("table tbody tr:eq(0) td:eq(5)").text(
                orderTotal.toLocaleString(
                    "en-US",
                    {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )
            );

            $("table").show();
        }

        return {
            add,
            display
        };

    }());

    const enterEdit = (function () {
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
                $("form#newGroupOrder").submit(
                    function (event) {
                        event.preventDefault();
                        $("form#newGroupOrder").hide();
                        $("button#newGroupOrder").show();
                        formArr = $("form#newGroupOrder").serializeArray();
                        formObj = formArr.reduce(formArrToObj, {});
                        orders.display(formObj);
                    }
                );
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

    }());

    // onload
    $(function driver() {
        $("button#newGroupOrder").click(enterEdit.displayForm);
    });

}());