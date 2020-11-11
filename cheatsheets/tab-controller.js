import { createElement, loadDependencies } from "./core.js";

class TabController extends HTMLElement {
  tabsSlot = createElement("slot", { name: "tabs" });
  panelSlot = createElement("slot", { name: "tab-panel", hidden: true });

  _selectedIndex = 0;
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(value) {
    this.updateSelectedTab(value);
    this.updateSelectedPanel(value);
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    loadDependencies(shadowRoot, {
      js: [
        "//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.1/highlight.min.js",
      ],
      css: [
        "//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.1/styles/nord.min.css",
        "./main.css",
      ],
    });

    shadowRoot.appendChild(this.tabsSlot);
    shadowRoot.appendChild(this.panelSlot);

    this.tabsSlot.addEventListener("slotchange", (e) => {
      this.updateSelectedTab(this.selectedIndex);

      let tabs = this.tabsSlot.assignedNodes()[0];
      if (!tabs) return;

      [...tabs.children].forEach((child, index) => {
        child.addEventListener("click", () => {
          this.selectedIndex = index;
        });
      });
    });

    this.panelSlot.addEventListener("slotchange", (e) => {
      this.updateSelectedPanel(this.selectedIndex);
    });
  }

  updateSelectedTab(selectedIndex) {
    let tabs = this.tabsSlot.assignedNodes()[0];
    if (!tabs) return;

    [...tabs.children].forEach((child, index) => {
      if (index === selectedIndex) {
        child.classList.remove("inactive");
      } else {
        child.classList.add("inactive");
      }
    });
  }

  updateSelectedPanel(selectedIndex) {
    let panel = this.panelSlot.assignedNodes()[0];
    if (!panel) return;

    if (this.panel) {
      this.panel.remove();
    }

    const currentItem = [...panel.children][selectedIndex];

    this.panel = panel.cloneNode(false);
    this.panel.appendChild(currentItem.cloneNode(true));

    this.shadowRoot.appendChild(this.panel);
  }
}

customElements.define("tab-controller", TabController);
