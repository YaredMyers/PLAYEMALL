const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  name: {type: String},
  games: [{ type: Schema.Types.ObjectId, ref: "SingleGame" }]
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
