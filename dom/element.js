// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

(function(exports) {

var emptyAttributes = new Map();

class Element extends ParentNode {
    constructor(tagName, attributes, children) {
        super(children);
        this._tagName = String(tagName);
        this._attributes = emptyAttributes;
        this._style = null;
        // Object.preventExtensions(this);
        if (attributes) {
            for (var pair of attributes)
                this.setAttribute(pair[0], pair[1]);
        }
    }

    get tagName() {
        return this._tagName;
    }

    setAttribute(name, value) {
        if (this._attributes === emptyAttributes)
            this._attributes = new Map();
        this._attributes.set(String(name), String(value));
    }

    getAttribute(name) {
        return this._attributes.get(String(name)) || "";
    }

    removeAttribute(name) {
        this._attributes.delete(String(name));
    }

    getAttributes() {
        return this._attributes.entries();
    }

    hasAttributes() {
        return this._attributes.size > 0;
    }

    cloneNode(deep) {
        var clone = new Element(this.tagName, this.getAttributes());
        if (deep) {
            for (var child = this.firstChild; child; child = child.nextSibling)
                clone.append(child.cloneNode(true));
        }
        return clone;
    }

    get style() {
        if (!this._style)
            this._style = new Style();
        return this._style;
    }

    createLayoutNode() {
        return new LayoutBox(this.tagName, this.style);
    }
}

// Object.preventExtensions(Element.prototype);

exports.Element = Element;

})(this);
