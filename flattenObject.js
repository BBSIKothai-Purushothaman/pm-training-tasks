// flattenObject.js
// Example of flattening a nested object using destructuring, spread and rest.

const flattenObject = (obj, parentKey = "") => {
  // Object.entries + array destructuring `[key, value]`
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = parentKey ? `${parentKey}_${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      // Recursive flattening; spread to merge results
      return {
        ...acc,
        ...flattenObject(value, newKey),
      };
    }

    return {
      ...acc,
      [newKey]: value,
    };
  }, {});
};

// Example nested object
const user = {
  id: 1,
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Wonderland",
    meta: {
      timezone: "UTC+1",
      verified: true,
    },
  },
  preferences: {
    theme: "dark",
  },
};

// Destructuring with *rest* to show we can pull out a nested piece
const { address, ...userWithoutAddress } = user;

// `addressRest` collects remaining address fields using rest `...`
const { street, ...addressRest } = address;

// Show we can flatten multiple objects and merge them with spread
const flattenAll = (...objects) =>
  objects.reduce(
    (acc, current) => ({
      ...acc,
      ...flattenObject(current),
    }),
    {}
  );

const flattened = flattenAll(userWithoutAddress, { address: { street, ...addressRest } });

console.log("Original user:", JSON.stringify(user, null, 2));
console.log("Flattened user:", JSON.stringify(flattened, null, 2));

/*
Example flattened output:

{
  "id": 1,
  "name": "Alice",
  "address_street": "123 Main St",
  "address_city": "Wonderland",
  "address_meta_timezone": "UTC+1",
  "address_meta_verified": true,
  "preferences_theme": "dark"
}
*/
