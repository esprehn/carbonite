// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

describe("LayoutBox", function() {
    it("should default to zero size", function() {
        var box = new LayoutBox("div", new Style());
        assert.deepEqual(box.layout, {
            width: 0,
            height: 0,
            top: 0,
            left: 0,
        });
    });
});
