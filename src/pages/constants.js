import HomePage from 'pages/home';
import ComparePage from 'pages/compare';
import WidgetEmbed from 'pages/widget-embed';
import CBAEmbed from 'pages/cba-embed';
import CBAEmbedCompare from 'pages/cba-embed-compare';

import WidgetPreview from 'pages/widget-preview';

export const PAGES_DICTIONARY = {
  home: HomePage,
  compare: ComparePage,
  'widget-preview': WidgetEmbed,
  'widget-embed': WidgetPreview,
  'cba-embed': CBAEmbed,
  'cba-embed-compare': CBAEmbedCompare
};

export default { PAGES_DICTIONARY };