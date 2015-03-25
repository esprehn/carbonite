// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

class Node {
    constructor(ownerDocument) {
        this._parentNode = null;
        this._nextSibling = null;
        this._previousSibling = null;
        this._ownerDocument = ownerDocument || null;
    }

    get parentNode() {
        return this._parentNode;
    }

    get parentElement() {
        if (this.parentNode instanceof Element)
            return this.parentNode;
        return null;
    }

    get previousSibling() {
        return this._previousSibling;
    }

    get nextSibling() {
        return this._nextSibling;
    }

    get previousElementSibling() {
        for (var sibling = this.previousSibling; sibling; sibling = sibling.previousSibling) {
            if (sibling instanceof Element)
                return sibling;
        }
        return null;
    }

    get nextElementSibling() {
        for (var sibling = this.nextSibling; sibling; sibling = sibling.nextSibling) {
            if (sibling instanceof Element)
                return sibling;
        }
        return null;
    }

    get ownerDocument() {
        return this._ownerDocument;
    }

    get textContent() {
        var buffer = "";
        for (var child = this.firstChild; child; child = child.nextSibling)
            buffer += child.textContent;
        return buffer;
    }

    contains(other) {
        while (other && other != this)
            other = other.parentNode;
        return other === this;
    }

    cloneNode(deep) {
        throw new Error("Cannot clone node.");
    }

    before(node) {
        if (!this.parentNode)
            return;
        if (node.contains(this))
            throw new Error("HierarchyRequestError");
        node.remove();
        node._nextSibling = this;
        node._previousSibling = this.previousSibling;
        if (this.previousSibling)
            this.previousSibling._nextSibling = node;
        node._parentNode = this.parentNode;
        this._previousSibling = node;
        if (this.parentNode.firstChild == this)
            this.parentNode._firstChild = node;
        return node;
    }

    after(node) {
        if (!this.parentNode)
            return;
        if (node.contains(this))
            throw new Error("HierarchyRequestError");
        node.remove();
        node._previousSibling = this;
        node._nextSibling = this.nextSibling;
        if (this.nextSibling)
            this.nextSibling._previousSibling = node;
        node._parentNode = this.parentNode;
        this._nextSibling = node;
        if (this.parentNode.lastChild == this)
            this.parentNode._lastChild = node;
        return node;
    }

    replaceWith(node) {
        if (!this.parentNode)
            return;
        this.before(node);
        this.remove();
        return node;
    }

    remove() {
        if (!this.parentNode)
            return;
        if (this.nextSibling)
            this.nextSibling._previousSibling = this._previousSibling;
        if (this.previousSibling)
            this.previousSibling._nextSibling = this._nextSibling;
        this._parentNode = null;
        this._nextSibling = null;
        this._previousSibling = null;
    }
}
