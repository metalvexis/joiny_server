import { guests, travelAgencies } from '/server/schemas';
import { authPass } from '/server/lib/authPass.js';

export const accountLib = {
  async createGuest({ email, username, password, firstName, lastName, middleName, contact } = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        let hashPw = await authPass.generateHash(password);
        const veriCode = Math.floor(Math.random() * 1000000);

        let newGuest = new guests({
          password: hashPw, email, username,
          firstName, lastName, middleName, contact, 
          isVerified: false,
          veriCode
        });

        newGuest.save((err, acct) => {
          if (err) {
            reject(err);
          }

          console.log('Guest Account Created');
          resolve(acct);
        });

      } catch (err) {
        reject(err);
      }

    });
  },

  async createTravelAgency({ name, address, email, contact, password } = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        let hashPw = await authPass.generateHash(password);

        let newAgency = new travelAgencies({
          name, address, email, contact, password: hashPw
        });

        newAgency.save((err, agency) => {
          if (err) {
            reject(err);
          }
          console.log('Travel Agency Created');
          resolve(agency);
        });
      } catch (err) {
        reject(err);
      }
    });

  }
};