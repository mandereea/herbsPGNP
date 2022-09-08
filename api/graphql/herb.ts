import { arg, objectType, inputObjectType, extendType, nonNull, intArg, stringArg, list } from "nexus";
import {TimeOfDay, Taste, Temperament} from "./enums"
// 'definition' method allows you to define
// the fields of your object type
// as well as the relationships.
export const Herb = objectType({
  name: "Herb",
  definition(t) {
    t.nonNull.int("id");
    t.string("latin");
    t.string("ro");
    t.string("english");
    t.string("tcm");
    t.list.string("folk");
    t.list.string("images");
    t.field("temperament", {type: Temperament})
    t.list.string("quality");
    t.list.field("taste", {type: Taste})
    t.string("category");
    t.list.string("skills");
    t.list.string("enemies");
    t.list.string("dontUse");
    t.boolean("available");
    t.list.field("potions", {
      type: "Potion",
      resolve: (parent, _, ctx) => {
        return ctx.db.herb.findUnique({
          where: { id: parent.id || undefined },
        }).potions();
      },
    });
  },
});