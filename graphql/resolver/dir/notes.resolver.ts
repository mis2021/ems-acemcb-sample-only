import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

module.exports = 
    {
        Query: {
            notes: async () => await prisma.note.findMany(),
        },
        Mutation: {
            upsertNotes: async (root, args, context) => {
                let item = {}

                if(args.id){
                    item =  await prisma.note.update({
                        where:{
                            id: args.id
                        },
                        data: {
                           title:  args.title,
                           content: args.content
                        },
                      });
                }else{
                    item =  await prisma.note.create({
                        data: {
                           title:  args.title,
                           content: args.content
                        },
                      });
                }

                  return item;
            },
            deleteNote: async (root, args, context) => {
              const item =  await prisma.note.delete({
                  where: {
                      id: args.id
                  }
              })

              return item;
            } 
        }
    };

