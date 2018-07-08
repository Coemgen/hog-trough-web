/*jshint debug:true*/
/*global jQuery*/

/**
 * @file Hog Trough
 * @version 0.0
 * @author Kevin Griffin <kevin.griffin@gmail.com>
 *
 * @todo Write the documentation.
 * @todo Implement this function.
 */

/**
 * @global
 * @param {Object} $ jQuery reference
 * @returns {Object} public methods and properties
 *
 * {@link http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html Module Pattern}
 * This is an anonymous closure which is the fundamental construct that makes
 * it all possible, and really is the single best feature of JavaScript. We’ll
 * simply create an anonymous function, and execute it immediately. All of the
 * code that runs inside the function lives in a closure, which provides
 * privacy and state throughout the lifetime of our application.
 */
let HT = {};

jQuery(function () { // jQuery ready method
    "use strict";
    HT = (function ($) {
        const restaurant = (function () {
            let json = {
                "--TBD--": "http://www.google.com",
                "BERTUCCI'S": "http://www.bertuccis.com/",
                "PAPA GINOS": "https://www.papaginos.com/menu"
            };
            let get = function () {
                return json;
            };
            return {
                get
            };
        }());

        let utils = {}; // object for public methods and properties
        let privateProperty = "";
        let newGroupOrderHtml = $("#newgrouporder").html();
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let hh = d.getHours();
        let MM = d.getMinutes();
        let utcDate = "";

        // define private methods and properties
        function privateMethod() {
            // TBD
            return "placeholder";
        }
        privateProperty = "placeholder";

        // define public methods and properties
        utils.newGroupOrder = function () {
            $("div#main").html(newGroupOrderHtml);
            Object.entries(restaurant.get()).forEach(
                function (curVal) {
                    $("select#restaurant").append(
                        "<option value=\"" + curVal[0] + "\">" +
                        curVal[0] + "</option>"
                    );
                }
            );
            $("select#restaurant").on(
                "change",
                function () {
                    $("a#menulink").attr(
                        "href",
                        restaurant.get()[
                            $("select#restaurant option:selected").val()
                        ]
                    );
                });
            utcDate = yyyy + "-" +
                mm.toString().padStart(2, "0") + "-" +
                dd.toString().padStart(2, "0") +
                "T" +
                hh.toString().padStart(2, "0") + ":" +
                MM.toString().padStart(2, "0") + ":" +
                "00";
            $("input#orderByTime").val(utcDate);
            $("input#orderPickupTime").val(utcDate);

        };
        utils.property = "placeholder";

        return utils;
    }(jQuery));

});
