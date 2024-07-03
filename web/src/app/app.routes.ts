import { Routes } from '@angular/router';
import { ModalComponent } from './component/modal.component';
import { NavbarComponent } from './component/navbar.component';
import { TabComponent } from './component/tab.component';
import { BadgeCornerComponent } from './element/badge-corner.component';
import { BadgeComponent } from './element/badge.component';
import { BoxComponent } from './element/box.component';
import { IconComponent } from './element/icon.component';
import { ButtonComponent } from './element/button.component';
import { CheckboxComponent } from './form/checkbox.component';
import { FormComponent } from './form/form.component';
import { RadioComponent } from './form/radio.component';
import { SelectComponent } from './form/select.component';
import { BrickBlockComponent } from './general/brick-block.component';
import { HelperComponent } from './general/helper.component';
import { SpacingComponent } from './general/spacing.component';
import { VariablesComponent } from './general/variables.component';
import { SectionComponent } from './layout/section.component';
import { CircleComponent } from './shape/circle.component';
import { TriangleComponent } from './shape/triangle.component';

export const routes: Routes = [
  {
    path: 'component',
    children: [
      {
        path: 'modal',
        component: ModalComponent,
      },
      {
        path: 'navbar',
        component: NavbarComponent,
      },
      {
        path: 'tab',
        component: TabComponent,
      },
    ]
  },
  {
    path: 'element',
    children: [
      {
        path: 'badge',
        component: BadgeComponent,
      },
      {
        path: 'badge-corner',
        component: BadgeCornerComponent,
      },
      {
        path: 'box',
        component: BoxComponent,
      },
      {
        path: 'button',
        component: ButtonComponent,
      },
      {
        path: 'icon',
        component: IconComponent,
      },
    ]
  },
  {
    path: 'form',
    children: [
      {
        path: 'checkbox',
        component: CheckboxComponent,
      },
      {
        path: 'form',
        component: FormComponent,
      },
      {
        path: 'radio',
        component: RadioComponent,
      },
      {
        path: 'select',
        component: SelectComponent,
      }
    ],
  },
  {
    path: 'general',
    children: [
      {
        path: 'brick-block',
        component: BrickBlockComponent,
      },
      {
        path: 'helper',
        component: HelperComponent,
      },
      {
        path: 'spacing',
        component: SpacingComponent,
      },
      {
        path: 'variables',
        component: VariablesComponent,
      }
    ],
  },
  {
    path: 'layout',
    children: [
      {
        path: 'section',
        component: SectionComponent,
      }
    ],
  },
  {
    path: 'shape',
    children: [
      {
        path: 'circle',
        component: CircleComponent,
      },
      {
        path: 'triangle',
        component: TriangleComponent,
      }
    ],
  },
];
