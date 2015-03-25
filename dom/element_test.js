// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

describe("Element", function() {
    it("should accept attributes in the constructor", function() {
        var element = new Element("div", [
            ["id", "test"],
            ["class", "foo-bar baz"],
        ]);
        assert.equal(element.getAttribute("id"), "test");
        assert.equal(element.getAttribute("class"), "foo-bar baz");
    });
    it("should allow setting attributes", function() {
        var element = new Element("div");
        assert.isUndefined(element.getAttribute("id"));
        element.setAttribute("id", "the id");
        element.setAttribute("hidden", "true");
        assert.equal(element.getAttribute("id"), "the id");
        assert.equal(element.getAttribute("hidden"), "true");
        element.setAttribute("id", "different value");
        assert.equal(element.getAttribute("id"), "different value");
        assert.equal(element.getAttribute("hidden"), "true");
    });
    it("should allow removing attributes", function() {
        var element = new Element("div");
        assert.isFalse(element.hasAttributes());
        assert.isUndefined(element.getAttribute("name"));
        element.removeAttribute("name");
        element.setAttribute("name", "awesome");
        assert.isTrue(element.hasAttributes());
        assert.equal(element.getAttribute("name"), "awesome");
        element.removeAttribute("name");
        assert.isFalse(element.hasAttributes());
        assert.isUndefined(element.getAttribute("name"));
    });
});
