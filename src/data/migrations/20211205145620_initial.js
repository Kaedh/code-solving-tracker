
exports.up = function(knex) {
  knex.schema.createTable("tbcode", table => {
    table.increments("id");
    table.integer("codeId").notNullable();
    table.string("codeUrl").notNullable();
    table.boolean("solved");
  })
};

exports.down = knex => knex.schema.dropTableIfExists("tbcode");