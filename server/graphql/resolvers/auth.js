const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../mongodb/models/user');

module.exports = {
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) {
              throw new Error('User exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword
            });
      
            await user.save();
      
            const token = jwt.sign(
                { userId: user.id, email: user.email }, 
                'somesupersecretkey',
                {
                    expiresIn: '1h'
                }
            );
            return { email: user.email, token: token, tokenExpiration: 1 };
          } catch (err) {
            throw err;
          }
    },
    login: async ({ email, password }) => {
        try {
            const user = await User.findOne({ email: email });

            if (!user) {
                throw new Error('User does not exist!');
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error('Password is incorrect!');
            }
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                'somesupersecretkey',
                {
                    expiresIn: '1h'
                }
            );
            return { email: user.email, token: token, tokenExpiration: 1 };
        } catch (err) {
            throw err;
        }
    },
    getCurrentInfo: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }

        try {
            const user = await User.findOne({ email: args.email });

            if (!user) {
                throw new Error('User does not exist!');
            }

            return {
                email: user.email,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName,
                about: user.about,
                subscribedToNewsletter: user.subscribedToNewsletter
            };
        } catch (err) {
            throw err;
        }
    },
    updateCurrentInfo: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }

        try {
            const user = await User.findOne({email: args.email});

            if (!user) {
                throw new Error('User does not exist!');
            }

            user.phone = args.phone;
            user.firstName = args.firstName;
            user.lastName = args.lastName;
            user.about = args.about;
            user.subscribedToNewsletter = args.subscribedToNewsletter;

            await user.save();

            return {
                email: user.email,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName,
                about: user.about,
                subscribedToNewsletter: user.subscribedToNewsletter
            };
        } catch (err) {
            throw err;
        }
    }
};
