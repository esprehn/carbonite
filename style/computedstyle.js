// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class ComputedStyle {
    constructor() {
        // Box size
        this.width = "auto";
        this.height = "auto";
        this.left = "auto";
        this.right = "auto";
        this.top = "auto";
        this.bottom = "auto";

        // Margins
        this.margin = 0;
        this.marginLeft = 0;
        this.marginRight = 0;
        this.marginTop = 0;
        this.marginBottom = 0;

        // Padding
        this.padding = 0;
        this.paddingLeft = 0;
        this.paddingRight = 0;
        this.paddingTop = 0;
        this.paddingBottom = 0;

        // Borders
        this.borderWidth = 0;
        this.borderLeftWidth = 0;
        this.borderRightWidth = 0;
        this.borderTopWidth = 0;
        this.borderBottomWidth = 0;

        // Positioning
        this.position = "relative";

        // Flex
        this.flexDirection = "column";
        this.justifyContent = "flex-start";
        this.alignItems = "stretch";
        this.alignSelf = "stretch";
        this.flex = 0;
        this.flexWrap = "nowrap";

        Object.preventExtensions(this);
    }
}

Object.preventExtensions(ComputedStyle.prototype);
