const formConfig = {
  email: {
    rules: {
      required: {
        message: "Merci de renseigner votre e-mail."
      },
      email: {
        message: "Merci de saisir un e-mail valide."
      }
    }
  },
  password: {
    rules: {
      required: {
        message: "Merci de renseigner votre mot de passe"
      }
    }
  }
}

export default formConfig;