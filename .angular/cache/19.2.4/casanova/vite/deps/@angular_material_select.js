import {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatOptgroup,
  MatOption,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger
} from "./chunk-YWFLUWSZ.js";
import "./chunk-3RXB3VCZ.js";
import "./chunk-Z445TOIK.js";
import "./chunk-LKJZHQUJ.js";
import "./chunk-HWUWY5IE.js";
import "./chunk-SZS4RJEH.js";
import "./chunk-KWA3TKBV.js";
import "./chunk-PM3BXAZD.js";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-CDAUKHLB.js";
import "./chunk-RB25D2FV.js";
import "./chunk-B2GA3NOI.js";
import "./chunk-VTTKUVK3.js";
import "./chunk-UU5Z7QKS.js";
import "./chunk-7CA54YE4.js";
import "./chunk-WCONKTIB.js";
import "./chunk-M3HR6BUY.js";
import "./chunk-ORAUIUNY.js";
import "./chunk-UDU42JBG.js";
import "./chunk-PKCKCQRW.js";
import "./chunk-Y5DN3UKX.js";
import "./chunk-65RJ5ZZ2.js";
import "./chunk-IDPUP2GP.js";
import "./chunk-DMFM3V3E.js";
import "./chunk-IYRB435V.js";
import "./chunk-UIECUHBO.js";
import "./chunk-EZ4SJOWE.js";
import "./chunk-7MINJMSB.js";
import "./chunk-4OGXNMAE.js";
import "./chunk-5RGDCTQ3.js";
import "./chunk-P6U2JBMQ.js";
import "./chunk-EIB7IA3J.js";

// node_modules/@angular/material/fesm2022/select.mjs
var matSelectAnimations = {
  // Represents
  // trigger('transformPanelWrap', [
  //   transition('* => void', query('@transformPanel', [animateChild()], {optional: true})),
  // ])
  /**
   * This animation ensures the select's overlay panel animation (transformPanel) is called when
   * closing the select.
   * This is needed due to https://github.com/angular/angular/issues/23302
   */
  transformPanelWrap: {
    type: 7,
    name: "transformPanelWrap",
    definitions: [{
      type: 1,
      expr: "* => void",
      animation: {
        type: 11,
        selector: "@transformPanel",
        animation: [{
          type: 9,
          options: null
        }],
        options: {
          optional: true
        }
      },
      options: null
    }],
    options: {}
  },
  // Represents
  // trigger('transformPanel', [
  //   state(
  //     'void',
  //     style({
  //       opacity: 0,
  //       transform: 'scale(1, 0.8)',
  //     }),
  //   ),
  //   transition(
  //     'void => showing',
  //     animate(
  //       '120ms cubic-bezier(0, 0, 0.2, 1)',
  //       style({
  //         opacity: 1,
  //         transform: 'scale(1, 1)',
  //       }),
  //     ),
  //   ),
  //   transition('* => void', animate('100ms linear', style({opacity: 0}))),
  // ])
  /** This animation transforms the select's overlay panel on and off the page. */
  transformPanel: {
    type: 7,
    name: "transformPanel",
    definitions: [{
      type: 0,
      name: "void",
      styles: {
        type: 6,
        styles: {
          opacity: 0,
          transform: "scale(1, 0.8)"
        },
        offset: null
      }
    }, {
      type: 1,
      expr: "void => showing",
      animation: {
        type: 4,
        styles: {
          type: 6,
          styles: {
            opacity: 1,
            transform: "scale(1, 1)"
          },
          offset: null
        },
        timings: "120ms cubic-bezier(0, 0, 0.2, 1)"
      },
      options: null
    }, {
      type: 1,
      expr: "* => void",
      animation: {
        type: 4,
        styles: {
          type: 6,
          styles: {
            opacity: 0
          },
          offset: null
        },
        timings: "100ms linear"
      },
      options: null
    }],
    options: {}
  }
};
export {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatOptgroup,
  MatOption,
  MatPrefix,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger,
  MatSuffix,
  matSelectAnimations
};
//# sourceMappingURL=@angular_material_select.js.map
