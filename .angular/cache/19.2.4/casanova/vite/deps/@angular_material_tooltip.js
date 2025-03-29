import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatTooltip,
  MatTooltipModule,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError
} from "./chunk-UKCOMVUA.js";
import "./chunk-SZS4RJEH.js";
import "./chunk-OIBNGD5S.js";
import "./chunk-KWA3TKBV.js";
import "./chunk-PM3BXAZD.js";
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
import "./chunk-DMFM3V3E.js";
import "./chunk-IYRB435V.js";
import "./chunk-UIECUHBO.js";
import "./chunk-EZ4SJOWE.js";
import "./chunk-7MINJMSB.js";
import "./chunk-4OGXNMAE.js";
import "./chunk-5RGDCTQ3.js";
import "./chunk-P6U2JBMQ.js";
import "./chunk-EIB7IA3J.js";

// node_modules/@angular/material/fesm2022/tooltip.mjs
var matTooltipAnimations = {
  // Represents:
  // trigger('state', [
  //   state('initial, void, hidden', style({opacity: 0, transform: 'scale(0.8)'})),
  //   state('visible', style({transform: 'scale(1)'})),
  //   transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
  //   transition('* => hidden', animate('75ms cubic-bezier(0.4, 0, 1, 1)')),
  // ])
  /** Animation that transitions a tooltip in and out. */
  tooltipState: {
    type: 7,
    name: "state",
    definitions: [{
      type: 0,
      name: "initial, void, hidden",
      styles: {
        type: 6,
        styles: {
          opacity: 0,
          transform: "scale(0.8)"
        },
        offset: null
      }
    }, {
      type: 0,
      name: "visible",
      styles: {
        type: 6,
        styles: {
          transform: "scale(1)"
        },
        offset: null
      }
    }, {
      type: 1,
      expr: "* => visible",
      animation: {
        type: 4,
        styles: null,
        timings: "150ms cubic-bezier(0, 0, 0.2, 1)"
      },
      options: null
    }, {
      type: 1,
      expr: "* => hidden",
      animation: {
        type: 4,
        styles: null,
        timings: "75ms cubic-bezier(0.4, 0, 1, 1)"
      },
      options: null
    }],
    options: {}
  }
};
export {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatTooltip,
  MatTooltipModule,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError,
  matTooltipAnimations
};
//# sourceMappingURL=@angular_material_tooltip.js.map
