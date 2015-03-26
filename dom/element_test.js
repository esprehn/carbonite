// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

describe("Element", function() {
    it("should have an immutable tag name", function() {
        var element = new Element("div");
        assert.equal(element.tagName, "div");
        assert.throws(function() {
            element.tagName = "test";
        });
    });
    it("should convert tag name to string", function() {
        var element = new Element(["a","b"]);
        assert.equal(element.tagName, "a,b");
    });
    it("should accept attributes in the constructor", function() {
        var element = new Element("div", [
            ["id", "test"],
            ["class", "foo-bar baz"],
        ]);
        assert.equal(element.getAttribute("id"), "test");
        assert.equal(element.getAttribute("class"), "foo-bar baz");
    });
    it("should accept children in the constructor", function() {
        var e1 = new Element("e1");
        var e2 = new Element("e2");
        var e3 = new Element("e3");
        var root = new Element("div", null, [e1, e2, e3]);
        assert.equal(root.firstChild, e1);
        assert.equal(root.lastChild, e3);
        assert.deepEqual(root.getChildNodes(), [e1, e2, e3]);
        assert.deepEqual(root.getChildElements(), [e1, e2, e3]);
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
    it("should convert attribute names and values to strings", function() {
        var element = new Element("div", [[/(?:)/, [1,2]]]);
        assert.equal(element.getAttribute(/(?:)/), "1,2")
        element.setAttribute(["hidden"], true);
        assert.equal(element.getAttribute("hidden"), "true");
        element.setAttribute({hidden: true}, [1, 2, 3]);
        assert.equal(element.getAttribute("[object Object]"), "1,2,3");
        assert.equal(element.getAttribute({hidden: true}), "1,2,3");
        element.removeAttribute({hidden: true})
        assert.isUndefined(element.getAttribute("[object Object]"));
    });
    it("should allow getting all attributes", function() {
        var attributes = [
            ["foo", "bar"],
            ["baz", "bam"]
        ];
        var element = new Element("div", attributes);
        var result = [];
        for (let attr of element.getAttributes())
            result.push(attr);
        assert.deepEqual(result, attributes);
    });
    it("should allow cloning", function() {
        var element = new Element("div", [["id", "foo"]]);
        var clone = element.cloneNode();
        assert.equal(clone.tagName, "div");
        assert.equal(clone.getAttribute("id"), "foo");
        assert.notEqual(clone, element);
    });
    it("should allow deep cloning", function() {
        var root = new Element("div", [["id", "foo"]], [
            new Text("Hello"),
            new Element("span", null, [
                new Text("World"),
            ]),
        ]);
        var clone = root.cloneNode(true);
        assert.notEqual(clone, root);
        var serializer = new DomSerializer();
        assert.equal(serializer.serialize(clone), '<div id="foo">Hello<span>World</span></div>');
    });
    it("should get the children as an array", function() {
        var e1 = new Element("e1");
        var t2 = new Text("not an element");
        var e3 = new Element("e3");
        var root = new Element("div", null, [e1, t2, e3]);
        assert.deepEqual(root.getChildNodes(), [e1, t2, e3]);
        assert.deepEqual(root.getChildElements(), [e1, e3]);
    });
    it("should allow tree traversal", function() {
        var e1 = new Element("e1");
        var t2 = new Text("not an element");
        var e3 = new Element("e3");
        var root = new Element("div", null, [e1, t2, e3]);
        assert.equal(e1.parentNode, root);
        assert.equal(t2.parentNode, root);
        assert.equal(e3.parentNode, root);
        assert.equal(root.firstChild, e1);
        assert.equal(e1.nextSibling, t2);
        assert.equal(t2.nextSibling, e3);
        assert.isNull(e3.nextSibling);
        assert.equal(root.lastChild, e3);
        assert.equal(e3.previousSibling, t2);
        assert.equal(t2.previousSibling, e1);
        assert.isNull(e1.previousSibling);
        assert.isNull(e1.previousElementSibling);
        assert.equal(t2.previousElementSibling, e1);
        assert.equal(e3.previousElementSibling, e1);
        assert.equal(e1.nextElementSibling, e3);
        assert.equal(t2.nextElementSibling, e3);
        assert.isNull(e3.nextElementSibling);
    });
    it("should create a layout tree", function() {
        var parser = new DomParser("<div><span>Hello</span><span>World</span></div>");
        var fragment = parser.parse();
        var root = fragment.firstChild;
        var tree = root.createLayoutTree();
        assert.instanceOf(tree, LayoutBox);
        assert.instanceOf(tree.children[0].children[0], LayoutText);
        assert.instanceOf(tree.children[0].children[0].style, Style);
        assert.equal(tree.children[0].children[0].style, tree.children[0].style);
        assert.equal(tree.serialize(),
                "<box(div) width=0 height=0 top=0 left=0>" + 
                    "<box(span) width=0 height=0 top=0 left=0>" +
                        "<#text width=0 height=0 top=0 left=0 />" +
                    "</box(span)>" +
                    "<box(span) width=0 height=0 top=0 left=0>" +
                        "<#text width=0 height=0 top=0 left=0 />" +
                    "</box(span)>" +
                "</box(div)>");
    });
});
