namespace IShop.Application.Authentication.Queries.Login;

public record LoginByPhoneQuery(
    string Phone,
    string Password);