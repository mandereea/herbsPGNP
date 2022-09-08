import { arg, inputObjectType, objectType, extendType, nonNull, intArg, stringArg, list, enumType } from "nexus";
import {TimeOfDay, Taste} from "./enums"


// 'definition' method allows you to define
// the fields of your object type
// as well as the relationships.
export const Element = objectType({
  name: "Element",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.string("season");
    t.string("environmentalFactor");
    t.string("direction");
    t.field("time", {type: TimeOfDay});
    t.field("taste", {type: Taste});
    t.string("color");
    t.string("sound");
    t.string("emotion");
    t.field("organ", {
      type: 'Organ',
      resolve: (parent, _, ctx) => {
        return ctx.db.element.findUnique({
          where: { id: parent.id || undefined },
        }).organ();
      },
    });
  },
});

export const ElementInputType = inputObjectType({
  name: "ElementInputType",
  definition(t) {
    t.nonNull.int("id");
  },
});

export const ElementQuery = extendType({
  type: "Query",
  definition(t) {
    // get all elements
    t.list.field("elements", {
      type: "Element",
      resolve(_root, _args, ctx) {
        // console.log(_root, _args, ctx);
        return ctx.db.element.findMany();
      },
    });
    // get element by id
    t.field('element', {
        type: 'Element',
        args: {
            id: nonNull(intArg()),
        },
        resolve(_root, args, ctx) {
            return ctx.db.element.findUnique({
                where: { id: args.id },
            });
        },
    });
    t.field('organ', {
        type: 'Organ',
        args: {
          organId: nonNull(intArg()),
      },
        resolve(_root, args, ctx) {
            return ctx.db.organ.findUnique({
              where: { id: args.organId },
          });
        },
    });
  },
});

export const ElementMutation = extendType({
  type: 'Mutation',
  definition(t) {
      // create a new element
      t.nonNull.field('createElement', {
          type: 'Element',
          args: {
              id: intArg(),
              name: nonNull(stringArg()),
              season: nonNull(stringArg()),
              environmentalFactor: nonNull(stringArg()),
              direction: nonNull(stringArg()),
              time: nonNull( arg({
                type: TimeOfDay,
            }),),
              taste: nonNull( arg({
                type: Taste,
            }),),
              color: nonNull(stringArg()),
              sound: nonNull(stringArg()),
              emotion: nonNull(stringArg()),
              organId: intArg(),
              // organ: arg({
              //     type: 'OrganInputType',
              // }),
          },
          async resolve(_root, args, ctx) {
              return await ctx.db.element.create({
                  data: {
                    name: args.name,
                    season: args.season,
                    environmentalFactor: args.environmentalFactor,
                    direction: args.direction,
                    time: args.time,
                    taste: args.taste,
                    color: args.color,
                    sound: args.sound,
                    emotion: args.emotion,
                    organ: {
                          connect: { id: args.organId || undefined }
                      },
                  },
              });
          },
      });
      // update an element by id
      // t.field('updateElement', {
      //     type: 'Element',
      //     args: {
      //       id: nonNull(intArg()),
      //       name: stringArg(),
      //       season: stringArg(),
      //       environmentalFactor: stringArg(),
      //       direction: stringArg(),
      //       time:  arg({
      //         type: TimeOfDay,
      //     }),
      //       taste:  arg({
      //         type: Taste,
      //     }),
      //       color: stringArg(),
      //       sound: stringArg(),
      //       emotion: stringArg(),
      //     },
      //     resolve(_root, args, ctx) {
      //         return ctx.db.element.update({
      //             where: { id: args.id },
      //             data: {
      //               name: args.name,
      //               season: args.season,
      //               environmentalFactor: args.environmentalFactor,
      //               direction: args.direction,
      //               time: args.time,
      //               taste: args.taste,
      //               color: args.color,
      //               sound: args.sound,
      //               emotion: args.emotion,
      //             },
      //         });
      //     },
      // });
      // delete a company by id
      t.field('deleteElement', {
          type: 'Element',
          args: {
              id: nonNull(intArg()),
          },
          resolve(_root, args, ctx) {
              return ctx.db.element.delete({
                  where: { id: args.id },
              });
          },
      });
  },
});

// {
//   "name": "name",
//   "season": "season",
//   "environmentalFactor": "bleach",
//   "direction": "forward",
//   "time": "MID_DAY",
//   "taste": "SOUR",
//   "color": "Orange",
//   "sound": "Sigh",
//   "emotion": "Hope",

// }