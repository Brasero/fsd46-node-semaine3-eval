const config = {
  name: {
    rules: {
      required: {
        message: "Merci de saisir une dénomination pour votre réalisation"
      }
    }
  },
  materiaux: {
    rules: {
      minLength: {
        message: "Merci de renseigner au moins 1 matériel ayant servi à la réalisation"
      }
    }
  },
  category: {
    rules: {
      required: {
        message: "Merci de renseigner une catégorie pour votre réalisation"
      }
    }
  },
  password: {
    rules: false
  }
}

export default config;