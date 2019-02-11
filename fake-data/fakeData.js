const jobs = [
  {
    _id: '000000000000000000000000',
    title: 'New Job 1',
    description: 'Lorem ipsum dolor',
    comments: [],
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000001',
    title: 'New Job 2',
    description: 'Posuere sollicitudin',
    comments: ['222222222222222222222200'],
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000002',
    title: 'New Job 3',
    description: 'Lorem ipsum dolor sit',
    comments: ['222222222222222222222201', '222222222222222222222201'],
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000003',
    title: '7 things Lady Gaga has in common with cats',
    description: 'Posuere sollicitudin aliquam',
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000004',
    title: 'New Job 4',
    description: 'Lorem ipsum dolor sit amet',
    comments: ['222222222222222222222202'],
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000005',
    title: 'New Job 5',
    description: 'Posuere sollicitudin',

    comments: ['222222222222222222222203', '222222222222222222222202'],
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000006',
    title: 'New Job 6',
    description: 'Lorem ipsum dolor sit amet',

    comments: ['222222222222222222222202'],
    userId: '333333333333333333333301'
  },
  {
    _id: '000000000000000000000007',
    title: 'New Job 7',
    description: 'Posuere sollicitudi',
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

const events = [
  {
    _id: '422222222222222222222203',
    title: 'Call Bob',
    start: new Date(),
    end: new Date(),
    userId: '333333333333333333333301'
  },

  {
    _id: '422222222222222222222204',
    title: 'Call Rick',
    start: new Date(),
    end: new Date(),
    userId: '333333333333333333333301'
  },

  {
    _id: '422222222222222222222205',
    title: 'Call Susan',
    start: new Date(),
    end: new Date(),
    userId: '333333333333333333333301'
  }
];

module.exports = { jobs, comments, users, events };
