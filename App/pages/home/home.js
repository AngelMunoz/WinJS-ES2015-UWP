/**
 * 
 * This is the default state of your page, remember these options are
 * available to you once it ready, you should
 * be able to put arbitrary data here
 **/
export default {
  uri: '/pages/home/home.html',
  label: 'Home',
  init(element, options) {
    /**
     * Use Fragments Like you would use "Components" in any other app 
     * just remember these are kind of low level, 
     * so you might still have to do some fancy stuff by hand
     **/
    WinJS.UI.Fragments
      .renderCopy('/fragments/home/content.html')
      .done((fragment) => element.appendChild(fragment));
  },
  ready(element, options) {
    options = Object.assign({}, options);

  }
}