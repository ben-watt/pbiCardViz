/*
 *  Power BI Visual CLI
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

module powerbi.extensibility.visual {
    "use strict";
    export class Visual implements IVisual {
        private target: HTMLElement;
        private updateCount: number;
        private settings: VisualSettings;
        private model: number; 

        constructor(options: VisualConstructorOptions) {
            this.target = options.element;
        }

        public update(options: VisualUpdateOptions) {        
            this.model = 0;
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);    
            this.model = this.parseDataView(options);

            const label = this.calculateUnits(this.settings.dataPoint.units);

            const viewHeight = options.viewport.height;
            const viewWidth = options.viewport.width;
            const textHeight = viewHeight / 2;
            const textWidth = viewWidth / 2;
            const {fontSize, heightOffset, widthOffset, fill, decimalPlaces} = this.settings.dataPoint;
            const { text , textSize, alignment, fontColor} = this.settings.subTitle;
            const { icon } = this.settings.icon;

            this.target.innerHTML = `
                <div>
                    <div style="font-size: ${textSize}px; position: relative; margin-top: -5px; color: ${fontColor}; text-align: ${alignment}">${text}</div>
                    <div style="font-size: ${fontSize}px; color: ${fill}; position: absolute; top: ${50 + heightOffset}px; margin-left: ${20 + widthOffset}px;">${this.model.toFixed(decimalPlaces) + label}</div>
                    <div style="width: 30px; height: 30px; font-size: 60px; position: absolute; top:30px; right: 50px">
                        <i class="fa ${icon}" style="color: white; opacity: 0.6"></i>
                    </div>
                </div>`;
        }

        private calculateUnits(unit: number): string {
            let label = ''
            let u = unit * 10;
            if(u === 0){
                u = Math.pow(10, this.model.toString().split('.')[0].length);
            }
            
            switch (u) {
                case Math.pow(10,4):
                case Math.pow(10,5):
                case Math.pow(10,6):
                    label = 'k';
                    this.model = this.model / Math.pow(10,3);
                    break;
                case Math.pow(10,7):
                case Math.pow(10,8):
                case Math.pow(10,9):
                    label = 'm';
                    this.model = this.model / Math.pow(10,6);
                    break;
                case Math.pow(10,10):
                case Math.pow(10,11):
                case Math.pow(10,12):
                    label = 'bn';
                    this.model = this.model / Math.pow(10,9);
                    break;
                case Math.pow(10,13):
                case Math.pow(10,14):
                case Math.pow(10,15):
                    label = 'tr';
                    this.model = this.model / Math.pow(10,12);
                    break;
                default:
                    break;
            }
            return label;
        }

        private parseDataView(options: VisualUpdateOptions): number {
            if( options 
                && options.dataViews 
                && options.dataViews[0] 
                && options.dataViews[0].single 
                && options.dataViews[0].single.value ){

                if( typeof options.dataViews[0].single.value === "number"){
                    return +options.dataViews[0].single.value;
                }                
            }
            return 0;
        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        /** 
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the 
         * objects and properties you want to expose to the users in the property pane.
         * 
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}