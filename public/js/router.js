import { renderHome } from './controllers/searchController.js';
import { renderMechanicsList, renderMechanicDetail } from './controllers/mechanicController.js';
import { renderWorkorderNew, renderWorkorderTrack } from './controllers/workorderController.js';
import { renderAbout } from './controllers/aboutController.js';
import { renderWorkordersList } from './controllers/workordersListController.js';

const routes = {
  '#/': renderHome,
  '#/ustalar': renderMechanicsList,
  '#/usta': renderMechanicDetail,
  '#/is-emri-yeni': renderWorkorderNew,
  '#/is-emri': renderWorkorderTrack,
  '#/hakkimizda': renderAbout,
  '#/is-emirler': renderWorkordersList,
};

function getRouteHandler() {
  const full = window.location.hash || '#/';
  const base = full.split('?')[0];
  if (base.startsWith('#/usta/')) return routes['#/usta'];
  if (base.startsWith('#/is-emri/')) return routes['#/is-emri'];
  if (base.startsWith('#/ustalar')) return routes['#/ustalar'];
  if (base.startsWith('#/is-emri-yeni')) return routes['#/is-emri-yeni'];
  if (base.startsWith('#/is-emirler')) return routes['#/is-emirler'];
  return routes[base] || renderHome;
}

export function initializeRouter() {
  window.addEventListener('hashchange', () => {
    const handler = getRouteHandler();
    handler();
  });
  const handler = getRouteHandler();
  handler();
}


