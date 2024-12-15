export const SignIntests = [
    {
        name: 'CTC_9_Sign_in_fields_blank',
        email:'',
        password: ''
    },

    {
        name: 'CTC_10_Sign_In_nonregistered_email',
        email:'nonregistered@gmail.com',
        password: 'Dummy_1234'
    },

    {
        name: 'CTC_11_Sign_In_without_password',
        email:'registered@gmail.com',
        password: ''
    },

    {
        name: 'CTC_12_Sign_In_error_password',
        email:'registered@gmail.com',
        password: 'MissMatch_1234'
    },

    {
        name: 'CTC_13_Sign_In_invalid_email_format',
        email:'invalidemailformat',
        password: 'MissMatch_1234'
    },

    {
        name: 'CTC_14_Sign_In_correct_sign_in',
        email:'juanpidummy@gmail.com',
        password: 'Bony#0198'
    },

    {
        name: 'CTC_15_Sign_In_visible_password',
        email:'',
        password: 'Dummy_1234'
    },

    {
        name: 'CTC_16_Sign_In_return_hidden_password',
        email:'',
        password: 'Dummy_1234'
    },

    {
        name: 'CTC_17_Sign_In_access_forget_password_url',
        email:'',
        password: ''
    },

    {
        name: 'CTC_18_Sign_In_access_Sign_Up_url',
        email:'',
        password: ''
    },

    {
        name: 'BCTC_27_Sql_injection_1',
        email:'sqlInjection@gmail.com',
        password: "' OR '1'='1 --"
    },

    {
        name: 'BCTC_28_Sql_injection_2',
        email:'sqlInjection@gmail.com',
        password: "' AND 1=CAST((SELECT @@version) AS INT) --"
    },

    {
        name: 'BCTC_29_Sql_injection_3',
        email:'sqlInjection@gmail.com',
        password: "UNION SELECT null, null, null --"
    },

]