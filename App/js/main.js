import RouteManager from "/js/route-manager.js"
import ApplicationManager from "/js/application-manager.js"
import Home from "/pages/home/home.js"
import About from "/pages/about/about.js"

const { UI, Navigation } = WinJS;
const { Pages } = UI;
const routes = [Home, About];

/**
 * 
 * There's a little caveat here, we have to pick the page rules (life cycle methods for pages)
 * from the page's script and register it in our RouteManager (thinking of changing that name)
 * but also these routes must be registered in the index.html
 * <div data-win-control="WinJS.UI.NavBarCommand" data-win-options="{ label: 'Home', icon: 'home'}"></div>
 * the label is the most important name 
 * 
 * or if you know how to propperly create these buttons at runtime, feel free to do so
 * */
export const loader = new RouteManager(routes);

/**
 * remember to register all pages before any app initialization
 **/
function definePages(routes) {
  for (const route of routes) {
    Pages.define(route.uri, route);
  }
}

const application = new ApplicationManager();
// register to firsr-activation event
application.emitter.on('first-activation', function (args) {
  console.log('please work')
  definePages(routes);
  args.setPromise(UI.processAll().then(() => loader.addRouteListeners())
    .then(() => Navigation.navigate(Home.uri, Home)));
});

application.start();
export default application;