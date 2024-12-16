export interface Component {
  id: string;
  render(contextualStyle: string | null): HTMLElement;
}

export function updateStyle(
  element: HTMLElement,
  id: string,
  contextualStyle: string | null,
  style: string,
) {
  const styleId = `${id}-style`;
  let localStyle = document.getElementById(styleId) as HTMLStyleElement;
  if (!localStyle) {
    localStyle = document.createElement("style");
    localStyle.id = styleId;
  }
  localStyle.textContent = `
  ${id} {
    ${contextualStyle === null ? "" : contextualStyle}
    ${style}
  }
  `;
  element.append(localStyle);
}

export function updateElement(
  component: Component,
  children: HTMLElement[],
  innerHTML: string | null,
): HTMLElement {
  const id = `${component.id}`;
  let element = document.getElementById(id);
  if (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  } else {
    element = document.createElement("div");
    element.id = id;
    element.className = id;
    document.body.appendChild(element);
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  children.forEach((child) => {
    element.append(child);
  });
  return element;
}
