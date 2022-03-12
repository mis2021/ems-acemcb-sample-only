import { prisma } from "../../../lib/prisma";

// module.exports = {
//     Query : {
//         notes: async () => await prisma.note.findMany(),
//     }
// }

// export const resolver = {
//     Query : {
//         notes: async () => await prisma.note.findMany(),
//     }
// }


module.exports = 
    {
        Query: {
            links: async () => await prisma.link.findMany(),
        }
    };

