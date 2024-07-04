import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isOpenMenu = false;

  menus = [
    {
      name: 'General',
      subMenus: [
        { name: 'Spacing', link: '/general/spacing' },
        { name: 'Brick & Block', link: '/general/brick-block' }
      ]
    },
    {
      name: 'Layout',
      subMenus: [
        { name: 'Section', link: '/layout/section' }
      ]
    },
    {
      name: 'Element',
      subMenus: [
        { name: 'Badge', link: '/element/badge' },
        { name: 'Badge Corner', link: '/element/badge-corner' },
        { name: 'Box', link: '/element/box' },
        { name: 'Button', link: '/element/button' },
        { name: 'Icon', link: '/element/icon' },
      ]
    },
    {
      name: 'Component',
      subMenus: [
        { name: 'Modal', link: '/component/modal' },
        { name: 'Navbar', link: '/component/navbar' },
        { name: 'Tab', link: '/component/tab' }
      ]
    },
    {
      name: 'Form',
      subMenus: [
        { name: 'Form', link: '/form/form' },
        { name: 'Checkbox', link: '/form/checkbox' },
        { name: 'Radio', link: '/form/radio' },
        { name: 'Select', link: '/form/select' }
      ]
    },
    {
      name: 'Shape',
      subMenus: [
        { name: 'Circle', link: '/shape/circle' },
        { name: 'Triangle', link: '/shape/triangle' }
      ]
    }
  ];
}