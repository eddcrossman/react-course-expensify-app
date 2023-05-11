
/*
==================OBJECT DESTRUCTURING
*/


// const person = {
//     age: 40,
//     location: {
//         city: 'Manchester',
//         temp: 10
//     }
// };

// const { name: thename = 'anon', age } = person;

// console.log(`${thename} is ${age}`);

// const book = {
//     title: 'God Emperor of Dune',
//     author: 'Frank Herbert',
//     publisher: {
//         name: 'Gollancz'
//     }
// }

// const { name : publisherName = 'Self-pubished' } = book.publisher;
// console.log(publisherName);


/*
==================ARRAY DESTRUCTURING
*/

const address = ['14 Guildford Road','Manchester', ,'M19 3FP'];

const [, city, state = 'EU'] = address;

console.log(`you are in ${city}, ${state}`)

const item = ['Coffee', '£1', '£2', '£3'];

const [itemName, , price] = item
console.log(`A medium ${itemName} costs ${price}`);
