const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Test Node',
          email: 'admin@testNode.com',
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
          admin: true,
        },
      ],
      {}
    );
  },

  down: () => {},
};
