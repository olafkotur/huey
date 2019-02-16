import * as firebase from "firebase";

// Does some checking and updates user email if all checks passed
export const changeUserEmail = async (oldEmail, newEmail, confirmEmail) => {
    const user = firebase.auth().currentUser;
    let result = {error: null};
    if (oldEmail.includes(user.email)) {
        if (newEmail === confirmEmail) {
            user.updateEmail(newEmail)
            .catch((error) => result.error = error.message);
        }
        else result.error = 'Please ensure your new email matches the confirmation email';
    }
    else result.error = 'Your old email does not match with our records';

    return result;
}


// Does some checking and updates user password if all checks passed
export const changeUserPassword = async (newPassword, confirmPassword) => {
    const user = firebase.auth().currentUser;
    let result = {error: null};
    if (newPassword === confirmPassword) {
        user.updatePassword(newPassword)
        .catch((error) => result.error = error.message);
        console.log('Pass updated');
    }
    else result.error = 'Please ensure your new password matches the confirmation password';

    return result;
}