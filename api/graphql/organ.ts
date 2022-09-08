import { arg, objectType, inputObjectType, extendType, nonNull, intArg, stringArg, list } from "nexus";
// 'definition' method allows you to define
// the fields of your object type
// as well as the relationships.
export const Organ = objectType({
  name: "Organ",
  definition(t) {
    t.nonNull.int("id");
    t.string("viscera");
    t.string("partner");
    t.string("senseOrgan");
    t.string("tissue");
    t.field("element", {
      type: "Element",
      resolve: (parent, _, ctx) => {
        return ctx.db.organ.findUnique({
          where: { id: parent.id || undefined },
        }).element();
      },
    });
  },
});

export const OrganInputType = inputObjectType({
  name: "OrganInputType",
  definition(t) {
    t.nonNull.int("id");
    // t.string("viscera");
    // t.string("partner");
    // t.string("senseOrgan");
    // t.string("tissue");
  },
});

//the name of the method defining a field
// already expresses the type of the response
//  (in the code below: t.int, t.string, t.field
// for relationships to an object type,
// and t.list.field denoting a list of relationships to an object type).

export const OrganQuery = extendType({
  type: "Query",
  definition(t) {
    // get all organs
    t.list.field("organs", {
      type: "Organ",
      resolve(_root, _args, ctx) {
        console.log(_root, _args, ctx);
        return ctx.db.organ.findMany();
      },
    });
    // get organ by id
    t.field('organ', {
        type: 'Organ',
        args: {
            id: nonNull(intArg()),
        },
        resolve(_root, args, ctx) {
            return ctx.db.organ.findUnique({
                where: { id: args.organId },
            });
        },
    });
    t.field('element', {
        type: 'Element',
        args: {
          organId: nonNull(intArg()),
      },
        resolve(_root, args, ctx) {
            return ctx.db.element.findUnique({
              where: { id: args.id },
          });
        },
    });
  },
});

export const OrganMutation = extendType({
  type: 'Mutation',
  definition(t) {
      // create a new organ
      t.nonNull.field('createOrgan', {
          type: 'Organ',
          args: {
              id: intArg(),
              viscera: nonNull(stringArg()),
              partner: nonNull(stringArg()),
              senseOrgan: nonNull(stringArg()),
              tissue: nonNull(stringArg()),
          },
          resolve(_root, args, ctx) {
            console.log(_root, args, ctx)
              return ctx.db.organ.create({
                  data: {
                    viscera: args.viscera,
                    partner: args.partner,
                    senseOrgan: args.senseOrgan,
                    tissue: args.tissue,
                  },
              });
          },
      });
      // update a organ by id
      t.field('updateOrgan', {
          type: 'Organ',
          args: {
            id: nonNull(intArg()),
            viscera: stringArg() ,
            partner: stringArg(),
            senseOrgan: stringArg(),
            tissue: stringArg(),
          },
          resolve(_root, args, ctx) {
              return ctx.db.organ.update({
                  where: { id: args.id },
                  data: {
                    viscera: args.viscera,
                    partner: args.partner,
                    senseOrgan: args.senseOrgan,
                    tissue: args.tissue,
                  },
              });
          },
      });
      // delete an organ by id
      t.field('deleteOrgan', {
          type: 'Organ',
          args: {
              id: nonNull(intArg()),
          },
          resolve(_root, args, ctx) {
              return ctx.db.organ.delete({
                  where: { id: args.id },
              });
          },
      });
  },
});
