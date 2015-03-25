// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

describe("DOMSerializer", function() {
    it("should create a string from a dom tree", function() {
        var tree = new Element("div", null, [
            new Element("span", [["id", "a"]], [new Text("Hello")]),
            new Element("span", [["id", "b"]], [new Text("World")]),
            new Element("section", null, [
                new Text("Today"),
                new Element("ul", [
                    ["class", "list red"],
                    ["id", "my-id"],
                ], [
                    new Element("li", null, [new Text("Bea")]),
                    new Element("li", null, [new Text("uti")]),
                    new Element("li", null, [new Text("ful")]),
                ]),
            ]),
        ]);
        var serializer = new DOMSerializer();
        assert.equal(serializer.serialize(tree), '<div><span id="a">Hello</span><span id="b">World</span><section>Today<ul class="list red" id="my-id"><li>Bea</li><li>uti</li><li>ful</li></ul></section></div>');
    });
});
