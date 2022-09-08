import { arg, objectType, inputObjectType, extendType, nonNull, intArg, stringArg, list } from "nexus";
import {TimeOfDay, Taste, Temperament} from "./enums"
// 'definition' method allows you to define
// the fields of your object type
// as well as the relationships.

//one-to-many with Ingredients
//many-to-many with Herbs
export const Potion = objectType({
  name: "Potion",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.list.string("use");
    t.string("bestSeason");
    t.string("potionType");
    t.string("methodDescription");
    t.string("time");
    t.boolean("available");
    t.list.field("ingredients", {
      type: "Ingredient",
      resolve: (parent, _, ctx) => {
        return ctx.db.potion.findUnique({
          where: { id: parent.id || undefined },
        }).ingredients();
      },
    })
    t.list.field("herbs", {
      type: "Herb",
      resolve: (parent, _, ctx) => {
        return ctx.db.potion.findUnique({
          where: { id: parent.id || undefined },
        }).herbs();
      },
    });
  },
});

export const PotionQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("potions", {
      type: "Potion",
      resolve(_root, _args, ctx) {
        return ctx.db.potion.findMany()
      }
    })
    //potion by ID
    t.field("potion", {
      type:"Potion",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.potion.findUnique({
          where: { id: args.id}
        })
      }
    })
    t.field('ingredients', {
      
    })
  }

})