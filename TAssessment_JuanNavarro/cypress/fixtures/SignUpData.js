export const SignUptests = [
    {
        name: 'CTC_1_Sign_Up_fields_in_blank',
        email: '',
        password: '',
        fname: '',
        lname: '',
        month: '',
        year: '',
        country: 'PA'

    },

    {
        name: 'CTC_2_Sign_Up_invalid_email',
        email: 'novalidemail',
        password: 'Dummy_1234',
        fname: 'Juan',
        lname: 'Navarro',
        month: '01',
        year: '2023',
        country: 'PA'

    },

    {
        name: 'CTC_3_Sign_Up_short_password',
        email: 'validuser@gmail.com',
        password: 'Dum_12',
        fname: 'Juan',
        lname: 'Navarro',
        month: '01',
        year: '2023',
        country: 'PA'

    },

    {
        name: 'CTC_4_Sign_Up_large_password',
        email: 'validuser@gmail.com',
        password: 'AbCDeF#1234_ghijkLMNOP@67890_qrstUvWXyZ#2024-Hello_World!Code_Is#Fun_Learn@And_Grow_Together_#Dev1234567890!Testing@Automate#QA_Wins_',
        fname: 'Juan',
        lname: 'Navarro',
        month: '01',
        year: '2023',
        country: 'PA'

    },

    {
        name: 'CTC_5_Sign_Up_password_without_uppercase_character',
        email: 'validuser@gmail.com',
        password: 'dummy_1234',
        fname: 'Juan',
        lname: 'Navarro',
        month: '01',
        year: '2023',
        country: 'PA'

    },

    {
        name: 'CTC_6_Sign_Up_password_without_lowercase_character',
        email: 'validuser@gmail.com',
        password: 'DUMMY_1234',
        fname: 'Juan',
        lname: 'Navarro',
        month: '01',
        year: '2023',
        country: 'PA'

    },

    {
        name: 'CTC_7_Sign_Up_password_without_symbol_neither_number',
        email: 'validuser@gmail.com',
        password: 'Dummypass',
        fname: 'Juan',
        lname: 'Navarro',
        month: '01',
        year: '2023',
        country: 'PA'

    },

    {
        name: 'CTC_8_Correct_new_account',
        email: 'validuser@gmail.com',
        password: 'Dummy_1234',
        fname: 'Juan',
        lname: 'Navarro',
        month: '01',
        year: '2023',
        country: 'PA'
    }

]