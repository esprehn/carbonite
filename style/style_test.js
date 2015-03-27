// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

describe("Style", function() {
    it("should clone all properties", function() {
        var style = new Style();
        style.borderLeftWidth = 10;
        style.fontSize = 12;
        style.color = "red";
        assert.deepEqual(style.clone(), style);
    });
});
