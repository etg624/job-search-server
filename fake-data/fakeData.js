const jobs = [
  {
    _id: '000000000000000000000000',
    title: 'New Job 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    comments: [],
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000001',
    title: 'New Job 2',
    description:
      'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.',
    comments: ['222222222222222222222200'],
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000002',
    title: 'New Job 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    comments: ['222222222222222222222201', '222222222222222222222201'],
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000003',
    title: '7 things Lady Gaga has in common with cats',
    description:
      'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.',
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000004',
    title: 'New Job 4',
    description:
      'Lorem ipsum dolor sit amet, boring consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    comments: ['222222222222222222222202'],
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000005',
    title: 'New Job 5',
    description:
      'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.',

    comments: ['222222222222222222222203', '222222222222222222222202'],
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000006',
    title: 'New Job 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

    comments: ['222222222222222222222202'],
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000007',
    title: 'New Job 7',
    description:
      'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.',
    userId: '333333333333333333333301'
  }
];

const comments = [
  {
    _id: '222222222222222222222200',
    content: 'Cool Jobs',
    userId: '333333333333333333333301'
  },
  {
    _id: '222222222222222222222201',
    content: 'Sweet Job',
    userId: '333333333333333333333301'
  },
  {
    _id: '222222222222222222222202',
    content: 'Lame Job',
    userId: '333333333333333333333301'
  },
  {
    _id: '222222222222222222222203',
    content: 'Amazing Job!',
    userId: '333333333333333333333302'
  }
];

const users = [
  {
    _id: '333333333333333333333301',
    fullname: 'Bob User',
    username: 'bobuser',
    // hash digest for the string 'password'
    password: 'bobspassword'
  },
  {
    _id: '333333333333333333333302',
    fullname: 'Slob User',
    username: 'slobUser',
    // hash digest for the string 'password'
    password: 'slobspassword'
  }
];

module.exports = { jobs, comments, users };
