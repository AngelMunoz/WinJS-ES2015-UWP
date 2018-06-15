/**
 * @class RouteManager
 * @description
 * This class used to do a little bit more because I wouldn't find the original navigator.js
 * that came with Windows Apps when windows 8 templates were around,
 * but at least it now does add click listeners for route navigation
 * */
class RouteManager {

  constructor(routes = []) {
    this.routes = routes;
  }

  /**
   * 
   * Add click listeners for route buttons so we can navigate around in our app
   * */
  addRouteListeners() {
    const commands = document.querySelectorAll('.splitview-commands div[data-win-control="WinJS.UI.NavBarCommand"]');
    const filteredRoutes = [...commands.values()].filter(command => !!this.routes.find(r => r.label === command.winControl.label));
    for (const command of filteredRoutes) {
      command.winControl.addEventListener('click', this.navigateTo.bind(this), false)
    }
  }
  /**
   * Find the route we want to navigate to and go to it
   * @param {Event} event
   */
  navigateTo(event) {
    const target = event.currentTarget;
    const label = target.winControl.label;
    const route = this.routes.find(r => r.label === label);
    return WinJS.Navigation.navigate(route.uri, route);
  }
}

export default RouteManager;