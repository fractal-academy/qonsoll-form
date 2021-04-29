const CracoLessPlugin = require('craco-less')
const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        baseUrl: './src'
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // ——— COLORS
              '@white': '#fff',
              '@black': '#000',
              '@dark': '#030b17',
              '@primary-color': '#1d6fdc',
              '@success-color': '#18b86e',
              '@warning-color': '#e69f09',
              '@error-color': '#eb161a',
              '@info-color': '@primary-color',
              '@highlight-color': '#eb161a',
              '@processing-color': '@primary-color',

              '@primary-1': 'tint(@primary-color, 90%)',
              '@primary-2': 'tint(@primary-color, 80%)',
              '@primary-5': 'tint(@primary-color, 20%)',
              '@primary-6': '@primary-color',
              '@primary-7': 'shade(@primary-color, 5%)',

              // '@dark-t-1': 'fade(@dark, 75%)',
              // '@dark-t-2': 'fade(@dark, 50%)',
              // '@dark-t-3': 'fade(@dark, 25%)',
              // '@dark-t-4': 'fade(@dark, 20%)',
              // '@dark-t-5': 'fade(@dark, 15%)',
              // '@dark-t-6': 'fade(@dark 12%)',
              // '@dark-t-7': 'fade(@dark 10%)',
              // '@dark-t-8': 'fade(@dark 8%)',
              // '@dark-t-9': 'fade(@dark 4%)',

              // ——— BACKGROUNDS
              '@body-background': '@white',
              '@background-color-base': 'fade(@dark, 4%)', // Default grey background color
              '@background-color-light': 'hsv(0, 0, 98%)', // background of header and selected item
              '@component-background': '@white',

              // ——— DISABLED STATES
              '@disabled-color': 'fade(@dark, 35%)',
              '@disabled-bg': '@background-color-base',
              '@disabled-color-dark': 'fade(@white, 35%)',

              // ——— BORDER RADIUS
              '@border-radius-base': '8px',
              '@border-radius-sm': '4px',

              // BORDER
              // '@border-color-base': 'fade(@dark, 15%)',
              '@border-color-split': 'fade(@dark, 7%)',

              // ——— TYPOGRAPHY
              '@font-family': 'Poppins',
              '@code-family':
                '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
              '@font-variant-base': 'tabular-nums',
              '@font-feature-settings-base': 'tnum',
              '@line-height-base': 1.5,
              '@text-color': 'fade(@dark, 65%)',
              '@text-color-secondary': 'fade(@dark, 45%)',
              '@text-color-inverse': '@white',
              '@text-color-dark': 'fade(@white, 85%)',
              '@text-color-secondary-dark': 'fade(@white, 65%)',
              '@text-selection-bg': '@primary-color',
              '@font-size-sm': '@font-size-base - 2px',
              '@font-size-base': '16px',
              '@font-size-lg': '@font-size-base + 4px',
              '@heading-color': '@dark',
              '@heading-color-dark': 'fade(@white, 100%)',
              '@heading-1-size': 'calc(@font-size-base * 2.5)',
              '@heading-2-size': 'calc(@font-size-base * 2)',
              '@heading-3-size': 'calc(@font-size-base * 1.5)',
              '@heading-4-size': 'calc(@font-size-base * 1.25)',
              '@heading-5-size': '@font-size-base',
              '@typography-title-font-weight': 600,
              '@typography-title-margin-top': '1.2em',
              '@typography-title-margin-bottom': '0',

              // ——— ICONOGRAPHY
              '@icon-color': 'inherit',
              '@icon-color-hover': '@dark',

              // ——— HEIGHT RULES
              '@height-sm': '24px',
              '@height-base': '40px',
              '@height-lg': '56px',

              // ——— LAYOUT
              '@layout-header-background': '@white',
              '@layout-body-background': 'tint(@primary-color, 93%)',
              '@layout-header-height': '64px',
              '@layout-header-padding': '0 24px',
              '@layout-header-color': '@dark',
              '@layout-footer-padding': '24px 24px',
              // '@layout-footer-background': '@layout-body-background',
              // '@layout-sider-background': '@layout-header-background',
              // '@layout-trigger-height': '48px',
              // '@layout-trigger-background': '#002140',
              '@layout-trigger-color': '@white',
              // '@layout-zero-trigger-width': '36px',
              // '@layout-zero-trigger-height': '42px',
              // light
              '@layout-sider-background-light': '@white',
              '@layout-trigger-background-light': '@white',
              // '@layout-trigger-color-light': '@text-color',

              // ——— PROGRESS
              '@progress-remaining-color': 'fade(@dark, 8%)',

              // ——— BUTTONS
              '@btn-font-weight': 600,
              // @btn-border-radius-base: @border-radius-base;
              '@btn-border-radius-sm': '@border-radius-base / 2',
              // @btn-border-width: @border-width-base;
              // @btn-border-style: @border-style-base;
              // @btn-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
              // @btn-primary-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
              // @btn-text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);

              // @btn-primary-color: #fff;
              // @btn-primary-bg: @primary-color;

              '@btn-default-color': '@text-color',
              '@btn-default-bg': 'transparent', // @component-background
              // @btn-default-border: @border-color-base;

              // @btn-danger-color: #fff;
              // @btn-danger-bg: @error-color;
              // @btn-danger-border: @error-color;

              // @btn-disable-color: @disabled-color;
              // @btn-disable-bg: @disabled-bg;
              // @btn-disable-border: @border-color-base;

              // @btn-default-ghost-color: @component-background;
              // @btn-default-ghost-bg: transparent;
              // @btn-default-ghost-border: @component-background;

              // @btn-font-size-lg: @font-size-lg;
              '@btn-font-size-sm': '@font-size-sm',
              // @btn-padding-horizontal-base: @padding-md - 1px;
              // @btn-padding-horizontal-lg: @btn-padding-horizontal-base;
              // @btn-padding-horizontal-sm: @padding-xs - 1px;

              // @btn-height-base: @height-base;
              // @btn-height-lg: @height-lg;
              // @btn-height-sm: @height-sm;

              // @btn-circle-size: @btn-height-base;
              // @btn-circle-size-lg: @btn-height-lg;
              // @btn-circle-size-sm: @btn-height-sm;

              // @btn-square-size: @btn-height-base;
              // @btn-square-size-lg: @btn-height-lg;
              // @btn-square-size-sm: @btn-height-sm;
              // @btn-square-only-icon-size: @font-size-base + 2px;
              // @btn-square-only-icon-size-sm: @font-size-base;
              // @btn-square-only-icon-size-lg: @btn-font-size-lg + 2px;

              // @btn-group-border: @primary-5;

              // @btn-link-hover-bg: transparent;
              '@btn-text-hover-bg': 'fade(@dark, 4%)',

              // ——— VERTICAL PADDINGS
              '@padding-lg': '24px', // containers
              '@padding-md': '16px', // small containers and buttons
              '@padding-sm': '12px', // Form controls and items
              '@padding-xs': '8px', // small items
              '@padding-xss': '4px', // more small

              // ——— VERTICAL PADDING FOR ALL FORM CONTROLS
              '@control-padding-horizontal': '@padding-sm',
              '@control-padding-horizontal-sm': '@padding-xs',
              // '@form-item-margin-bottom': '0px',

              // ——— INPUTS
              // @input-height-base: @height-base;
              // @input-height-lg: @height-lg;
              // @input-height-sm: @height-sm;
              // @input-padding-horizontal: @control-padding-horizontal - 1px;
              // @input-padding-horizontal-base: @input-padding-horizontal;
              // @input-padding-horizontal-sm: @control-padding-horizontal-sm - 1px;
              // @input-padding-horizontal-lg: @input-padding-horizontal;
              // @input-padding-vertical-base: max(
              //   round((@input-height-base - @font-size-base * @line-height-base) / 2 * 10) / 10 -
              //     @border-width-base,
              //   3px
              // );
              // @input-padding-vertical-sm: max(
              //   round((@input-height-sm - @font-size-base * @line-height-base) / 2 * 10) / 10 - @border-width-base,
              //   0
              // );
              // @input-padding-vertical-lg: ceil((@input-height-lg - @font-size-lg * @line-height-base) / 2 * 10) /
              //   10 - @border-width-base;
              '@input-placeholder-color': '@disabled-color',
              // @input-color: @text-color;
              // @input-icon-color: @input-color;
              // @input-border-color: @border-color-base;
              '@input-bg': 'tint(@dark, 96%)',
              // @input-number-hover-border-color: @input-hover-border-color;
              // @input-number-handler-active-bg: #f4f4f4;
              '@input-number-handler-hover-bg': '@primary-color',
              // @input-number-handler-bg: @component-background;
              // @input-number-handler-border-color: @border-color-base;
              // @input-addon-bg: @background-color-light;
              '@input-hover-border-color': '@primary-color',
              // @input-disabled-bg: @disabled-bg;
              // @input-outline-offset: 0 0;
              '@input-icon-hover-color': '@dark',
              // @input-disabled-color: @disabled-color;

              // ——— SELECTS
              // @select-border-color: @border-color-base;
              // @select-item-selected-color: @text-color;
              // @select-item-selected-font-weight: 600;
              // @select-dropdown-bg: @component-background;
              '@select-item-selected-bg': 'fade(@primary-color, 12%)',
              // @select-item-active-bg: @item-hover-bg;
              // @select-dropdown-vertical-padding: @dropdown-vertical-padding;
              // @select-dropdown-font-size: @dropdown-font-size;
              // @select-dropdown-line-height: @dropdown-line-height;
              // @select-dropdown-height: 32px;
              '@select-background': 'tint(@dark, 96%)',
              // @select-clear-background: @select-background;
              '@select-selection-item-bg': 'fade(@dark, 8%)',
              // @select-selection-item-border-color: @border-color-split;
              '@select-single-item-height-lg': '@height-lg',
              // @select-multiple-item-height: @input-height-base - @input-padding-vertical-base * 2; // Normal 24px
              '@select-multiple-item-height-lg': '40px',
              // @select-multiple-item-spacing-half: ceil(@input-padding-vertical-base / 2);

              // ——— LIST ITEMS, TABLE CELLS, ETC.
              // '@item-active-bg': @primary-1,
              '@item-hover-bg': 'fade(@dark, 8%)',

              // ——— LIST
              '@list-header-background': 'transparent',
              '@list-footer-background': 'transparent',
              '@list-empty-text-padding': '@padding-md',
              '@list-item-padding': '@padding-sm 0',
              '@list-item-padding-sm': '@padding-xs @padding-md',
              '@list-item-padding-lg': '16px 24px',
              '@list-item-meta-margin-bottom': '@padding-md',
              '@list-item-meta-avatar-margin-right': '@padding-md',
              '@list-item-meta-title-margin-bottom': '@padding-sm',
              '@list-customize-card-bg': '@component-background',
              '@list-item-meta-description-font-size': '@font-size-base',

              // MENU
              '@menu-inline-toplevel-item-height': '48px',
              '@menu-item-height': '48px',
              '@menu-collapsed-width': '48px',
              '@menu-item-color': '@text-color',
              '@menu-bg': 'transparent',
              '@menu-item-font-size': '@font-size-base',
              '@menu-icon-size-lg': '@font-size-lg',
              '@menu-item-vertical-margin': 0,
              '@menu-item-boundary-margin': 0,
              '@menu-popup-bg': '@white !important',

              '@menu-dark-color': '@text-color-secondary-dark',
              '@menu-dark-danger-color': '@error-color',
              '@menu-dark-bg': 'transparent',
              '@menu-dark-arrow-color': '@text-color-secondary-dark',
              '@menu-dark-inline-submenu-bg': 'transparent',
              '@menu-dark-highlight-color': '@white',
              '@menu-dark-item-active-bg': '@white',
              '@menu-dark-item-active-danger-bg': '@error-color',
              '@menu-dark-selected-item-icon-color': '@primary-color',
              '@menu-dark-selected-item-text-color': '@primary-color',
              '@menu-dark-item-hover-bg': 'fade(@white, 10%)',

              // CARD
              '@card-shadow':
                '0 1px 2px -2px rgba(3, 11, 23, 0.16), 0 3px 6px 0 rgba(3, 11, 23, 0.12), 0 5px 12px 4px rgba(3, 11, 23, 0.09)',
              '@card-radius': 'calc(@border-radius-base * 2)',

              // ——— SKELETON
              '@skeleton-color': 'fade(@dark, 4%)',
              '@skeleton-to-color': 'fade(@dark, 16%)',
              // @skeleton-paragraph-margin-top: 28px;
              // @skeleton-paragraph-li-margin-top: @margin-md;
              // @skeleton-paragraph-li-height: 16px;
              // @skeleton-title-height: 16px;
              // @skeleton-title-paragraph-margin-top: @margin-lg;

              // ——— POPOVER
              // @popover-bg: @component-background;
              // @popover-color: @text-color;
              // @popover-min-width: 177px;
              // @popover-min-height: 32px;
              // @popover-arrow-width: 6px;
              // @popover-arrow-color: @popover-bg;
              // @popover-arrow-outer-color: @popover-bg;
              // @popover-distance: @popover-arrow-width + 4px;
              '@popover-padding-horizontal': '@padding-lg',

              // AVATAR
              '@avatar-size-sm': '24px',
              '@avatar-size-base': '32px',
              '@avatar-size-lg': '40px',
              '@avatar-font-size-sm': '16px',
              '@avatar-font-size-base': '24px',
              '@avatar-font-size-lg': '24px',
              '@avatar-bg': 'rgba(3,11,23,0.1)',
              '@avatar-color': 'rgba(3,11,23,0.5)',
              '@avatar-border-radius': '@border-radius-base',
              '@avatar-group-overlapping': '-8px',
              '@avatar-group-space': '3px',
              '@avatar-group-border-color': '@white'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
