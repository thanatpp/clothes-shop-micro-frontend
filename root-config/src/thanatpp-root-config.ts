import { registerApplication, start, navigateToUrl } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

window.addEventListener('single-spa:before-routing-event', (e: CustomEvent) => {
  const {
    originalEvent,
    newAppStatuses,
    appsByNewStatus,
    totalAppChanges,
    oldUrl,
    newUrl,
    navigationIsCanceled,
    cancelNavigation,
  } = e.detail;

  if(localStorage.getItem('token') === null){
    if(new URL(newUrl).pathname  === '/account/profile'){
      navigateToUrl('/login')
    }
  }else if(localStorage.getItem('token') !== null){
    if(new URL(newUrl).pathname  === '/login'){
      navigateToUrl('/')
    }
  }
});

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name)          
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();

start({
  urlRerouteOnly: true,
});



