import { arg, objectType, inputObjectType, extendType, nonNull, intArg, stringArg, list } from "nexus";

export const Ingredient = objectType({
  name: "Ingredient",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.string("ratio");
    t.string("quantity");
    t.boolean("isHerb");
    t.field("potion", {
      type: "Potion",
      resolve: (parent, _, ctx) => {
        return ctx.db.ingredient.findUnique({
          where: { id: parent.id || undefined },
        }).potion();
      },
    });
  },
});

export const IngredientQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("ingredients", {
      type: "Ingredient",
      resolve(_root, _args, ctx) {
        return ctx.db.ingredient.findMany()
      }
    })
    //potion by ID
    t.field("potion", {
      type:"Ingredient",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.ingredient.findUnique({
          where: { id: args.id}
        })
      }
    })
    t.field('potion', {
      type: "Potion",
      args: {
        potionId:nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.potion.findUnique({
          where: { id: args.potionId}
        })
      }
    })
  }

})