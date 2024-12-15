export interface Component {
  id: string;
  render(style: string | null): HTMLElement;
}

export function updateStyle(
  component: Component,
  contextualStyle: string | null,
  style: string,
) {
  const styleId = `${component.id}-style`;
  let localStyle = document.getElementById(styleId) as HTMLStyleElement;
  if (!localStyle) {
    localStyle = document.createElement("style");
    localStyle.id = styleId;
    document.head.appendChild(localStyle);
  }
  localStyle.textContent = `
        .${component.id} {
            ${contextualStyle === null ? "" : contextualStyle}
            ${style}
        }
        `;
}

export function updateElement(
  component: Component,
  children: HTMLElement[],
  innerHTML: string | null,
): HTMLElement {
  const id = `${component.id}`;
  let element = document.getElementById(id);
  if (element) {
    children.forEach((child) => {
      element?.removeChild(child);
    });
  } else {
    element = document.createElement("div");
    element.id = id;
    element.className = id;
    document.head.appendChild(element);
  }
  children.forEach((child) => {
    element.append(child);
  });
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
}
