const VALIDATORS = {
  email: (val: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val),
  name: (val: string) => /^[\p{L}'-]+$/u.test(val) && val.length <= 50,
  password: (pw: string, confirm: string) =>
    pw === confirm &&
    pw.length >= 8 &&
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /\d/.test(pw) &&
    /[!@#$%^&*]/.test(pw),
};

export const validateSignup = (data: Record<string, string>) => {
  if (!VALIDATORS.email(data["email"])) return "Invalid email format";
  if (!VALIDATORS.password(data["password"], data["confirmPassword"]))
    return "Password must have at least 8 characters, uppercase and lowercase letters, numbers and special characters";
  if (!VALIDATORS.name(data["firstName"])) return "Invalid first name";
  if (!VALIDATORS.name(data["lastName"])) return "Invalid last name";
  return null;
};
