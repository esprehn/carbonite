// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

describe("DocumentFragment", function() {
    it("should accept children in the constructor", function() {
        var e1 = new Element("e1");
        var e2 = new Element("e2");
        var e3 = new Element("e3");
        var root = new DocumentFragment([e1, e2, e3]);
        assert.equal(root.firstChild, e1);
        assert.equal(root.lastChild, e3);
        assert.deepEqual(root.getChildNodes(), [e1, e2, e3]);
        assert.deepEqual(root.getChildElements(), [e1, e2, e3]);
    });
    it("should allow cloning", function() {
        var fragment = new DocumentFragment([new Text("test")]);
        var clone = fragment.cloneNode();
        assert.notEqual(clone, fragment);
        assert.isNull(clone.firstChild);
    });
    it("should allow deep cloning", function() {
        var root = new DocumentFragment([
            new Text("Hello"),
            new Element("span", null, [
                new Text("World"),
            ]),
        ]);
        var clone = root.cloneNode(true);
        assert.notEqual(clone, root);
        var serializer = new DomSerializer();
        assert.equal(serializer.serialize(clone), 'Hello<span>World</span>');
    });
});
