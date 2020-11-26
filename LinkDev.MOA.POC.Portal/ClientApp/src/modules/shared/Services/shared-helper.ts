export class SharedHelper {

  /* #region  loader */
  public static showLoader() {
    document.getElementById('loading-bar-spinner-component').classList.remove('d-none');

  }
  public static hideLoader() {
    document.getElementById('loading-bar-spinner-component').classList.add('d-none');

  }

  public static scrollToTop() {
    const scrollTarget = document.getElementsByTagName('body')[0];
    if (scrollTarget.scrollTop > 320) {
      scrollTarget.scrollTo({ top: 320, behavior: 'smooth' });
    }
  }
  public static scrollToBody() {
    const scrollTarget = document.getElementsByTagName('body')[0];
    scrollTarget.scrollIntoView();
  }

  public static scrollToElement(element: string): void {
    let scrollTarget = document.getElementById(element);
    scrollTarget.scrollIntoView();
  }
  public static scrollTo(el: Element): void {
    if(el) { 
     el.scrollIntoView({ behavior: 'smooth' });
    }
    else
    {
      window.scroll(0,0);
    }
 }
}
