export class ApiMessageCodes {
  public static readonly incorrect_credentials = 'incorrect_credentials';
  public static readonly incorrect_password = 'incorrect_password';
  public static readonly already_registered = 'already_registered';
  public static readonly email_unavailable = 'email_unavailable';
  public static readonly username_unavailable = 'username_unavailable';
  public static readonly email_invalid_format = 'email_invalid_format';
  public static readonly password_invalid_format = 'password_invalid_format';
  public static readonly CPF_invalid_format = 'CPF_invalid_format';
  public static readonly sign_up_error = 'sing_up_error';
  public static readonly reset_password_error = 'reset_password_error';
  public static readonly incorrect_recovery_code = 'incorrect_recovery_code';
  public static readonly user_not_found = 'user_not_found';

  static codeToMessage(code: string): string {
    switch (code) {
      case ApiMessageCodes.incorrect_credentials:
        return 'Usuário ou senha incorretos';
      case ApiMessageCodes.incorrect_password:
        return 'Senha incorreta';
      case ApiMessageCodes.already_registered:
        return 'Esse usuário já está cadastrado';
      case ApiMessageCodes.email_unavailable:
        return 'Esse e-mail já está cadastrado';
      case ApiMessageCodes.username_unavailable:
        return 'Esse nome de usuário já está cadastrado';
      case ApiMessageCodes.email_invalid_format:
        return 'Esse e-mail não é válido';
      case ApiMessageCodes.password_invalid_format:
        return 'A senha deve ter 8 caracteres';
      case ApiMessageCodes.CPF_invalid_format:
        return 'Esse CPF não é válido';
      case ApiMessageCodes.sign_up_error:
        return 'Erro ao cadastrar';
      case ApiMessageCodes.reset_password_error:
        return 'Erro ao redefinir a senha';
      case ApiMessageCodes.incorrect_recovery_code:
        return 'Código de recuperação incorreto';
      case ApiMessageCodes.user_not_found:
        return 'Usuário não encontrado';

      default:
        return 'Erro deconhecido';
    }
  }
}
