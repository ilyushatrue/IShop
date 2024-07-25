namespace IShop.Application.Authentication.Queries.Login;

public record LoginByEmailQuery(
    string Email,
    string Password);