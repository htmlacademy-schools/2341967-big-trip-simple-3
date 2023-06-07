import {render} from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import initialPoints, { ALLoffers, ALLdestinations } from './model/generate-trip-point-info';
import WaypointModel from './model/waypoint-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
const filterConteiner = document.querySelector('.trip-controls__filters');

// render(new FiltersView(),filterConteiner);

const pageContainer = document.querySelector('.trip-events');
const waypointModel = new WaypointModel(initialPoints);
const filterModel = new FilterModel();
const offersModel = new OfferModel(ALLoffers);
const destinationModel = new DestinationModel(ALLdestinations);

const boardPresenter = new BoardPresenter({boardContainer: pageContainer, waypointModel: waypointModel, destinationModel: destinationModel, offerModel: offersModel, filterModel: filterModel, handleFormCreationDestroy: handleFormCreationDestroy});
const filterPresenter = new FilterPresenter(filterConteiner, filterModel, waypointModel);

const newPointButttonView = new NewPointButtonView(
  handleOpenCreateForm
);

const siteHeaderElement = document.querySelector('.trip-main');

function handleFormCreationDestroy() {
  newPointButttonView.element.disabled = false;
}

function handleOpenCreateForm() {
  boardPresenter.createWaypoint();
  newPointButttonView.element.disabled = true;
}
render(newPointButttonView, siteHeaderElement);

filterPresenter.init();
boardPresenter.init();
