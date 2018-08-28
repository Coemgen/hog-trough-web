/* 
eslint indent: 2, no-unused-vars: "off",
quotes: ["error", "double"], strict: "off" 
*/
/* globals HtmlService */
"use strict";

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

function doGet(e) {
    var filename = "Index";
    var title = "Takeout Orders";
    var tmpl = HtmlService.createTemplateFromFile(filename);
    return tmpl.evaluate().setTitle(title);
}
