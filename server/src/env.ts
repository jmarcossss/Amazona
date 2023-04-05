export default class Env {
  public static ENV = process.env.ENV || 'DEV';
  public static PORT = process.env.PORT || 3000;
  public static EMAIL_FROM = process.env.EMAIL_FROM || '';
  public static PASSWORD_FROM = process.env.PASSWORD_FROM || '';
}
