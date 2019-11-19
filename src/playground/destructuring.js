//?
//? Object destructuring
//?

// const person = {
//     name: 'Jagdish',
//     age: 39,
//     location: {
//         city: 'New Delhi',
//         temp: 92
//     }
// };

// const { name = 'Anonymous', age } = person;                 // Default value example
// console.log(`${name} is ${age}.`);

// const { city, temp: temperature } = person.location;        // Local variable name example
// if (city && temperature)
// console.log(`Its ${temperature} in ${city}`);

//?
//* Array destructring
//?

const address = ['2206 Mantova, Mahagun Moderne', 'Noida', 'Uttar Pradesh', '201301'];
const [street, city, state = 'UP'] = address;
console.log(`You are in ${city}, ${state}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);