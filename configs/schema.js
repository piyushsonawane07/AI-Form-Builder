const { pgTable, serial, text, varchar, integer } = require("drizzle-orm/pg-core");

export const forms = pgTable('forms', {
    id: serial('id').primaryKey(),
    jsonForm: text('jsonForm').notNull(),
    theme: varchar('theme'),
    background: varchar('background'),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull()
});

export const userResponses = pgTable('userResponses', {
    id: serial('id').primaryKey(),
    jsonResponse: text('jsonResponse').notNull(),
    createdBy: varchar('createdBy').default('anonymus'),
    createdAt: varchar('createdAt').notNull(),
    formRef: integer('formRef').references(()=>forms.id)
}) 

