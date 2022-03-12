import { prisma } from "../../../lib/prisma";
const bcrypt = require("bcrypt");

module.exports = {
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
            // const { password, ...user } = await prisma.user.findFirst({
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
    }
}