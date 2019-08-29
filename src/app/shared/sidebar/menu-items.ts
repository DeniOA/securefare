import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Personal',
    icon: '',
    class: 'nav-small-cap',
    label: '',
    labelClass: '',
    extralink: true,
    submenu: []
  },
  {
    path: 'dashboard',
    title: 'Dashboards',
    icon: 'mdi mdi-gauge',
    class: '',
    label: '',
    labelClass: 'label label-rouded label-themecolor',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Account Settings',
    icon: 'mdi mdi-lock',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      
      {
        path: 'sample-pages/profile/:id',
        title: 'Profile',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      
      {
        path: 'sample-pages/invoice',
        title: 'Invoice',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      
    ]
  },

  {
    path: 'purchased-tickets',
    title: 'Purchased Tickets',
    icon: 'fa fa-ticket',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: []
      
    },
      
  {
    path: '',
    title: 'Financials',
    icon: 'fa fa-money',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: 'financials/transactions-list',
        title: 'Transactions List',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'financials/daily-sales',
        title: 'Daily Sales',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'financials/station-sales',
        title: 'Station Sales',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'financials/e-transactions',
        title: 'E-wallet Transactions',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'financials/e-summary',
        title: 'Summary E-wallet Transactions',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
  ]
  },

  {
    path: '',
    title: 'Lists',
    icon: 'fa fa-list',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: 'lists/staff-list',
        title: 'Staff List',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'lists/agent-list',
        title: 'Agent List',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      
      {
        path: 'lists/device-list',
        title: 'Device List',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'lists/passenger-list',
        title: 'Passenger List',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Create Train',
    icon: 'mdi mdi-train',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: 'create-train/train',
        title: 'Train',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
      
    ]
  },
  {
    path: '',
    title: 'Payment',
    icon: 'mdi mdi-train',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: 'payment/topup',
        title: 'Top-Up',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
      
    ]
  },
  {
    path: '',
    title: 'Create Schedule',
    icon: 'fa fa-calendar-o',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: 'create-schedule/schedule',
        title: 'Schedule',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'create-schedule/holiday',
        title: 'Holiday',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
      
    ]
  },

  {
    path: '',
    title: 'Create Users',
    icon: 'fa fa-user-o',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: 'create-users/teller',
        title: 'Teller',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'create-users/supervisor',
        title: 'Supervisor',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'create-users/operator',
        title: 'Operator',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'create-users/finance',
        title: 'Finance',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'create-users/agent',
        title: 'Agent',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
    ]
  },


  {
    path: '',
    title: 'Menu Levels',
    icon: 'mdi mdi-arrange-send-backward',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: 'javascript:void(0);',
        title: 'Second Level',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: true,
        submenu: []
      },
      {
        path: '',
        title: 'Second Child',
        icon: '',
        class: 'has-arrow',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: [
          {
            path: 'javascript:void(0);',
            title: 'Third 1.1',
            icon: '',
            class: '',
            label: '',
            labelClass: '',
            extralink: false,
            submenu: []
          },
          {
            path: 'javascript:void(0);',
            title: 'Third 1.2',
            icon: '',
            class: '',
            label: '',
            labelClass: '',
            extralink: false,
            submenu: []
          }
        ]
      }
    ]
  },
  {
    path: '',
    title: 'Apps',
    icon: 'mdi mdi-apps',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: 'apps/email',
        title: 'Mailbox',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'apps/fullcalendar',
        title: 'Calendar',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'apps/taskboard',
        title: 'Taskboard',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'UI Components',
    icon: '',
    class: 'nav-small-cap',
    label: '',
    labelClass: '',
    extralink: true,
    submenu: []
  },
  {
    path: '',
    title: 'Component',
    icon: 'mdi mdi-bullseye',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      
      {
        path: 'component/dropdown',
        title: 'Dropdown',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      
      {
        path: 'component/rating',
        title: 'Ratings',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
      
    ]
  },
  {
    path: '',
    title: 'Extra Components',
    icon: 'mdi mdi-dropbox',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
    
      {
        path: 'extra-component/upload',
        title: 'File Upload',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Forms & Tables',
    icon: '',
    class: 'nav-small-cap',
    label: '',
    labelClass: '',
    extralink: true,
    submenu: []
  },
  {
    path: '',
    title: 'Forms',
    icon: 'mdi mdi-file',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: 'forms/basicform',
        title: 'Basic Forms',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'forms/formvalidation',
        title: 'Form Validation',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'component/typehead',
        title: 'Form Typehead',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'component/datepicker',
        title: 'Datepicker',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'component/language-datepicker',
        title: 'Language Datepicker',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Tables',
    icon: 'mdi mdi-table',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: 'tables/basictable',
        title: 'Basic Tables',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'tables/smarttable',
        title: 'Smart Tables',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: 'tables/datatable',
        title: 'Data Tables',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  // {
  //   path: '',
  //   title: 'Charts & Icons',
  //   icon: '',
  //   class: 'nav-small-cap',
  //   label: '',
  //   labelClass: '',
  //   extralink: true,
  //   submenu: []
  // },
  // {
  //   path: '',
  //   title: 'Charts',
  //   icon: 'mdi mdi-chart-arc',
  //   class: 'has-arrow',
  //   label: '',
  //   labelClass: '',
  //   extralink: false,
  //   submenu: [
  //     {
  //       path: 'charts/chartjs',
  //       title: 'Chart Js',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: 'charts/chartistjs',
  //       title: 'Chartist Js',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'Icons',
  //   icon: 'mdi mdi-brush',
  //   class: 'has-arrow',
  //   label: '',
  //   labelClass: '',
  //   extralink: false,
  //   submenu: [
  //     {
  //       path: 'icons/fontawesome',
  //       title: 'Fontawesome',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: 'icons/simpleline',
  //       title: 'Simple Line Icons',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: 'icons/material',
  //       title: 'Material Icons',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'Pages',
  //   icon: '',
  //   class: 'nav-small-cap',
  //   label: '',
  //   labelClass: '',
  //   extralink: true,
  //   submenu: []
  // },
  {
    path: '',
    title: 'Authentication',
    icon: 'mdi mdi-lock',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: '/login',
        title: 'Login',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
   
    
      {
        path: '/signup',
        title: 'Sign up',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/404',
        title: '404',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
    ]
  },

];
