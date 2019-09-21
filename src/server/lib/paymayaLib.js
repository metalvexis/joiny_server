import pmSDK from 'paymaya-node-sdk';

const rootUrl = 'http://localhost:3000';
const redirectCheckoutSuccess = rootUrl + '/api/checkout/success';
const redirectCheckoutFailure = rootUrl +  '/api/checkout/failure';
const redirectCheckoutCancel = rootUrl +  '/api/checkout/cancel';

const paymayaSDK = pmSDK.PaymayaSDK;
export const pmCheckout = pmSDK.Checkout;
export const pmBuyer = pmSDK.Buyer;
export const pmContact = pmSDK.Contact;
export const pmAddress = pmSDK.Address;
export const pmItemAmountDetails = pmSDK.ItemAmountDetails;
export const pmItemAmount = pmSDK.ItemAmount;
export const pmItem = pmSDK.Item;
export const paymaya = pmSDK;

export function initPaymaya(){
  try{
    const PAYMAYA_SEC_KEY = process.env.PAYMAYA_SEC_KEY;
    const PAYMAYA_PUB_KEY = process.env.PAYMAYA_PUB_KEY;
    paymayaSDK.initCheckout(
      PAYMAYA_PUB_KEY, // <CHECKOUT_PUBLIC_FACING_API_KEY>
      PAYMAYA_SEC_KEY, // <CHECKOUT_SECRET_API_KEY>
      paymayaSDK.ENVIRONMENT.SANDBOX // Use env var
    );
  }catch(err){
    console.error(err);
  }finally{
    console.log('Paymaya Initialized');
  }


}

export function getTransRefNum(){
  return `${Math.floor(Math.random() * 1000000000) + 1000000000}`;
}

export function buildCheckout({guest, pkg}){
  let checkout = new pmCheckout();

  // Set buyer
  let buyer = new pmBuyer();
  buyer.firstName = guest.firstName;
  buyer.middleName = guest.middleName;
  buyer.lastName = guest.lastName;
  buyer.shippingAddress = {};
  buyer.billingAddress = {};
  
  // Set buyer contact details
  let contact = new pmContact();
  contact.email = guest.email;

  buyer.contact = contact;

  // set buyer address details
  // var address = new pmAddress();
  // address.line1 = "";
  // address.line2 = "";
  // address.city = "";
  // address.state = "";
  // address.zipCode = "";
  // address.countryCode = "";

  // buyer.shippingAddress = address;
  // buyer.billingAddress = address;


  let itemAmount = new pmItemAmount();
  itemAmount.currency = 'PHP';
  itemAmount.value = pkg.price;

  // Set item
  let item = new pmItem();
  item.name = pkg.name;
  item.quantity = 1;
  item.description = pkg._id;
  item.amount = itemAmount;
  item.totalAmount = itemAmount;

  // Build Checkout
  checkout.buyer = buyer;
  checkout.totalAmount = {
    value: pkg.price,
    currency: 'PHP'
  };
  checkout.requestReferenceNumber = getTransRefNum();
  checkout.items = [ item ];

  checkout.redirectUrl = {
    'success': redirectCheckoutSuccess + `/${guest._id}/${pkg._id}`,
    'failure': redirectCheckoutFailure + `/${guest._id}/${pkg._id}`,
    'cancel': redirectCheckoutCancel + `/${guest._id}/${pkg._id}`
  };

  return checkout;
}

export function sendCheckoutRequest({checkout}){
  return new Promise((resolve,reject)=>{
    try{
      console.log('Paymaya Checkout executed');
      checkout.execute(function (error, response) {
        if (error) {
          console.log('Paymaya Checkout FAILED');
          console.log({error});
          reject(error);
        } else {
          console.log('Paymaya Checkout SUCCEED');
          console.log({response});
          resolve(response);
        }
        
      });
    }catch(e){
      reject(e);
      // throw e;
    }
  });
}