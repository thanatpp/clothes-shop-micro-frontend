import { registerApplication, start, navigateToUrl } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const checkTtl = (ttl) => {
  console.log(Date.now(), ttl)
  if (Date.now() > ttl) {
    localStorage.removeItem('user');
    const logout = new CustomEvent('logout');
    window.dispatchEvent(logout)
    return true
  }
}
 
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

  const path = new URL(newUrl).pathname
  const index = path.split('/')
  const user = JSON.parse(localStorage.getItem('user'))

  if(user === null){
    if(index[1]  === 'account' || index[1]  === 'admin'){
      navigateToUrl('/login')
    }
  }else{
    if(index[1]  === 'login'){
      if(user.data.user.type === 'customer'){
        navigateToUrl('/collections/men')
      }else{
        navigateToUrl('/admin/product')
      }
    }else if(index[1] === 'admin'){
      checkTtl(user.ttl)
      if(user.data.user.type !== 'admin'){
        navigateToUrl('/collections/men')
      }else{
        navigateToUrl(path)
      }
    }else if(index[1] === 'account' || index[1] === 'collections'){
      checkTtl(user.ttl)
      if(user.data.user.type !== 'customer'){
        navigateToUrl('/admin/product')
      }else{
        navigateToUrl(path)
      }
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



