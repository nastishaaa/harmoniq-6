import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Поле назва статті є обовʼязковим'],
      minlength: [3, 'Назва статті має містити щонайменше 3 символи'],
      maxlength: [48, 'Назва статті має містити не більше 48 символів'],
    },
    desc: {
      type: String,
      required: [true, 'Поле опис статті є обовʼязковим'],
      minlength: [100, 'Опис статті має містити щонайменше 100 символів'],
      maxlength: [4000, 'Опис статті має містити не більше 4000 символів'],
    },
    img: {
      type: String,
      required: [true, 'Фото статті є обовʼязковим'],
    },
    date: {
      type: Date,
      required: [true, 'Дата є обовʼязковою'],
      validate: {
        validator: function (v) {
          return /^\d{4}-\d{2}-\d{2}$/.test(v.toISOString().split('T')[0]);
        },
        message: (props) => `Дата повинна бути у форматі 'рррр-мм-дд'`,
      },
    },
    authorName: {
      type: String,
      required: [true, 'Імʼя автора є обовʼязковим'],
      minlength: [4, 'Імʼя автора має містити щонайменше 4 символи'],
      maxlength: [50, 'Імʼя автора має містити не більше 50 символів'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Article = mongoose.model('article', articleSchema);
