/**
 * 
 * This is the default state of your page, remember these options are
 * available to you once it is ready, you should
 * be able to put arbitrary data here
 **/
export default {
  uri: '/pages/about/about.html',
  label: 'About',
  init(element, options) {
    /**
     * Use Fragments Like you would use "Components" in any other app 
     * just remember these are kind of low level, 
     * so you might still have to do some fancy stuff by hand
     **/
    WinJS.UI.Fragments
      .renderCopy('/fragments/about/content.html')
      .done((fragment) => element.appendChild(fragment));
  },
  ready(element, options) {
    console.log("Hello about!")
    options = Object.assign({}, options);


  }
}