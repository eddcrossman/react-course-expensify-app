const addExpenses = () => {
    const expenses = [{
        description: 'gum',
        note: '',
        amount: 195,
        createdAt: 0
    },{
        description: 'rent',
        note: '',
        amount: 195000,
        createdAt: 1000
    },{
        description: 'credit card',
        note: '',
        amount: 4500,
        createdAt: 100000
    }];

    expenses.forEach((expense) => {
        firebase.push(firebase.ref(database, 'expenses'), expense);
    })
}

// addExpenses();

const printExpenses = (snapshot) => { 
    const expenses = [];

    snapshot.forEach((childSnapshot) => {
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
    });

    console.log(expenses);
};


// firebase.onValue(firebase.ref(database, 'expenses'), printExpenses, {
//         onlyOnce: true
//     }
// );

// firebase.onValue(firebase.ref(database, 'expenses'), printExpenses, 
//     (e) => {
//         console.log('Error with data fetching ', e);
//     }
// );

// firebase.onChildRemoved(firebase.ref(database, 'expenses'), (snapshot) => {
//         console.log(snapshot.key, snapshot.val())
//     }, (e) => {
//         console.log('Error with data fetching ', e);
//     }
// );

// firebase.onChildChanged(firebase.ref(database, 'expenses'), (snapshot) => {
//         console.log(snapshot.key, snapshot.val())
//     }, (e) => {
//         console.log('Error with data fetching ', e);
//     }
// );

firebase.onChildAdded(firebase.ref(database, 'expenses'), (snapshot) => {
    console.log(snapshot.key, snapshot.val())
}, (e) => {
    console.log('Error with data fetching ', e);
}
);

setTimeout(addExpenses, 5000);




// firebase.remove(firebase.ref(database, 'notes/-NWCVSulneOv1FIAK7Py'));

// firebase.update(firebase.ref(database, 'notes/-NWCVSulneOv1FIAK7Py'), {
//     body: 'updated'
// });

// const id = firebase.push(firebase.ref(database, 'notes'), {
//     title: 'other things',
//     body: 'test'
// });


// const firebaseNotes = {
//     notes: {
//         123: {
//             title: 'first note',
//             note: 'note'
//         },
//         456: {
//             title: 'second note',
//             note: 'note'
//         }
//     }
// };

// firebase.set(firebase.ref(database), notes);

// firebase.set(firebase.ref(database), {
//     username: 'Edward John',
//     age: 40,
//     stressLevel: 6,
//     job: {
//         title: 'charity',
//         company: 'UL'
//     },
//     location : {
//         city: 'Manchester',
//         country: 'England'
//     }
// }).then(() => {
//     console.log('Data is saved');
// }).catch((e) => {
//     console.log('This failed', e);
// });

// remove(ref(database, "location/city")).then(() => {
//     console.log('city removed');
// });

// firebase.update(firebase.ref(database), {
//     stressLevel: 9,
//     'job/company' : 'NL',
//     'location/city' : 'London'
// })


// firebase.onValue(firebase.ref(database), 
//     (snapshot) => { 
//         const val = snapshot.val();
//         console.log(val);
//     }, {
//         onlyOnce: true
//     }
// )

// const off = firebase.onValue(firebase.ref(database), 
//     (snapshot) => { 
//         const data = snapshot.val();
//         console.log(`${data.username} is a ${data.job.title} at ${data.job.company}`)
//     }, (e) => {
//         console.log('Error with data fetching ', e);
//     }
// );

// setTimeout(() => {
//     firebase.update(firebase.ref(database), {
//         username: 'bob'
//     })
// }, 5000)