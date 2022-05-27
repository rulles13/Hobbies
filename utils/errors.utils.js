module.exports.signUpErrors = (err) => {
    let errors = { pseudo:'', email:'', password:''}

    if(err.message.includes('pseudo')) errors.pseudo = 'Pseudo incorrect';
    if(err.message.includes('email')) errors.email = 'Email incorrect';
    if(err.message.includes('password')) errors.password = 'Le mot de passe doit faire au moin 6 caractère';

    if(err.code === 11000 && Object.keys(err.keuValue)[0].includes('pseudo'))
        errors.pseudo = 'Ce pseudo est déjà utilisé';

    if(err.code === 11000 && Object.keys(err.keuValue)[0].includes('email'))
        errors.email = 'Cet email est déjà utilisé';

    return errors
};

