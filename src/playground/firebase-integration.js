import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();


// child_removed event
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// child_changed event
database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// child_added event
database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// child_moved event
database.ref('expenses').on('child_moved', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

//? Subscribing arrays/lists data changes
database.ref('expenses').on('value', (snapshot) => {
    const expenses = [];

    snapshot.forEach((childSnapshot) => {
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
    });

    console.log(expenses);
}, (e) => {
    console.log('Error in fetching the data from firebase', e);
});

//? Reading arrays/lists
database.ref('expenses')
  .once('value')
  .then((snapshot) => {
    const expenses = [];

    snapshot.forEach((childSnapshot) => {
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
    });

    console.log(expenses);
  });

//* Adding data to arrays/lists

database.ref('expenses').push({
    description: 'Rent',
    note: 'Monthly house rent',
    amount: 109500,
    createdAt: 976123498763
});

database.ref('expenses').push({
    description: 'Phone bill',
    note: 'Monthly phone rent',
    amount: 5900,
    createdAt: 976123498763
});

database.ref('expenses').push({
    description: 'Food',
    note: 'Monthly groceries',
    amount: 199500,
    createdAt: 976123498763
});

database.ref('expenses').push({
    description: 'Fuel',
    note: 'Monthly fuel bills',
    amount: 109500,
    createdAt: 976123498763
});

//* Create data
database.ref().set({
    name: 'Jagdish Salgotra',
    age: 38,
    stressLevel: 6,
    isSingle: false,
    job: {
        title: 'Software Developer',
        company: 'Google'
    },
    location: {
        city: 'Jammu',
        country: 'India'
    }
}).then(() => {
    console.log('Data is saved!');
}).catch((e) => {
    console.log('This failed.', e);
});

//? Read Data
const onValueChange = database.ref().on('value', (snapshot) => {
   console.log(snapshot.val());
}, (e) => {
    console.log('Error with data fetching!!');
});

setTimeout(() => {
    database.ref('age').set(37);
}, 5000);

setTimeout(() => {
    database.ref().off('value', onValueChange);
}, 8000);

setTimeout(() => {
    database.ref('age').set(39);
}, 11500);

database.ref().on('value', (snapshot) => {
    const val = snapshot.val();
    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
});

database.ref()
    .once('value')
    .then((snapshot) => {
        const val = snapshot.val();
        console.log(val);
    })
    .catch((e) => {
        console.log('Error fetching data', e);
    });

//? Update data
database.ref().update({
    stressLevel: 9,
    'job/company': 'Amazon',
    'location/city': 'Gurgaon'
});

//! Delete Data
database.ref('isSingle').remove()
    .then(() => {
        console.log('Data was removed.');
    }).catch((e) => {
        console.log('Did not remove data.');
    });