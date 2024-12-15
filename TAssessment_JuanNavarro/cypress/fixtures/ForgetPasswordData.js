export const ForgetPasswordtests = [
    {
        name: 'CTC_19_Forget_Password_invalid_email_format',
        email: 'invalidemail'
        
    },

    {
        name: 'CTC_20_Forget_Password_nonregisted_email',
        email: 'nonregisteredemail@gmail.com'
        
    },

    {
        name: 'CTC_21_Forget_Password_correct_email',
        email: 'registeredemail@gmail.com'
        
    },

    {
        name: 'CTC_22_Forget_Password_cancel',
        email: ''
        
    },

    {
        name: 'CTC_23_Forget_Password_blank_password',
        email: ''
        
    },

    

]