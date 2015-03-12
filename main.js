// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var Element = require("./element");
var Text = require("./text");

var element = new Element("div");
element.setAttribute("id", "root");
var span1 = element.append(new Element("span1"));
span1.append(new Text("Hello"));
var span2 = span1.after(new Element("span2"));
var text = span2.append(new Text("rld"));
text.before(new Text("Wo"));

function toMarkup(node) {
    if (node instanceof Text)
        return node.textContent;
    if (node instanceof Element) {
        var result = "<" + node.tagName;
        for (var entry of node.getAttributes())
            result += " " + entry[0] + "=" + "\"" + entry[1] + "\"";
        result += ">";
        for (var child = node.firstChild; child; child = child.nextSibling)
            result += toMarkup(child);
        result += "</" + node.tagName + ">";
        return result;
    }
    throw new Error("Unknown node type.");
}

console.log(toMarkup(element));
