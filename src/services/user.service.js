const { User } = require('../models');
const rabbitService = require('./rabbitmq.service');

const getUsersByMonthAndDayOfBirth = async () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;

  try {
    const users = await User.find({
      $expr: {
        $and: [
          { $eq: [{ $month: '$dateOfBirth' }, currentMonth] },
          { $eq: [{ $dayOfMonth: '$dateOfBirth' }, currentDay] },
        ],
      },
    });

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const sendEmail = async (options) => {
  await rabbitService.sendQueue('email_queue', options);
};

const autoBirthday = async () => {
  const users = await getUsersByMonthAndDayOfBirth();

  for (const user of users) {
    await sendEmail({
      emailData: {
        emails: user.normalizedEmail,
        subject: '[HaUI Food] Happy Birthday!',
        fullname: user.fullname,
      },
      type: 'birthday',
    });
  }
};

module.exports = { autoBirthday };
