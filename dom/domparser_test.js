// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

describe("DomParser", function() {
    it("should parse a string into a Text", function() {
        var parser = new DomParser("Hello World");
        var fragment = parser.parse();
        var children = fragment.getChildNodes();
        assert.equal(children.length, 1);
        assert.instanceOf(children[0], Text);
        assert.equal(children[0].textContent, "Hello World");
    });
    it("should parse a string into an Element", function() {
        var parser = new DomParser("<div>Hello World</div>");
        var fragment = parser.parse();
        var children = fragment.getChildNodes();
        assert.equal(children.length, 1);
        assert.instanceOf(children[0], Element);
        assert.instanceOf(children[0].firstChild, Text);
        assert.equal(children[0].firstChild.textContent, "Hello World");
    });
    it("should parse attributes on an element", function() {
        var parser = new DomParser("<div id=10 other-bool other='foo' bar=\"baz bizzle\" bool></div>");
        var fragment = parser.parse();
        var children = fragment.getChildNodes();
        assert.equal(children.length, 1);
        var child = children[0];
        assert.instanceOf(child, Element);
        assert.isNull(child.firstChild);
        assert.equal(child.getAttribute("id"), "10");
        assert.equal(child.getAttribute("other"), "foo");
        assert.equal(child.getAttribute("bar"), "baz bizzle");
        assert.equal(child.getAttribute("bool"), "");
        assert.equal(child.getAttribute("other-bool"), "");
    });
    it("should parse children of an element", function() {
        var markup = "<div><span>A</span><span id=\"test\">B</span></div><span>C</span>";
        var parser = new DomParser(markup);
        var fragment = parser.parse();
        var serializer = new DomSerializer();
        assert.equal(serializer.serialize(fragment), markup);
    });
    it("should parse self closing tags", function() {
        var parser = new DomParser("<span/>A<span id=10/ value=20>B<div />C");
        var fragment = parser.parse();
        var serializer = new DomSerializer();
        assert.equal(serializer.serialize(fragment), "<span></span>A<span id=\"10\" value=\"20\">B<div></div>C</span>");
    });
});
