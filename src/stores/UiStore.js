// @flow
import { observable, computed, action } from 'mobx';
import { breakpoints } from 'constants/styles';

class UiStore {
  @observable sidebarOpen: boolean = false;
  @observable width: number;

  @computed
  get layout(): 'desktop' | 'tablet' | 'mobile' {
    if (this.width > breakpoints.desktop) return 'desktop';
    else if (this.width > breakpoints.tablet) return 'tablet';
    return 'mobile';
  }

  @computed
  get isDesktop(): boolean {
    return this.layout === 'desktop';
  }

  @computed
  get isTablet(): boolean {
    return this.layout === 'tablet';
  }

  @computed
  get isMobile(): boolean {
    return this.layout === 'mobile';
  }

  @action
  closeSidebar = (): void => {
    this.sidebarOpen = false;
  };

  @action
  openSidebar = (): void => {
    this.sidebarOpen = true;
  };

  constructor() {
    this.width = window.innerWidth;
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
    });
  }
}

export default UiStore;
