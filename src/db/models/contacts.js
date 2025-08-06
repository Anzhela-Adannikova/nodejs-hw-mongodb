import { model, Schema } from 'mongoose';

const constantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
  },
);

export const Contact = model('contact', constantSchema);

// Крок 4

// name - string, required
// phoneNumber - string, required
// email - string
// isFavourite - boolean, default false
// contactType - string, enum(’work’, ‘home’, ‘personal’), required, default ‘personal’

// Для автоматичного створення полів createdAt та updatedAt,
// можна використати параметр timestamps: true при створенні моделі.
// Це додає до об'єкту два поля: createdAt (дата створення) та
// updatedAt (дата оновлення), і їх не потрібно додавати вручну.
// contacts.json
// Імпортуйте базовий набір контактів із файлу contacts.json
// до вашої бази, користуючись будь-яким UI інтерфейсом (в браузері, Mongo Compass тощо).
// Переконайтеся, що назва колекції в коді моделі та в візуальному інтерфейсі співпадають.
