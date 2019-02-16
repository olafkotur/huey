import * as firebase from "firebase";

export const changeUserEmail = async (oldEmail, newEmail, confirmEmail) => {
    const user = firebase.auth().currentUser;
    let result = {error: null};
    if (oldEmail.includes(user.email)) {
        if (newEmail === confirmEmail) {
            // user.updateEmail(newEmail)
            // .catch((error) => result.error = error.message);
            console.log('Updated');
        }
        else result.error = 'Please ensure your new email matches the confirmation email';
    }
    else result.error = 'Your old email does not match with our records';

    return result;
}