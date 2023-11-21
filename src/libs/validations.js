
export const validateLoginData = (data) => {
    const { email, psw } = data;
    const emailvalidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}(\.[\w-]{2,4})?$/
    if (
        email === null ||
        email === undefined ||
        email === '' ||
        !emailvalidation.test(email)
    ) throw new Error("El campo correo es invalido");

    if (
        psw === null ||
        psw === undefined ||
        psw === '' ||
        psw.length < 5
    ) throw new Error("El campo contraseña es invalido");
};

export const validateCreateData = (data) => {
    const { email, password } = data;
    const emailvalidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}(\.[\w-]{2,4})?$/
    if (
        email === null ||
        email === undefined ||
        email === '' ||
        !emailvalidation.test(email)
    ) throw new Error("El campo correo es invalido");

    if (
        password === null ||
        password === undefined ||
        password === '' ||
        password.length < 5
    ) throw new Error("El campo contraseña es invalido");
}

export const validateVehiculoData = (data) => {
    const { kilometraje } = data;
    const kilometrajeValidate = /^\d{1,6}$/;
    if (kilometraje && !kilometrajeValidate.test(kilometraje)) {
        throw new Error('Valor de campo Kilometraje es invalido')
    }

}

export const validateUserData = (data) => {
    const { dbCode, rol } = data;
    if (
        dbCode === null ||
        dbCode === undefined ||
        dbCode === ''
    ) throw new Error("El campo compañia es invalido");

    if (
        rol === null ||
        rol === undefined ||
        rol === ''
    ) throw new Error("El campo Rol es invalido");


}

