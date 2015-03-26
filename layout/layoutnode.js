// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class LayoutNode {
    constructor(style) {
        this.style = style;
        this.children = [];
        this.layout = {
            width: 0,
            height: 0,
            top: 0,
            left: 0,
        };
    }

    get debugName() {
        throw new Error("No debug name.");
    }

    serialize() {
        var result = "<" + this.debugName +
            " width=" + this.layout.width +
            " height=" + this.layout.height + 
            " top=" + this.layout.top +
            " left=" + this.layout.left;

        if (!this.children.length)
            return result + " />";
        else
            result += ">";

        this.children.forEach(function(child) {
            result += child.serialize();
        });
        result += "</" + this.debugName + ">";
        return result;
    }
}

Object.preventExtensions(LayoutNode.prototype);
