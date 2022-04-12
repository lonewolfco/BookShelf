const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne(
                    {_id: context.user._id}).select('-__v-password');

                    return userData;
            }
            throw new AuthenticationError("You are not Logged In - Log back in!");
        }
    },

    Mutation: {
        // add a new user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user};
        },

        // login data/validating user and password
        login: async (parent, {email, password}) => {
            const validUser = await User.findOne({ email });

            // if not a valid user, throw error
            if (!user) {
                throw new AuthenticationError("Invalid Email - Please Enter a New One");

            }

            const validPassword = await user.isValidPassword(password);

            // if not a valid password, throw error
            if (!validPassword) {
                throw new AuthenticationError("Invalid Password, Try Again");

            }

            const token = signToken(user);
            return { token, user };
        },

        // saving a boook so you can read it later
        saveBook: async (parent, { bookId }, context) => {
            if(context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );
                return updatedUser;
            }
            // else statement for if a user is not logged in, then throw this error
            throw new AuthenticationError("You need to be logged in!");
        },
        
        // remove a book from your saved books
          removeBook: async (parent, { bookId }, context) => {
              if(context.user) {
                  const updatedUser = await User.findOneAndUpdate(
                      { _id: context.user._id },
                      { $pull: { savedBooks: { bookId } } },
                      { new: true }
                  );
                // return the updated User data for the saved books
                  return updatedUser;
              }

            // else statement for if a user is not logged in, then throw this error

              throw new AuthenticationError("You need to be logged in!");
          }

    }
};



module.exports = resolvers;