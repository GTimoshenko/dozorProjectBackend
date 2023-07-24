import mongoose from 'mongoose';
//схема команды
const teamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
        unique: true,
	},

    passwordHash: {
		type: String,
		required: true,
    },

    members: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
      
});
export default mongoose.model('Team', teamSchema);
