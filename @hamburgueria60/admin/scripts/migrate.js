const { ObjectID } = require('mongodb');
const path = require('path');
const fs = require('fs');
const capitalize = require('capitalize-pt-br');
const parse = require('./parse');
const items = require('../__data__/mysql/items.json');
const categories = require('../__data__/mysql/categories.json');
const { connect, insertMany } = require('./persist');
const tag = require('./tag');

(async () => {
  const connection = await connect();
  const db = connection.db();

  const output = {};

  const mapCategories = {};
  const newCategories = categories.map((category) => {
    const id = new ObjectID();
    mapCategories[category.categoryId] = { ...category, $id: id, tag: tag(category.name) };
    return mapCategories[category.categoryId];
  });

  output.items = items.filter(item => !!item.name).map((item) => {
    const { itemId, ...itemProps } = item;
    return {
      _id: new ObjectID(),
      ...itemProps,
      name: capitalize(itemProps.name),
      tag: tag(itemProps.name.toLowerCase()).replace(/\s/g, '-'),
      categoryId: mapCategories[`${item.categoryId}`].$id,
      categoryName: mapCategories[`${item.categoryId}`].name,
      categoryTag: mapCategories[`${item.categoryId}`].tag,
    };
  });

  output.categories = newCategories.map((category) => {
    const { $id, categoryId, ...categoryProps } = category;
    return { _id: $id, ...categoryProps };
  });

  fs.writeFileSync(path.resolve('./__data__/mongo/items.json'), parse(output.items));
  fs.writeFileSync(path.resolve('./__data__/mongo/categories.json'), parse(output.categories));

  await insertMany(db, 'Item', output.items);
  await insertMany(db, 'Category', output.categories);

  connection.close();
})();
