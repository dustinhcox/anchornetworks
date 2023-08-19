/* Mobile Nav */

/* Contact Form */
"use strict";
const cname = document.querySelector("#name");
const email = document.querySelector("#email");
const company = document.querySelector("#company")
const message = document.querySelector("#message");
const button = document.querySelector("#contactbutton");
const form = document.querySelector("#form");
const GOOGLE_FORM_URL =
"https://docs.google.com/forms/u/0/d/e/1FAIpQLSdInpjGDNEd6boLCOovIPFiAymUJJZ3fh6_uo7I8i0s7Ixulg/formResponse";

const handleSubmit = async (event) => {
  event.preventDefault();
  const nameValue = cname.value;
  const emailValue = email.value;
  const companyValue = company.value;
  const messageValue = message.value;
  const formData = {
    "entry.1642596747": nameValue, // found within form html
    "entry.1560612221": emailValue,
    "entry.1506302500": companyValue,
    "entry.1055020412": messageValue,
  };
  const appendedFormData = newFormData({ ...formData });

  try {
    button.disabled = true;
    button.textContent = "processing...";
    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: appendedFormData,
    });
    alert("Messgae sent! We will be in touch soon.");
  } catch (error) {
    alert("Something went wrong, please try again.");
    console.log(error);
  } finally {
    button.disabled = false;
    button.textContent = "Submit";
  }
};

form.addEventListener("submit", handleSubmit);

// A helper function to help convert the data to FormData
const newFormData = (inputs) => {
  const formData = new FormData();
  const newArr = Object.entries(inputs);
  newArr.map((item) => {
    return formData.append(`${item[0]}`, item[1]);
  });
  return formData;
};
