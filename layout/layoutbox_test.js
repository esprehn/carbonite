// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

describe("LayoutBox", function() {
    it("should default to zero size", function() {
        var box = new LayoutBox("div", new Style());
        assert.deepEqual(box.layout, {
            width: undefined,
            height: undefined,
            top: 0,
            left: 0,
        });
    });
    it("should compute the layout of a box tree", function() {
        var box1 = new LayoutBox("div", new Style());
        var box2 = new LayoutBox("div", new Style());
        var box3 = new LayoutBox("div", new Style());
        box1.style.width = 400;
        box1.style.flexDirection = "row";
        box2.style.flex = 1;
        box2.style.padding = 5;
        box3.style.padding = 5;
        box1.children = [box2, box3];
        box1.updateLayout();
        assert.deepEqual(box1.layout, {
            width: 400,
            height: 10,
            top: 0,
            left: 0,
        });
        assert.deepEqual(box2.layout, {
            width: 390,
            height: 10,
            top: 0,
            left: 0,
        });
        assert.deepEqual(box3.layout, {
            width: 10,
            height: 10,
            top: 0,
            left: 390,
        });
    });
});
