const { forwardTo } = require('prisma-binding');

const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there's a current user id
    if (!ctx.request.userId) {
      // someone may not be logged in, but it's not an error
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // 1. check if they're logged in
    // refactor this into a separate function:
    if (!ctx.request.userId) {
      throw new Error('You must be logged in.');
    }
    // 2. check if user has the permission to query all users
    console.log('query userId: ', ctx.request.userId);
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    // 3. if they do, query all the users
    // empty "where" object
    // info with the fields requested from frontend
    return ctx.db.query.users({}, info);
  },
};

module.exports = Query;
