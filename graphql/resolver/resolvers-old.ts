import { prisma } from "../../lib/prisma";
const bcrypt = require("bcrypt");

export const resolvers = {
  Query: {
    // links: async () => await prisma.link.findMany(),
    notes: async () => await prisma.note.findMany(),
    products: async () => {
      return {
        products: "hello",
        desc: "hi"
      }
    },
  },
  Mutation: {
    userRegistration: async (root, args, context) => {
      var hash = bcrypt.hashSync(args.password, 10);
      const { password, ...register } = await prisma.user.create({
        data: {
          username: args.username,
          password: hash,
          email : '',
          name: '',
        },
      });
      return {
        id: register.id,
        username: args.username,
      };
    },

    userLogin: async (root, args, context) =>{
        const { password, ...user } = await prisma.user.findFirst({
            where: {
              username: args.username
            },
          })
          var validpass = await bcrypt.compareSync(args.password, password)
          if (validpass) {
            return user
          }

          return { }
    }


  },
};
