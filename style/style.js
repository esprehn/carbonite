// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

// TODO(esprehn): css-layout library inspects the Style objects using the "in"
// operator so they need to be property bags with varying style properties
// instead of a fixed structure like below.
//
// https://github.com/facebook/css-layout/issues/64
//
class Style {
    constructor() {
        // Fonts.
        this.fontStyle = "normal";
        this.fontVariant = "normal";
        this.fontWeight = "normal";
        this.fontSize = 11;
        this.lineHeight = "normal";
        this.fontFamily = "Helvetica, sans-serif";

        // The below properties can't be here by default because the css-layout
        // library checks them with the "in" operator.

        // Box size.
        // this.width = 0;
        // this.height = 0;
        // this.left = 0;
        // this.right = 0;
        // this.top = 0;
        // this.bottom = 0;

        // Margins
        // this.margin = 0;
        // this.marginLeft = 0;
        // this.marginRight = 0;
        // this.marginTop = 0;
        // this.marginBottom = 0;

        // Padding
        // this.padding = 0;
        // this.paddingLeft = 0;
        // this.paddingRight = 0;
        // this.paddingTop = 0;
        // this.paddingBottom = 0;

        // Borders
        // this.borderWidth = 0;
        // this.borderLeftWidth = 0;
        // this.borderRightWidth = 0;
        // this.borderTopWidth = 0;
        // this.borderBottomWidth = 0;

        // Positioning
        // this.position = "relative";

        // Flex
        // this.flexDirection = "column";
        // this.justifyContent = "flex-start";
        // this.alignItems = "stretch";
        // this.alignSelf = "stretch";
        // this.flex = 0;
        // this.flexWrap = "nowrap";

        // Can't freeze this object, css-layout library expects a property bag.
        // Object.preventExtensions(this);
    }

    createCanvasFont() {
        return this.fontStyle + " " +
            this.fontVariant + " " +
            this.fontWeight + " " +
            this.fontSize + "px/" +
            this.computedLineHeight + "px " +
            this.fontFamily;
    }

    get computedLineHeight() {
        if (this.lineHeight == "normal")
            return this.fontSize * 1.2;
        return this.lineHeight;
    }

    clone() {
        var result = new Style();
        for (var key in this) {
            result[key] = this[key];
        }
        return result;
    }
}

Object.preventExtensions(Style.prototype);
