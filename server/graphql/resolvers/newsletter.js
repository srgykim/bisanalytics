const UserNewsletter = require('../../mongodb/models/user-newsletter');

module.exports = {
    createNewsletterUser: async ({ email}) => {
        try {
            const existingUser = await UserNewsletter.findOne({ email });
            if (existingUser) {
                throw new Error('User exists already.');
            }

            const user = new UserNewsletter({
                email: email
            });

            await user.save();

            return { email: user.email};
        } catch (err) {
            throw err;
        }
    }
};
