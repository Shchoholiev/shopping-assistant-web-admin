import { Login } from './login.model';

describe('Login', () => {
  it('should create an instance with valid properties', () => {
    const login = new Login();
    login.email = 'test@example.com';
    login.phone = '1234567890';
    login.password = 'password';
    expect(login).toBeTruthy();
    expect(login.email).toEqual('test@example.com');
    expect(login.phone).toEqual('1234567890');
    expect(login.password).toEqual('password');
  });

  it('should create an instance with empty properties', () => {
    const login = new Login();
    expect(login).toBeTruthy();
    expect(login.email).toEqual('');
    expect(login.phone).toEqual('');
    expect(login.password).toEqual('');
  });
});