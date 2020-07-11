const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if they are logged in
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info
    );

    return item;
  },

  async updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{ id title }`);
    // 2. check if they own the item or have the permission
    // TODO
    // 3. delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash their password
    // bcrypt is asyncronous
    const password = await bcrypt.hash(args.password, 10);
    // create user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          // permissions - since you're reaching to external enum
          // you have to set it like this:
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    // create JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true, // preventing js attacks
      maxAge: 1000 * 60 * 24 * 365, // 1 year cookie
    });
    // return the user to the browser
    return user;
  },
};

module.exports = Mutations;
