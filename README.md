# WinJS-ES2015-UWP

Hey! Welcome to the days when names like `React` or `Vue` or `Angular 2+` were really on low radar when jQuery was still a good thing
and people didn't roast it (it's still a good thing dependind on your use case don't worry) but instead jQuery what about WinJS!?

Now Don't be confused WinJS may proide you with some cool widgets and stuff, but is not a framework it's a library so you will have
to do some DOM manupulation if you want to go free of other libraries/frameworks, if you want to go more frameworky you can check the
[AngularJs](https://github.com/AngelMunoz/Angularjs-ES2015-UWP/tree/master) version of this.

# Structure
![Structure](https://i.imgur.com/h1opBzx.png)

`Pages` is for the *view* page concept due the fact of how pages are registrated you don't really need to incude that script inside your *page* html
you do need to setup however event listeners and stuff you may want to in that page, also if you feel the need to include more scripts
to manage other parts of the said same page, you can do so by including it in your html

`Fragments` is a low level concept of I would say `component` it's a bunch of html that may as well be reused on some other parts of
your app but there are no scoped CSS and stuff like that, and if you don't want things to go global try to include your scripts as modules
also, you don' have fancy libs here and there so event listteners should be removed when you are changing fragments to prevent memory leaks

`lib` is where you would put the normal vendor files, yes I didn't use npm or something like that, neither a bundler while you should be able
to just spit a single bundled html, js file I don't feel it necesary for this boilerplate feel free to modify the build process to fit your needs


# Application Manager and Route Manager
These two are opinionated and perhaps an overkil, I'd rather have a little bit of OOP classes around for these kinds of things
that just assigning functions here and there to parts of the application 
## Route Manager
 this class has 3 important things
 1. routes (which include state and options for pages)
 2. addRouteListeners()
 3. navigateTo()
 
 the routes include the main object and labels to your links to the different routes you may haveand the object looks like this
 ```js
 {
  uri: '/pages/about/about.html', // REQUIRED
  label: 'About', // REQUIRED
  init(element, options) { //optional
    /**
     * Use Fragments Like you would use "Components" in any other app 
     * just remember these are kind of low level, 
     * so you might still have to do some fancy stuff by hand
     **/
    WinJS.UI.Fragments
      .renderCopy('/fragments/about/content.html')
      .done((fragment) => element.appendChild(fragment));
  },
  ready(element, options) { // optional but useful thin of it like $(document).ready()
    console.log("Hello about!")
    options = Object.assign({}, options);


  }
}
```

`addRouteListeners()` it's just a method which will try to assign a listener to a button that is presented on the side bar as if it was a url link

`navigateTo()` is the event listener registered to the sidebar buttons to take you to other page with the help of `navigator.js`

## Application Manager
I didn't want to have all these event listeners and if/else's inside my main file, so I just moved up the usual application state management
code to this class, as well as adding an event emitter to it (I tried to extend it but for some reason it failed to extend it) so it feels mode *node'y*
to manage events, that way if you check both the app manager and the main, I didn't needed to have activation specific code in the main script but could listen to the first activation
and register routes and event listeners for route link buttons.

in the same way if you want to add something like a Battery State Manager or something like that for your application, you can eventually register that in the Application Manager and enable it on the main or something
it's upt to you

### navigator.js
this file is just the file that it used to come with the older `windows 8` app navigation templates


# ES2015 Imports
Please be warned that `ES2015 Imports` must include the extension, and they resolve from the base url
for example
```
src
  home
    index.js
  main.js
index.js
index.html
```

in your index.html
```html
<!-- this will work -->
<script type="module" src="index.js"></script>
```
Also note that `any import inside of a es2015 module script that fails, will also make that module fail` and the web engine will silently fail and discard that import


main.js
```js
import Home from './home/home.js' // this will fail and cause main.js to not be imported from anything that imports this file
import Home from './home/home' // this will fail and cause main.js to not be imported from anything that imports this file
import Home from '/src/home/home.js' // this will actually work
```
index.js
```js
import main from '/src/main.js'
// if any of the first two imports in the main.js is present even if this is well written it wil also silently fail
```

not having the recent tools like vue (which I didn't include because it breaks csp) or such, make it difficult for me, I'm not really that used to do DOM stuff
and made me think on how many things we have today and take them for granted! thanks for the work of those guys that mmake our world a better place! (easier as well)

and after all it's a weird setup but...

![Hey! as long as it works](http://i0.kym-cdn.com/photos/images/original/001/075/794/3e1.png)


