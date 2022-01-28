const jokes = require('../../api/jokes/jokes-data')


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jokes').del()
    .then(function () {
      return knex('jokes').insert(jokes);
    });
};
