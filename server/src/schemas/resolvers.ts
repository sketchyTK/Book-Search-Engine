import {User} from '../models/User.js';
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

interface Userargs {
    userId: string;
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
        me: async (_parent: any, _args: any, context: Context): <Promise>User | null> => {
            if (context.user) {
                return await User.findOne({_id:context.user._id});
            }
            throw AuthenticationError;
        }
    },
    Mutation: {

    },
}

export default resolvers;