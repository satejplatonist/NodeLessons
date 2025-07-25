import { config } from "dotenv";
config();

import { MailtrapClient } from "mailtrap";

const TOKEN ='49696baccbd7d2745ae19d9d36023ce9';

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Satej-Auth-App-Test",
};

