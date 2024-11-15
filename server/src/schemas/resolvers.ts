import User from '../models/User.js';
import { signToken, AuthenticationError } from '../services/auth.js';

interface User {
    _id: string;
  username: string;
  email: string;
  bookCount: number;
  savedBooks: Book[];
}

interface Book {
    bookId: string;
  authors: string[];
  description: string;
  title: string;
  image: string;
  link: string;
}

interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
    savedBooks: Book[];
  }
}

interface AddBookArgs {
    input:{
        bookId: string;
        authors: string[];
        description: string;
        title: string;
        image: string;
        link: string;
    }
}

interface RemoveBookArgs {
  bookId: string;
}

interface Context {
    user: User;
}

const resolvers = { 
    Query: {
        me: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
            if (context.user) {
                return await User.findOne({_id:context.user._id});
            }
            throw AuthenticationError;
        },
    },
    Mutation: {
        login: async (_parent: any, {email, password}: {email: string, password: string}) => {
            const user = await User.findOne({email});
            if (!user) {
                throw new AuthenticationError('Cound not authenticate user');
            }

            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError('Cound not authenticate user');
            }

            const token = signToken(user.username, user.email, user._id);

            return {token, user};
        },

        addUser: async (_parent: any, {input}: AddUserArgs): Promise<{token: string; user: User}> => {
            try {
            const newUser = await User.create({...input});
            const token = signToken(newUser.username, newUser.email, newUser._id);
            const user: User = {
                _id: newUser._id as string,
                username: newUser.username,
                email: newUser.email,
                bookCount: newUser.bookCount || 0,
                savedBooks: newUser.savedBooks || []
            };
            return {token, user};
            }
            catch (error) {
                console.error("Error creating user:", error);
                throw new Error("Failed to create user");
            }
        },

        saveBook: async(_parent: any, {input}: AddBookArgs, context: Context): Promise<User | null> => {
            if (context.user) {
                const {bookId, authors, description, title, image, link} = input;
                const book = {
                    bookId, authors, description, title, image, link,
                };
                return await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: book}},
                    {new: true, runValidators: true}
                );
            };
            throw new AuthenticationError('No User in Context');
        },
        removeBook: async(_parent: any, {bookId}: RemoveBookArgs, context: Context): Promise<User | null> => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId: bookId}}},
                    {new: true}
                );
            };
            throw AuthenticationError;
        },
    },
}

export default resolvers;