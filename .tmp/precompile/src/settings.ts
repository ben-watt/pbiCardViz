/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual.testViz0C2A3232231743ADA90718431B35655A  {
    "use strict";
    import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

    export class VisualSettings extends DataViewObjectsParser {
      public dataPoint: dataPointSettings = new dataPointSettings();
      public subTitle: subTitleSettings = new subTitleSettings();
      public icon: icon = new icon();
    }

    export class dataPointSettings {
     // Default color
      public defaultColor: string = "";
     // Show all
      public showAllDataPoints: boolean = true;
     // Fill
      public fill: string = "";
     // Color saturation
      public fillRule: string = "";
     // Text Size
      public fontSize: number = 40;

      public heightOffset: number = 0;
      public widthOffset: number = 0;
      public units: number = 0;
      public decimalPlaces: number = 2;
     }

     export class subTitleSettings {
       public text: string = "Sub Text";
       public fontColor: string = "";
       public alignment: string = "";
       public textSize: number = 15;
       public fontFamily: string = "";
     }

     export class icon {
       public icon: string = "fa-times"
     }

}
