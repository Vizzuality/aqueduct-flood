import HomePage from 'pages/home';
import ComparePage from 'pages/compare';
import WidgetEmbed from 'pages/widget-embed';
import WidgetPreview from 'pages/widget-preview';

export const PAGES_DICTIONARY = {
  home: HomePage,
  compare: ComparePage,
  'widget-preview': WidgetEmbed,
  'widget-embed': WidgetPreview
};

export default { PAGES_DICTIONARY };