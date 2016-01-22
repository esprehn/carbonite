// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class LayoutNode {
    constructor(style) {
        this.style = style;
        this.rect = new LayoutRect();
        this.children = [];
    }

    get debugName() {
        throw new Error("No debug name.");
    }

    serialize() {
        var result = "<" + this.debugName +
            " width=" + (this.rect.width || 0) +
            " height=" + (this.rect.height || 0) +
            " top=" + this.rect.top +
            " left=" + this.rect.left;

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
