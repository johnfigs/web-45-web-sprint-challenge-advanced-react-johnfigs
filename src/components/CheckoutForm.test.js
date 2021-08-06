import React from "react";

//Added screen to below import statement
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    //Arrange
    render (<CheckoutForm />);
    
    //Act
    const formHeader = screen.queryByText(/Checkout Form/i);

    //Assert
    expect(formHeader).toBeTruthy();
    expect(formHeader).toBeInTheDocument();
    expect(formHeader).toHaveTextContent(/Checkout Form/);
});

test("form shows success message on submit with form details", async () => {
    //Arrange
    render (<CheckoutForm />);

    //Act: Fill out and submit form

    //Focus on the firstName input
    const firstNameInput = screen.getByLabelText(/First Name:/i);
    userEvent.type(firstNameInput, 'John');
    
    //Focus on the lastName input
    const lastNameInput = screen.getByLabelText(/Last Name:/i);
    userEvent.type(lastNameInput, 'Figs');

    //Focus on on the address input
    const addressNameInput = screen.getByLabelText(/Address:/i);
    userEvent.type(addressNameInput, '1234 A Street');

    //Focus on the city input
    const cityInput = screen.getByLabelText(/City/i);
    userEvent.type(cityInput, 'Ventura');

    //Focus on state input
    const stateInput = screen.getByLabelText(/State/i);
    userEvent.type(stateInput, 'CA');

    //Focus on zip code input
    const zipInput = screen.getByLabelText(/Zip/i);
    userEvent.type(zipInput, '93003');
    
    //Get checkout button
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    //Assert
    
    //Find success message and that it's visible

    const messageDisplay = screen.queryByText(/You have ordered some plants!/i);
    expect(messageDisplay).toBeInTheDocument();
    //console.log(messageDisplay);

    //find firstname lastname in sucess message and that it is the the success message
    const nameConfirmed = screen.queryByText(/John Figs/i);
    expect(nameConfirmed).toBeInTheDocument();

    //find address in success message and that it is the the success message
    const addressConfirmed = screen.queryByText(/1234 A Street/i);
    expect(addressConfirmed).toBeInTheDocument();

    //find cityStateZip in success message and that it is the the success message
    const cityStateZipConfirmed = screen.queryByText(/Ventura, CA 93003/i);
    expect(cityStateZipConfirmed).toBeInTheDocument();

});
