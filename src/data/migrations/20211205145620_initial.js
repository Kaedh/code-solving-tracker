
exports.up = function(knex) {
  knex.schema.createTable("tbcode", table => {
    table.increments("id");
    table.integer("codeid").notNullable();
    table.string("codeurl").notNullable();
    table.boolean("solved");
    table.boolean("activechallenge");
  })
};

exports.down = knex => knex.schema.dropTableIfExists("tbcode");