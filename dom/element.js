// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class Element extends ParentNode {
    constructor(tagName, attributes, children, ownerDocument) {
        super(children, ownerDocument);
        this._tagName = String(tagName);
        this._attributes = new Map();
        Object.preventExtensions(this);
        if (attributes) {
            attributes.forEach(function(pair) {
                this.setAttribute(pair[0], pair[1]);
            }, this);
        }
    }

    setAttribute(name, value) {
        this._attributes.set(String(name), String(value));
    }

    getAttribute(name) {
        return this._attributes.get(String(name));
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

    get tagName() {
        return this._tagName;
    }
}

Object.preventExtensions(Element.prototype);
