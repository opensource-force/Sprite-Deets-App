import { Component } from '../component.ts';
import { LeftColumn } from './left-column.ts';
import { MiddleColumn } from './middle-column.ts';
import { RightColumn } from './right-column.ts';
import { TopBar } from './top-bar.ts';

export class AppComponent extends Component {
  // Components
  topBar: TopBar = new TopBar();
  leftColumn: LeftColumn = new LeftColumn();
  middleColumn: MiddleColumn = new MiddleColumn();
  rightColumn: RightColumn = new RightColumn();

  constructor() {
    super('app-component', 'main-window');
  }

  override render(): void {
    const wrapper = document.getElementById('columns-container');

    this.attachComponent(this.topBar);

    this.attachComponent(this.leftColumn, wrapper);
    this.attachComponent(this.middleColumn, wrapper);
    this.attachComponent(this.rightColumn, wrapper);

    this.renderChildComponents();
  }
}
