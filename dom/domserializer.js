// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class DomSerializer {
    constructor() {
        Object.preventExtensions(this);
    }

    serialize(node) {
        if (node instanceof Element) {
            var result = "<" + node.tagName;
            for (var entry of node.getAttributes())
                result += " " + entry[0] + "=" + "\"" + entry[1] + "\"";
            result += ">";
            result += this.serializeChildren(node);
            result += "</" + node.tagName + ">";
            return result;
        }
        if (node instanceof Text)
            return node.textContent;
        if (node instanceof DocumentFragment)
            return this.serializeChildren(node);
        throw new Error("Unknown node type.");
    }

    serializeChildren(node) {
        var result = "";
        for (var child = node.firstChild; child; child = child.nextSibling)
            result += this.serialize(child);
        return result;
    }
}

Object.preventExtensions(DomSerializer.prototype);
