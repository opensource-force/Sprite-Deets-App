import { ComponentBase } from "../component.ts";

export class FileSelect extends ComponentBase {
  constructor() {
    super();
    this.id = `file-select`;
  }

  override render(): void {
    //const modalWidth = 400;
    //const modalPadding = 40;

    // element.innerHTML = `
    //     <div class="modal" position="relative">
    //     <svg class="border-svg" width=100% height=100%>
    //     <rect
    //       x=10px
    //       y=10px
    //       rx="20"
    //       ry="20"
    //       fill="none"
    //       stroke-width="4"
    //       stroke-dasharray="10"
    //       stroke-linecap="round"
    //     />
    // </svg>
    //     <h2>Import Spritesheet</h2>
    //     <p>Choose a file to upload and get started.</p>
    //     <div class="selected-file">
    //     ${
    //   store.state.file === null
    //     ? `
    //         <input type="file" id="file-input">
    //         <label for="file-input">Open a File</label>
    //     `
    //     : `
    //           <div class="selected-file-box">
    //               <svg class="selected-file-cancel-icon" width="20px" height="20px" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#e0e0e0"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"></path></svg>
    //               <span class="selected-file-text">${store.state.file.name}</span>
    //               <svg class="selected-file-proceed-icon" width="20px" height="20px" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#e0e0e0"><path d="M7 12.5L10 15.5L17 8.5"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path></svg>
    //           </div>
    //           `
    // }
    //     </div>
    //     </div>
    //     `;

    // const cancelIcon = element.querySelector(".selected-file-cancel-icon");
    // if (cancelIcon) {
    //   cancelIcon.addEventListener("click", () => {
    //     store.state.file = null;
    //     store.update();
    //   });
    // }
    // const proceedIcon = element.querySelector(".selected-file-proceed-icon");
    // if (proceedIcon) {
    //   proceedIcon.addEventListener("click", () => {
    //     if (store.state.file) {
    //       store.state.selectingFile = false;
    //       store.update();
    //     }
    //   });
    // }
    // const fileInput = element.querySelector("#file-input");
    // if (fileInput) {
    //   fileInput.addEventListener("change", (event) => {
    //     const input = event.target as HTMLInputElement;
    //     const file = input.files ? input.files[0] : null;
    //     if (file) {
    //       store.state.file = file;
    //     }
    //     store.update();
    //   });
    // }
    // style.push(
    //   [
    //     new StyleItem(
    //       "body",
    //       `
    //         font-family: Arial, sans-serif;
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //         height: 100vh;
    //         background-color: #f0f0f0;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".modal",
    //       `
    //         position: relative;
    //         width: ${modalWidth}px;
    //         padding: ${modalPadding}px;
    //         background: white;
    //         border-radius: 30px;
    //         box-shadow: 0 4px 10px #00000010;
    //         text-align: center;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".modal h2",
    //       `
    //         font-size: 1.5rem;
    //         color: #333;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".modal p",
    //       `
    //         font-size: 1rem;
    //         color: #666;
    //         margin-top: 8px;
    //         margin-bottom: 20px;
    //         `,
    //     ),
    //     new StyleItem(
    //       '.modal input[type="file"]',
    //       `
    //         display: none;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".modal label",
    //       `
    //         display: inline-block;
    //         font-size: 1rem;
    //         color: white;
    //         border-radius: 8px;
    //         cursor: pointer;
    //         transition: background-color 0.3s ease;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".border-svg",
    //       `
    //         position: absolute;
    //         transform: translate(-50%, 0%);
    //         top: 0px;
    //         pointer-events: none;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".border-svg rect",
    //       `
    //         height: calc(100% - 20px);
    //         width: calc(100% - 20px);
    //         stroke-dashoffset: 20;
    //         stroke: #f5f5f5;
    //         transition: stroke-dashoffset 0.2s ease,
    //           stroke 0.2s ease;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".modal:hover .border-svg rect",
    //       `
    //         stroke-dashoffset: 0;
    //         stroke: #e0e0e0;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".selected-file",
    //       `
    //           display: inline-block;
    //           padding: 10px 15px 10px 15px;
    //           background: #000000;
    //           border-radius: 9px;
    //           text-align: center;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".selected-file:hover",
    //       `
    //           background-color: #505050;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".selected-file-box",
    //       `
    //           display: flex;
    //           align-items: center;
    //           justify-content: center;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".selected-file-text",
    //       `
    //           margin: 0px 10px 0px 10px;
    //           color: #f0f0f0;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".selected-file-cancel-icon",
    //       `
    //           stroke: #a0a0a0;
    //           cursor: pointer;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".selected-file-cancel-icon:hover",
    //       `
    //           stroke: #fefefe;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".selected-file-proceed-icon",
    //       `
    //           stroke: #a0a0a0;
    //           cursor: pointer;
    //         `,
    //     ),
    //     new StyleItem(
    //       ".selected-file-proceed-icon:hover",
    //       `
    //           stroke: #fefefe;
    //         `,
    //     ),
    //   ],
    // );
    // return [];
  }
}
